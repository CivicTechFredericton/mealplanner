import React from "react";
import {
  Button,
  Datagrid,
  EditButton,
  ExportButton,
  FieldProps,
  List,
  ListProps,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import UserRole from "../components/UserRole";


type Person = {
  role: string;
  rowId: string;
};

const ResetPassword = (props: FieldProps) => {
  const navigate = useNavigate();
  const record = useRecordContext<Person>();
  if (!record) {
    return <span>loading reset </span>;
  }
  return (
    <Button
      onClick={() => {
        navigate(`/people/${record.rowId}/reset`);
      }}
      label="Reset password"
    />
  );
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
          <TextField source="id" />
          <TextField source="fullName" />
          <UserRole label="Role" />
          <TextField source="email" />
          <EditButton />
          <ResetPassword />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};
