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
  TextInput,
  UrlField,
} from "react-admin";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";


const postFilters = [
  <TextInput source='id' />,
  <TextInput source='code' alwaysOn />,
  <TextInput source='nameEn' />,
  <TextInput source='nameFr' />,
  <TextInput source='quantity' />,
  <TextInput source='tags' />,
  
];


export const ProductList = (props: ListProps) => {
  return (
    <List {...props} title="ProductList" filters={postFilters}>
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
