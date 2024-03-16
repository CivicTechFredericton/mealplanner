import { useState } from "react";
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ListProps,
  NumberField,
  ReferenceManyField,
  RichTextField,
  SingleFieldList,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
  useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { ListField } from "../ListField";
import { NutritionShow } from "../Nutrition/NutritionShow";
import CustomSearchInput from "../components/CustomSearchInput";

export const MealList = (props: ListProps) => {
  const [data, setData] = useState<string[]>([]);
  const handleSearchResult = (data: string[]) => {
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
  const meal = useRecordContext();
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label="Method">
          <RichTextField source="method" />
          <Link to={`${meal.id}/ingredients`}>Ingredients</Link>
          {/* <ReferenceManyField label="Measures" reference="measures" target="mealId">
            <Datagrid>
              <TextField source="productId" label="Product ID" />
              <ReferenceField label="Product Name" reference="products" source="productId">
                <TextField source="nameEn" />
              </ReferenceField>
              <TextField label="Nom du Produit" source="nameFr" />
              <TextField source="unit" />
              <TextField source="quantity" />
            </Datagrid>
          </ReferenceManyField> */}
        </Tab>
        <Tab label="Summary">
          <NumberField source="prepTime" />
          <NumberField source="cookTime" />
          <NumberField source="totalCost" />
          <NumberField source="servingCost" />
          <TextField source="tips" />
          <NumberField source="servingsSize" />
          <TextField source="servingsSizeUnit" />
          <NumberField source="portions" />
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
