import { RichTextInput } from "ra-input-rich-text";
import {
  CheckboxGroupInput,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const MealForm = () => {
  return (
    <SimpleForm>
      <TextInput source="code" fullWidth />
      <TextInput source="nameEn" fullWidth />
      <TextInput source="nameFr" fullWidth />
      <TextInput
        fullWidth
        parse={(values) => values.split(",").map((s: string) => s.trim())}
        source="tags"
      />
      <TextInput source="descriptionEn" fullWidth />
      <TextInput source="descriptionFr" fullWidth />
      <CheckboxGroupInput
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
      <NumberInput source="cookingDuration" fullWidth />
      <NumberInput source="serves" fullWidth />
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
