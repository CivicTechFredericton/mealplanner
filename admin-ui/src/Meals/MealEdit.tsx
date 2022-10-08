import { Edit, EditProps } from "react-admin";
import { MealForm } from "./MealForm";

export const MealEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Meal">
      <MealForm />
    </Edit>
  );
};
