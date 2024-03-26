import {
  AutocompleteInput,
  Edit,
  EditProps,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { useParams } from "react-router-dom";

export const IngredientEdit = (props: EditProps) => {
  const { id, ingredientId } = useParams();

  return (
    <Edit
      resource="ingredients"
      id={ingredientId}
      redirect={`/meals/${id}/ingredients`}
    >
      <MealName />
      <SimpleForm>
        {/* <ReferenceInput source="mealId" reference="meals" label="Referenced Meal">
                <AutocompleteInput optionText={"nameEn"} fullWidth readOnly/>
            </ReferenceInput> */}
        <NumberInput source="code" label="Ingredient Code" fullWidth min={1}/>
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
    </Edit>
  );
};

const MealName = () => {
  const ingredient = useRecordContext();
  return (
    <>
      <br />
      &nbsp;&nbsp;<b> Meal:</b> <i>{ingredient.meal.nameEn}</i>
      <br />
      &nbsp;&nbsp;<b> Ingredient:</b> <i>{ingredient.name}</i>
    </>
  );
};
