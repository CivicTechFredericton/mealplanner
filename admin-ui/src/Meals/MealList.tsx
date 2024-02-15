import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ListProps,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
} from "react-admin";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";
import { useState } from "react";
import { MealType } from "./service";
import CustomSearchInput from "../components/CustomSearchInput";

export const MealList = (props: ListProps) => {
  const [data, setData] = useState<String[]>([]);
  const handleSearchResult = (data: String[]) => {
    setData(data);
  };

  return (
    <>
      <CustomSearchInput onSearch={handleSearchResult} />
      <List
        {...props}
        title="Meals List"
        filter={{
          rowId: data,
          order: "ASC",
          page: 1,
          perPage: 10,
          sort: "id",
        }}
      >
        <Datagrid expand={Details}>
          <TextField source="id" />
          <TextField source="code" />
          <TextField source="nameEn" />
          <TextField source="nameFr" />
          <ListField label="Tags" source="tags" />
          <TextField source="descriptionEn" />
          <TextField source="descriptionFr" />
          <ListField source="categories" />
          <EditButton />
        </Datagrid>
      </List>
    </>
  );
};

const Details = () => {
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label="Method">
          <RichTextField source="method" />
          <ReferenceManyField label="Measures" reference="measures" target="mealId">
            <Datagrid>
              {/* <TextField source="rowId" /> */}
              <TextField source="productId" label="Product ID" />
              <ReferenceField label="Product Name" reference="products" source="productId">
                <TextField source="nameEn" />
              </ReferenceField>
              <TextField label="Nom du Produit" source="nameFr" />
              <TextField source="unit" />
              <TextField source="quantity" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Summary">
          <NumberField source="cookingDuration" />
          <NumberField source="totalCost" />
          <NumberField source="servingCost" />
          <TextField source="tips" />
          <NumberField source="servingsSize" />
          <TextField source="servingsSizeUnit" />
          <NumberField source="serves" />
          <NumberField source="nutritionRating" />
          <UrlField source="photoUrl" />
          <UrlField source="videoUrl" />
          <DateField source="createdAt" showTime />
          <DateField source="updatedAt" showTime />
        </Tab>
        <Tab label="Nutrition">
          <ReferenceManyField
            reference="nutrition"
            target="nutritionableId"
            filter={{ nutritionableType: "meal" }}
          >
            <SingleFieldList>
              <NutritionShow />
            </SingleFieldList>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </>
  );
};
