import { useRecordContext, FieldProps } from "react-admin";

type UserRoleInfo = {
  role: string;
  rowId: string;
};

const UserRole = (props: FieldProps) => {
  const record = useRecordContext<UserRoleInfo>();
  if (!record) return <span>loading role</span>;

  const roles: { [key: string]: string | undefined } = {
	APP_ADMIN: "Admin",
	APP_MEAL_DESIGNER: "Meal Designer",
	APP_USER: "Client",
  };

  return <span>{roles[record.role] || "Anonymous"}</span>;
};

export default UserRole;