import {
  Edit,
  EditProps,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const MeasureEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Measure">
      <SimpleForm>
        <NumberInput source="quantity" />
        <TextInput source="unit" />
        <ReferenceInput source="productId" reference="products">
          <SelectInput
            optionText="nameEn"
            label="Product"
            validate={[required()]}
          />
        </ReferenceInput>
        <ReferenceInput source="mealId" reference="meals">
          <SelectInput
            optionText="nameEn"
            label="Meal"
            validate={[required()]}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
