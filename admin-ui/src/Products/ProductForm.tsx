import { BooleanInput, NumberInput, SimpleForm, TextInput } from "react-admin";

export const ProductForm = () => {
  return (
    <SimpleForm>
      <TextInput source="nameEn" fullWidth />
      <TextInput source="nameFr" fullWidth />
      <NumberInput source="price" />
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <BooleanInput source="isArchived" />
      <TextInput source="upc" />
      <TextInput source="sourceUrl" fullWidth/>
      <TextInput source="imageUrl" fullWidth/>
      <TextInput
        defaultValue={null}
        fullWidth
        parse={(values) => {
          if (values == "") return null;
          return values.split(",").map((s: string) => s.trim());
        }}
        source="tags"
      />
      <TextInput
        defaultValue={null}
        fullWidth
        format={(x) => {
          console.log('product keyword values', x);
          return x && x.join(", ")
        }}
        parse={(values) => {
          if (values == "") return null;
          return values.split(",").map((s: string) => s.trim());
        }}
        source="productKeywords"
      />
    </SimpleForm>
  );
};
