import React from "react";
import {
  BulkDeleteButton,
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
import {
  SendInvitations,
  SendInvitationsBulkAction,
} from "./SendInvitations";

type Person = {
  role: string;
  rowId: string;
  cognitoSub: string | null;
  invitedAt: string | null;
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
  return <span>{userRole}</span>;
};

// Where someone is in onboarding. A person imported from a CSV has a record
// but no Cognito login attached until they sign in for the first time, and
// invitedAt records whether they have been emailed a temporary password yet.
const Status = (props: FieldProps) => {
  const record = useRecordContext<Person>();

  if (!record) {
    return <span>loading person</span>;
  }
  if (record.cognitoSub) {
    return <span>Signed in</span>;
  }
  if (record.invitedAt) {
    return (
      <span>Invited {new Date(record.invitedAt).toLocaleDateString()}</span>
    );
  }
  return <span>Not invited</span>;
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

      <Button
        onClick={() => {
          navigate("/people/import");
        }}
        label="Import CSV"
      />

      <SendInvitations label="Invite everyone" />

      <ExportButton />
    </TopToolbar>
  );
};
export const PersonList = (props: ListProps) => {
  return (
    <React.Fragment>
      <List {...props} title="List People" actions={<PersonActions />}>
        <Datagrid
          bulkActionButtons={
            <>
              <SendInvitationsBulkAction />
              <BulkDeleteButton />
            </>
          }
        >
          <TextField source="id" />
          <TextField source="fullName" />
          <UserRole label="Role" />
          <TextField source="email" />
          <TextField source="clientId" label="CLIENT_ID" />
          <Status label="Status" />
          <EditButton />
          <ResetPassword />
        </Datagrid>
      </List>
    </React.Fragment>
  );
};
