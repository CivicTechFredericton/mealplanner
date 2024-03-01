import { RichTextInput } from "ra-input-rich-text";
import { CheckboxGroupInput, NumberInput, SimpleForm, TextInput, required } from "react-admin";

export const MealForm = () => {
  return (
    <SimpleForm>
      <TextInput source="nameEn" fullWidth />
      <TextInput source="nameFr" fullWidth />
      <NumberInput source="code" fullWidth min={1} />
      <TextInput
        defaultValue={null}
        fullWidth
        parse={(values) => {
          if (values == "") return null;
          return values.split(",").map((s: string) => s.trimStart());
        }}
        source="tags"
      />
      <TextInput source="descriptionEn" fullWidth validate={required()} />
      <TextInput source="descriptionFr" fullWidth validate={required()} />
      <CheckboxGroupInput validate={required()}
        source="categories"
        choices={[
          { id: "BREAKFAST", name: "Breakfast" },
          { id: "LUNCH", name: "Lunch" },
          { id: "DINNER", name: "Dinner" },
          { id: "SNACK", name: "Snack" },
        ]}
      />
      <TextInput source="photoUrl" fullWidth />
      <TextInput source="videoUrl" fullWidth />
      <NumberInput source="cookTime" fullWidth />
      <NumberInput source="prepTime" fullWidth />
      <NumberInput source="portions" fullWidth />
      <NumberInput source="totalCost" fullWidth />
      <NumberInput source="servingCost" fullWidth />
      <NumberInput source="servingsSize" fullWidth />
      <TextInput source="servingsSizeUnit" fullWidth />
      <NumberInput source="nutritionRating" fullWidth />
      <RichTextInput source="method" fullWidth />
      <TextInput source="tips" fullWidth />
    </SimpleForm>
  );
};
