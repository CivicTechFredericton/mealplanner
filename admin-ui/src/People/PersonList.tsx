import React from "react";
import {
  Button,
  Datagrid,
  ExportButton,
  FieldProps,
  List,
  ListProps,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { useNavigate } from "react-router-dom";

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
  return <span>{userRole}</span>;
};
const PersonActions = () => {
  const navigate = useNavigate();
  return (
    <TopToolbar>
      <Button
        onClick={() => {
          navigate("/people/register");
        }}
        label="Register"
      />

      <ExportButton />
    </TopToolbar>
  );
};
export const PersonList = (props: ListProps) => {
  return (
    <React.Fragment>
      <List {...props} title="List People" actions={<PersonActions />}>
        <Datagrid>
          <TextField source="rowId" />
          <TextField source="fullName" />
          <UserRole label="Role" />
          <TextField source="email" />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};
