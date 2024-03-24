import { DateField, RichTextField, Show, SimpleShowLayout, TextField } from "react-admin";
import { Details } from "./MealDetails";


export const MealShow = () => (
    <Show>
        <SimpleShowLayout>
        <TextField source="nameEn" label="Meal Name" />
           <Details />
        </SimpleShowLayout>
    </Show>
);