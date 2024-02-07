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


export const ProductList = (props: ListProps) => {
  return (
    <List {...props} title="ProductList" >
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
