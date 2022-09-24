import { FieldProps, useRecordContext } from "react-admin";

export const ListField = (props: FieldProps) => {

  const record = useRecordContext();
  if (record[props.source!]) {
    return (
      <ul>
        { record[props.source!].map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  else return <span></span>;
};
