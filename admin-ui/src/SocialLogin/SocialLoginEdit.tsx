import { Edit, EditProps, SelectInput, SimpleForm, TextInput, useRecordContext } from "react-admin";

const StatusField = () => {
	const record = useRecordContext();
	const currentStatus = record?.status;

	const choices = [{ id: "InActive", name: "InActive" }];

	// Add current value if it's not already in choices
	if (currentStatus && !choices.find((c) => c.id === currentStatus)) {
		choices.unshift({ id: currentStatus, name: currentStatus });
	}

	return (
		<SelectInput
			source="status"
			choices={choices}
			parse={(value) => (value === "InActive" ? "InActive" : currentStatus)}
		/>
	);
};

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
						{ id: "GOOGLE", name: "Google" },
						{ id: "FACEBOOK", name: "Facebook" },
					]}
				/>
				{/* <SelectInput
					source="status"
					// emptyText=""
					// emptyValue=""
					choices={[
						{ id: "InActive", name: "InActive" }
					]}
					format={(value) => value} // shows current status even if not in choices
  					parse={(value) => (value === "InActive" ? "InActive" : undefined)} // only allows setting to InActive
				/> */}
				<StatusField />

			</SimpleForm>
		</Edit>
	);
};