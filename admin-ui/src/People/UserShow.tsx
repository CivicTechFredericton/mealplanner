import { Show, ShowProps, SimpleShowLayout, TextField } from "react-admin";

export const UserShow = (props: ShowProps) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="role" />
        <TextField source="email" />
      </SimpleShowLayout>
    </Show>
  );
};
