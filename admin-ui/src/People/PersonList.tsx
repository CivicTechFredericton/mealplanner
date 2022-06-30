import {
  Datagrid,
  FieldProps,
  List,
  ListProps,
  TextField,
  useRecordContext,
} from "react-admin";

type Person = {
  role: string;
};
const UserRole = (props: FieldProps) => {
  const record = useRecordContext<Person>();
  const roles: { [key: string]: string | undefined } = {
    APP_ADMIN: "Admin",
    APP_MEAL_DESIGNER: "Meal Designer",
    APP_USER: "Client",
  };

  if (!record) {
    return <span>loading person</span>;
  }
  const userRole = roles[record.role] || "Anonymous";
  console.log(record.role);
  {
    console.log("userRole", userRole);
  }
  return (
    <span>{userRole}</span>
  );
};
export const PersonList = (props: ListProps) => {
  return (
    <List {...props} title="List People">
      <Datagrid>
        <TextField source="rowId" />
        <TextField source="fullName" />
        <UserRole label="Role" />
        <TextField source="email" />
      </Datagrid>
    </List>
  );
};
