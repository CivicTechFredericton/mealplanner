import { Create, CreateProps } from "react-admin";
import { NutritionForm } from "./NutritionForm";

export const NutritionCreate = (props: CreateProps) => {
  return (
    <Create {...props} title="Create Nutrition">
      <NutritionForm />
    </Create>
  );
};
