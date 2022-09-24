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

export const MealList = (props: ListProps) => {
  return (
    <List {...props} title="Meals List">
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
  );
};

const Details = () => {
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label="Method" data-testid="Method">
          <RichTextField source="method" />
          <ReferenceManyField
            label="Measures"
            reference="measures"
            target="mealId"
           
          >
            <Datagrid>
              {/* <TextField source="rowId" /> */}
              <TextField source="productId" label="Product ID" />
              <ReferenceField
                label="Product Name"
                reference="products"
                source="productId"
                
              >
                <TextField source="nameEn" />
              </ReferenceField>
              <TextField label="Nom du Produit" source="nameFr"/>
              <TextField source="unit" />
              <TextField source="quantity" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
        <Tab label="Summary" data-testid="Summary">
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
        <Tab label="Nutrition" data-testid="Nutrition">
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
