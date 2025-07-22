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

export const SocialLoginList = (props: ListProps) => {
	return(
		<React.Fragment>
			<List {...props} title="List Social Login Users" actions={ <SocialLoginActions/> } >
				<Datagrid>
					<TextField source="id" />
					<TextField source="fullName" />
					<UserRole label="Role" />
					<TextField source="loginMode" />
					<TextField source="status" />
					<TextField source="email" />
					<EditButton />
				</Datagrid>
			</List>
		</React.Fragment>
	);
};