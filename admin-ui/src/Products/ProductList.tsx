import {
  BooleanField,
  Datagrid,
  EditButton,
  List,
  ListProps,
  NumberField,
  TextField,
} from "react-admin";

export const ProductList = (props: ListProps) => {
  return (
    <List {...props} title="ProductList">
      <Datagrid>
        <TextField source="id" fullWidth />
        <TextField source="nameEn" fullWidth />
        <TextField source="nameFr" fullWidth />
        <TextField source="code" />
        <NumberField source="price" />
        <NumberField source="quantity" />
        <TextField source="unit" />
        <BooleanField source="isArchived" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

// name_en text not null,
//     name_fr text,
//     code text not null,
//     price numeric not null,
//     quantity numeric not null,
//     unit text not null,
//     is_archived boolean not null default false,
//     upc text,
//     source_link text,
//     tags text[],
