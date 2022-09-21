import {
  Edit,
  EditProps,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const PersonEdit = (props: EditProps) => {
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
      </SimpleForm>
    </Edit>
  );
};
