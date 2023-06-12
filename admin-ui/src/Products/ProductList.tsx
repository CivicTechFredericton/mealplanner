import React, { useState } from 'react';
import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  ListProps,
  NumberField,
  ReferenceManyField,
  SingleFieldList,
  TextField,
  UrlField,
} from "react-admin";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";


export const ProductList = (props: ListProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const [result, setResult] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(event.target.value);
  };

  const convertToKilograms = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('');
      return;
    }

    if (selectedUnit === 'kg') {
      setResult(value.toString());
    } else if (selectedUnit === 'lb') {
      setResult((value * 0.453592).toString());
    } else if (selectedUnit === 'g') {
      setResult((value * 0.001).toString());
    } else if (selectedUnit === 'ml') {
      setResult((value * 0.001).toString());
    } else if (selectedUnit === 'litre') {
      setResult(value.toString());
    } else if (selectedUnit === 'piece') {
      setResult('');
      alert('Cannot convert "piece" to kilograms.');
    }
  };

  return (
    <List {...props} title="ProductList">
      <Datagrid expand={NutritionDetails}>
        <TextField source="id" fullWidth />
        <TextField source="nameEn" fullWidth />
        <TextField source="nameFr" fullWidth />
        <TextField source="code" />
        <NumberField source="price" />
        <NumberField source="quantity" />
        <TextField source="unit" />
        <BooleanField source="isArchived" />
        <TextField source="upc" />
        <UrlField source="sourceLink" />
        <ListField source="tags" />
        <EditButton />
        <label htmlFor="input">Value:</label>
        <input type="number" id="input" value={inputValue} onChange={handleInputChange} />
        <select value={selectedUnit} onChange={handleUnitChange}>
          <option value="litre">litre</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="lb">lb</option>
          <option value="kg">kg</option>
        </select>
        <button onClick={convertToKilograms}>Convert to kg</button>
        <div>
        <strong>Result:</strong> {result} kg
      </div>
      </Datagrid>
    </List>
  );
};

const NutritionDetails = () => {
  return (
    <>
      <h3>Nutrition Information</h3>
      <ReferenceManyField
        reference="nutrition"
        target="nutritionableId"
        filter={{ nutritionableType: "product" }}
      >
        <SingleFieldList>
          <NutritionShow />
        </SingleFieldList>
      </ReferenceManyField>
    </>
  );
};
