import { BooleanInput, NumberInput, SimpleForm, TextInput } from "react-admin";

export const ProductForm = () => {
  return (
    <SimpleForm>
      <TextInput source="nameEn" fullWidth />
      <TextInput source="nameFr" fullWidth />
      <TextInput source="code" />
      <NumberInput source="price" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <BooleanInput source="isArchived" />
      <TextInput source="upc" />
      <TextInput source="sourceLink" />
      <TextInput 
        defaultValue={null}
        fullWidth
        parse={(values) => {
          if(values == '') return null;
          return values.split(",").map((s: string) => s.trim())
        }}
        source="tags" />
    </SimpleForm>
  );
};
