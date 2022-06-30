import { FieldProps, useRecordContext } from "react-admin";

export const ListField = (props: FieldProps) => {
  const record = useRecordContext();
  return (
    <ul>
      {record[props.source!].map((item: string) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
