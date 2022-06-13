import { Edit, EditProps } from "react-admin";
import { NutritionForm } from "./NutritionForm";

export const NutritionEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Nutrition for a meal or product">
      <NutritionForm />
    </Edit>
  );
};
