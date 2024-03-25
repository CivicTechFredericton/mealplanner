import {
  Datagrid,
  EditButton,
  FieldProps,
  List,
  ListProps,
  NumberField,
  ReferenceField,
  Tab,
  TabbedShowLayout,
  TextField,
  useRecordContext
} from "react-admin";

export const NutritionReference = (props: FieldProps) => {
  const record = useRecordContext();
  if (!record) {
    return <span>loading</span>;
  }
  return (
    <ReferenceField
      source="nutritionableId"
      reference={`${record.nutritionableType}s`}
    >
      <TextField source="nameEn" />
    </ReferenceField>
  );
};

export const NutritionList = (props: ListProps) => {
  return (
    <List {...props} title="List Nutrition entries">
      <Datagrid expand={Details}>
         <TextField source="id" />
        <NumberField source="servingSize" />
        <TextField source="servingSizeUnit" />
        <TextField source="servingSizeText" />
        <NumberField source="calories" />
        <NutritionReference source="nutrionableId" />
        <TextField source="nutritionableType" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const Details = () => {
  return (
    <TabbedShowLayout syncWithLocation={false}>
      <Tab label="Macro Nutrients">
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
      </Tab>
      <Tab label="Micro Nutrients">
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
      </Tab>
    </TabbedShowLayout>
  );
};
