import { useState } from "react";
import {
  NumberInput,
  RadioButtonGroupInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useCreateContext,
  useEditContext,
} from "react-admin";
import { useParams } from "react-router-dom";

export const NutritionForm = () => {
  const params = useParams();

  let record;
  if (!params.id) {
    record = useCreateContext();
  } else {
    record = useEditContext().record;
    if (!record) {
      return <div>"loading..."</div>;
    }
  }

  const [nType, setNType] = useState(record.nutritionableType || "meal");

  return (
    <SimpleForm>
      <RadioButtonGroupInput
        label="Choose One"
        source="nutritionableType"
        choices={[{ name: "meal" }, { name: "product" }]}
        optionValue="name"
        defaultValue={"meal"}
        onChange={(e) => {
          setNType(e.target.value);
        }}
      />
      <ReferenceInput
        source="nutritionableId"
        reference={`${nType}s`}
        sort={{ field: "nameEn", order: "ASC" }}
      >
        <SelectInput label="Name" optionText="nameEn" />
      </ReferenceInput>
      <NumberInput source="servingSize" />
      <TextInput source="servingSizeUnit" />
      <TextInput source="servingSizeText" />
      <NumberInput source="calories" />
      <NumberInput source="totalFat" />
      <TextInput source="totalFatUnit" />
      <NumberInput source="totalFatPercent" />
      <NumberInput source="saturatedFat" />
      <TextInput source="saturatedFatUnit" />
      <NumberInput source="saturatedFatPercent" />
      <NumberInput source="transFat" />
      <TextInput source="transFatUnit" />
      <NumberInput source="transFatPercent" />
      <NumberInput source="cholesterol" />
      <TextInput source="cholesterolUnit" />
      <NumberInput source="cholesterolPercent" />
      <NumberInput source="sodium" />
      <TextInput source="sodiumUnit" />
      <NumberInput source="sodiumPercent" />
      <NumberInput source="carbohydrate" />
      <TextInput source="carbohydrateUnit" />
      <NumberInput source="carbohydratePercent" />
      <NumberInput source="dietaryFibre" />
      <TextInput source="dietaryFibreUnit" />
      <NumberInput source="dietaryFibrePercent" />
      <NumberInput source="totalSugar" />
      <TextInput source="totalSugarUnit" />
      <NumberInput source="totalSugarPercent" />
      <NumberInput source="protein" />
      <TextInput source="proteinUnit" />
      <NumberInput source="proteinPercent" />
      <NumberInput source="vitA" />
      <NumberInput source="vitC" />
      <NumberInput source="vitD" />
      <NumberInput source="vitB6" />
      <NumberInput source="vitB12" />
      <NumberInput source="vitK" />
      <NumberInput source="vitE" />
      <NumberInput source="calcium" />
      <NumberInput source="iron" />
      <NumberInput source="potassium" />
    </SimpleForm>
  );
};
