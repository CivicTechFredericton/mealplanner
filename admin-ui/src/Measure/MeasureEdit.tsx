import { Edit, EditProps } from "react-admin";
import { MeasureForm } from "./MeasureForm";

export const MeasureEdit = (props: EditProps) => {
  return (
    <Edit {...props} title="Edit Measure">
      <MeasureForm />
    </Edit>
  );
};
