import { Button } from "@mui/material";
import {
    Datagrid,
    List,
    NumberField,
    ReferenceField,
    TextField,
    useRecordContext,
} from "react-admin";
import { Link, useParams } from "react-router-dom";

export const IngredientList = () => {
  const { id } = useParams();
  return (
    <>
      {id && <CreateIngredientButton id={id} />}
      <List resource="ingredients" filter={{ mealId: id }}>
        <Datagrid>
          <NumberField source="code" label="Ingredient code" />
          <TextField source="name" label="Ingredient name" />
          <TextField label="Quantity" source="quantity" />
          <TextField label="Unit" source="unit" />
          <TextField label="Product keyword" source="productKeyword" />
          <ReferenceField
            source="substituteIngredientId"
            label="Primary ingredient"
            reference="ingredients"
          >
            <TextField source="name" />
          </ReferenceField>
          <TextField label="Substitute reason" source="substituteReason" />
          <EditIngredientButton />
          <MatchIngredientButton />
        </Datagrid>
      </List>
    </>
  );
};

const CreateIngredientButton = ({ id }: { id: string }) => {
  return (
    <Button component={Link} to={`/meals/${id}/ingredients/create`}>
      Create
    </Button>
  );
};

const EditIngredientButton = () => {
  const ingredient = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/meals/${ingredient.mealId}/ingredients/${ingredient.id}`}
    >
      Edit
    </Button>
  );
};

const MatchIngredientButton = () => {
  const ingredient = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/meals/${ingredient.mealId}/ingredients/${ingredient.id}/match/create`}
    >
      Match
    </Button>
  );
}