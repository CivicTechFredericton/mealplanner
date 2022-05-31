import { Create, CreateProps } from "react-admin";
import { MealForm } from "./MealForm";

export const MealCreate = (props: CreateProps) => {
  return (
    <Create {...props} title="Create Meal" redirect="list">
      <MealForm />
    </Create>
  );
};
