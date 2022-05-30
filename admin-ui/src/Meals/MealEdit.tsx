import { CheckboxGroupInput, Edit, EditProps, NumberInput, SimpleForm, TextInput } from "react-admin";


export const MealEdit = (props: EditProps) => {
    return (
        <Edit {...props} title="Edit Meal">
            <SimpleForm>
            <TextInput source="code" fullWidth />
            <TextInput source="nameEn" fullWidth />
        <TextInput source="nameFr" fullWidth/>
        <TextInput fullWidth parse={(values) => values.split(',')} source="tags" />
        <TextInput source="descriptionEn" fullWidth/>
        <TextInput source="descriptionFr" fullWidth/>
        <CheckboxGroupInput source="categories" choices={
            [{id:"BREAKFAST", name: "Breakfast"}, 
            {id:"LUNCH", name: "Lunch"}, 
            {id:"DINNER", name: "Dinner"}, 
            {id:"SNACK", name: "Snack"}]} />
        <TextInput source="photoUrl" fullWidth/>
        <TextInput source="videoUrl" fullWidth/>
        <NumberInput source="cookingDuration" fullWidth/>
        <NumberInput source="serves" fullWidth/>
        </SimpleForm>
        </Edit>

    )
}