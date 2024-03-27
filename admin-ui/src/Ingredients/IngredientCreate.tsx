import {
  AutocompleteInput,
  Create,
  CreateProps,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";

export const IngredientCreate = (props: CreateProps) => {
  const { id } = useParams();
  // Get the meal record given the meal id.
  // This record is needed to get the meal name
  const { data } = useGetOne("meals", { id });
  return (
    
    <Create
      {...props}
      resource="ingredients"
      redirect={`/meals/${id}/ingredients`}
    >
      {data && <MealName record={data} />}
      <SimpleForm>
        <NumberInput source="mealId"
        defaultValue={id}
        sx={{
          display: "none",
        }}

        />
        <NumberInput source="code" label="Ingredient Code" fullWidth min={1} /> 
        <TextInput source="name" label="Ingredient Name" fullWidth />
        <NumberInput source="quantity" fullWidth min={0} />
        <TextInput
          source="unit"
          fullWidth
          helperText="Measure unit Eg: g, ml, cup, tsp"
        />
        <TextInput
          source="productKeyword"
          fullWidth
          helperText="Search keyword for a buyer"
        />
        <ReferenceInput source="substituteIngredientId" reference="ingredients">
          <AutocompleteInput
            optionText={"name"}
            fullWidth
            helperText="The primary ingredient name for which this ingredient is a substitute of"
          />
        </ReferenceInput>
        <TextInput
          source="substituteReason"
          fullWidth
          helperText="The reason why this is a substitute Eg: Vegan, Vegetarian, Gluten-free"
        />
      </SimpleForm>
    </Create>
  );
};

const MealName = ({ record }: { record: { nameEn: string } }) => {
  return (
    <>
      <br />
      &nbsp;&nbsp;<b> Meal:</b> <i>{record.nameEn}</i>
      <br />
    </>
  );
};
