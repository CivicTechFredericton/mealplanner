// unit text NOT NULL,
// quantity numeric NOT NULL,
// product_id BIGINT REFERENCES app.product(id) not null,
// meal_id BIGINT REFERENCES app.meal(id) NOT NULL,

import {
  Datagrid,
  EditButton,
  List,
  ListProps,
  ReferenceField,
  TextField,
} from "react-admin";

export const MeasureList = (props: ListProps) => {
  return (
    <List {...props} title="List measure">
      <Datagrid>
        <TextField source="id" />
        <TextField source="quantity" />
        <TextField source="unit" />
        <ReferenceField label="Product" source="productId" reference="products">
          <TextField source="nameEn" />
        </ReferenceField>
        <ReferenceField label="Meal" source="mealId" reference="meals">
          <TextField source="nameEn" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
