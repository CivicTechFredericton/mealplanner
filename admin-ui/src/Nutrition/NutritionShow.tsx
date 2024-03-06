import {
  EditButton,
  NumberField,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const NutritionShow = () => {
  return (
    <SimpleShowLayout>
      <TextField source="rowId" />
      <NumberField source="servingSize" />
      <TextField source="servingSizeUnit" />
      <TextField source="servingSizeText" />
      <NumberField source="calories" />
      <NumberField source="totalFat" />
      <TextField source="totalFatUnit" />
      <NumberField source="totalFatPercent" />
      <NumberField source="saturatedFat" />
      <TextField source="saturatedFatUnit" />
      <NumberField source="saturatedFatPercent" />
      <NumberField source="transFat" />
      <TextField source="transFatUnit" />
      <NumberField source="transFatPercent" />
      <NumberField source="cholesterol" />
      <TextField source="cholesterolUnit" />
      <NumberField source="cholesterolPercent" />
      <NumberField source="sodium" />
      <TextField source="sodiumUnit" />
      <NumberField source="sodiumPercent" />
      <NumberField source="carbohydrate" />
      <TextField source="carbohydrateUnit" />
      <NumberField source="carbohydratePercent" />
      <NumberField source="dietaryFibre" />
      <TextField source="dietaryFibreUnit" />
      <NumberField source="dietaryFibrePercent" />
      <NumberField source="totalSugar" />
      <TextField source="totalSugarUnit" />
      <NumberField source="totalSugarPercent" />
      <NumberField source="protein" />
      <TextField source="proteinUnit" />
      <NumberField source="proteinPercent" />
      <NumberField source="vitA" />
      <NumberField source="vitC" />
      <NumberField source="vitD" />
      <NumberField source="vitB6" />
      <NumberField source="vitB12" />
      <NumberField source="vitK" />
      <NumberField source="vitE" />
      <NumberField source="calcium" />
      <NumberField source="iron" />
      <NumberField source="potassium" />
      <NumberField label="meal / product id" source="nutritionableId" />
      <TextField source="nutritionableType" />
      <EditButton />
    </SimpleShowLayout>
  );
};
