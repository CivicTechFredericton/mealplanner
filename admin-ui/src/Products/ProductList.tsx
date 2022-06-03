import { CheckboxGroupInput, Datagrid, List, NumberField, TextField } from "react-admin"

export const ProductList = () => {
    return (
        <List title="ProductList">
            <Datagrid>
                <TextField source="nameEn" fullWidth/>
                <TextField source="nameFr" fullWidth/>
                <TextField source="code" />
                <NumberField source="price" />
                <NumberField source="quantity" />
                <TextField source="unit" />
                <CheckboxGroupInput source="isArchived" />
                
            </Datagrid>
        </List>
    )
}

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