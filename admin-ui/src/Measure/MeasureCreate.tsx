import { Create, CreateProps } from "react-admin";
import { MeasureForm } from "./MeasureForm";

export const MeasureCreate = (props: CreateProps) => {
  return (
    <Create {...props} title="Create Measure">
      <MeasureForm />
    </Create>
  );
};
