import {
  Edit,
  EditProps,
  NumberInput,
  RadioButtonGroupInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const NutritionEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Nutrition for a meal or product">
      <SimpleForm>
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
        <NumberInput source="cholestrol" />
        <TextInput source="cholestrolUnit" />
        <NumberInput source="cholestrolPercent" />
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
        <NumberInput label="meal / product id" source="nutritionableId" />
        {/* <SelectInput source="nutritionableType" choices={[{id: 'meal'}, {id: 'product'}]}/> */}
        <RadioButtonGroupInput
          source="nutritionableType"
          choices={[{ name: "meal" }, { name: "product" }]}
          optionValue="name"
        />
      </SimpleForm>
    </Edit>
  );
};
