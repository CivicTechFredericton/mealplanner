import {
  BooleanField,
  Datagrid,
  EditButton,
  FunctionField,
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
  const convertToKilograms = (value: number, unit: string) => {
    if (unit === "g") {
      return value / 1000;
    } else if (unit === "lb") {
      return value / 2.20;
    } else {
      return value;
    }
  };

  const formatUnit = (unit: string) => {
    if (
      unit === "kg" ||
      unit === "L" ||
      unit === "mL" ||
      unit === "ml" ||
      unit === "oz" ||
      unit === "piece" ||
      unit === "single" ||
      unit === "bunch" ||
      unit === "pack" ||
      unit === "count"
    ) {
      return unit;
    } else {
      return "kg";
    }
  };
  
  const convertAndFormatValue = (record: any) => {
    const value = record.quantity;
    const unit = record.unit;
    const convertedValue = convertToKilograms(value, unit);
    const formattedUnit = formatUnit(unit);
    return `${convertedValue} ${formattedUnit}`;
  };

  return (
    <List {...props} title="ProductList">
      <Datagrid expand={NutritionDetails}>
        <TextField source="id" fullWidth />
        <TextField source="nameEn" fullWidth />
        <TextField source="nameFr" fullWidth />
        <TextField source="code" />
        <NumberField source="price" />
        <FunctionField
          label="Quantity"
          render={(record: any) => convertAndFormatValue(record)}
        />
        <BooleanField source="isArchived" />
        <TextField source="upc" />
        <UrlField source="sourceLink" />
        <ListField source="tags" />
        <EditButton />
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
