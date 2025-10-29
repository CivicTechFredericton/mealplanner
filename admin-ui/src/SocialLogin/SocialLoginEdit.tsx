import { 
	Edit, 
	EditProps, 
	SelectInput, 
	SimpleForm, 
	TextInput 
} from "react-admin";


export const SocialLoginEdit = (props: EditProps) => {
	return (
		<Edit {...props} title="Edit Person details">
			<SimpleForm>
				<TextInput source="fullName" />
				<TextInput source="email" />
				<SelectInput
					source="role"
					emptyText="Client"
					emptyValue="APP_USER"
					choices={[
						{ id: "APP_MEAL_DESIGNER", name: "Meal Designer" },
						{ id: "APP_ADMIN", name: "Admin" },
					]}
				/>
				<SelectInput
					source="loginMode"
					emptyText="Google"
					emptyValue="GOOGLE"
					choices={[
						{ id: "FACEBOOK", name: "Facebook" }
					]}
				/>
				<SelectInput
					source="status"
					emptyText="Pending"
					emptyValue="PENDING"
					choices={[
						{ id: "ACTIVE", name: "Active" },
						{ id: "INACTIVE", name: "InActive" }

					]}
				/>
			</SimpleForm>
		</Edit>
	);
};