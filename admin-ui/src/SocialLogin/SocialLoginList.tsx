import React from "react";
import { 
	List,
	Datagrid,
	ListProps,
	FieldProps,
	TextField,
	useRecordContext,
	EditButton,
	ExportButton,
	TopToolbar,
	Button
} from "react-admin";
import { useNavigate } from "react-router-dom";
import UserRole from "../components/UserRole";


const SocialLoginActions = () => {
  const navigate = useNavigate();
  return (
	<TopToolbar>
	  <Button
		onClick={() => {
		  navigate("/socialLoginUsers/register");
		}}
		label="Register"
	  />

	  <ExportButton />
	</TopToolbar>
  );
};

type LoginModeRecord = {
  loginMode: string;
};

const LoginMode = (props: FieldProps) => {
	const record = useRecordContext<LoginModeRecord>();
	if (!record) return <span>loading login mode...</span>;

	const loginModes: { [key: string]: string | undefined } = {
		GOOGLE: "Google",
		FACEBOOK: "Facebook",
	};

	return <span>{loginModes[record.loginMode ?? ""] || "Unknown"}</span>;
};

type UserStatusRecord = {
  status: string;
};

const UserStatus = (props: FieldProps) => {
	const record = useRecordContext<UserStatusRecord>();
	if (!record) return <span>loading login mode...</span>;

	const UserStatus: { [key: string]: string | undefined } = {
		PENDING: "Pending",
		ACTIVE: "Active",
		INACTIVE: "InActive"
	};

	return <span>{UserStatus[record.status ?? ""] || "Unknown"}</span>;
};

export const SocialLoginList = (props: ListProps) => {
	return(
		<React.Fragment>
			<List {...props} title="List Social Login Users" actions={ <SocialLoginActions/> } >
				<Datagrid>
					<TextField source="id" />
					<TextField source="fullName" />
					<UserRole label="Role" />
					<LoginMode label="Login Mode"/>
					<UserStatus label="Status" />
					<TextField source="email" />
					<EditButton />
				</Datagrid>
			</List>
		</React.Fragment>
	);
};