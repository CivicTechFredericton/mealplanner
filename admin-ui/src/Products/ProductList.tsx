import { useState } from "react";
import {
  BooleanField,
  Datagrid,
  EditButton,
  ImageField,
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
import CustomSearchInput from "../components/CustomSearchInput";

export const ProductList = (props: ListProps) => {
  const [data, setData] = useState<String[]>([]);

  const handleSearchResult = (data: String[]) => {
    setData(data);
  };

  return (
    <>
      <CustomSearchInput onSearch={handleSearchResult} />
      <List
        {...props}
        title="ProductList"
        filter={{
          rowId: data,
          order: "ASC",
          page: 1,
          perPage: 10,
          sort: "id",
        }}
      >
        <Datagrid expand={NutritionDetails}>
          <TextField source="id" fullWidth />
          <TextField source="nameEn" fullWidth />
          <ImageField source="imageUrl" />
          <ListField source="productKeywords" />
          <NumberField source="price" />
          <NumberField source="quantity" />
          <TextField source="unit" />
          <TextField source="upc" />
          <UrlField source="sourceUrl" />
          <ListField source="tags" />
          <BooleanField source="isArchived" />
          <TextField source="nameFr" fullWidth />
          <EditButton />
        </Datagrid>
      </List>
    </>
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
