import {
  Datagrid,
  FunctionField,
  List,
  ListProps,
  ReferenceField,
  TextField,
} from "react-admin";

export const PersonList = (props: ListProps) => {
  return (
    <List {...props} title="List People">
      <Datagrid>
        <TextField source="rowId" />
        <TextField source="fullName" />
        <ReferenceField source="personId" reference="CurrentPerson">
          <FunctionField
            render={(record: { email: string }) => record && `${record.email}`}
          />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};
