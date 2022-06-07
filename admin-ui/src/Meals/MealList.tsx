import {
  Datagrid,
  DateField,
  EditButton,
  FieldProps,
  List,
  ListProps,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  Tab,
  TabbedShowLayout,
  TextField,
  UrlField,
  useRecordContext,
} from "react-admin";

export const MealList = (props: ListProps) => {
  return (
    <List {...props} title="Meals List">
      <Datagrid expand={Details}>
        <TextField source="rowId" />
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
  const record = useRecordContext();
  return (
    <>
      <TabbedShowLayout syncWithLocation={false}>
        <Tab label="Method">
          <RichTextField source="method" />
          <ReferenceManyField
            label="Measures"
            reference="measures"
            target="mealId"
          >
            <Datagrid>
              <TextField source="rowId" />
              <TextField source="productId" label="Product ID" />
              <ReferenceField
                label="Product Name"
                reference="products"
                source="productId"
              >
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
      </TabbedShowLayout>
    </>
  );
};

export const ListField = (props: FieldProps) => {
  const record = useRecordContext();
  return (
    <ul>
      {record[props.source!].map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
