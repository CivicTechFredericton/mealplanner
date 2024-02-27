import {
  AutocompleteInput,
  NumberInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { gql, useQuery } from "@apollo/client";

const getProductsAndMealsQuery = gql`
  query GetProductsAndMeals {
    query {
      meals {
        nodes {
          nameEn
          rowId
        }
      }
      products {
        nodes {
          nameEn
          rowId
        }
      }
    }
  }
`;

interface Product {
  rowId: string;
  nameEn: string;
}

interface Meal {
  rowId: string;
  nameEn: string;
}

export const MeasureForm = () => {
  const { loading, error, data } = useQuery(getProductsAndMealsQuery);
  const meals: Meal[] = data?.query?.meals?.nodes;
  const products: Product[] = data?.query?.products?.nodes;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mealChoices = meals.map((meal: Meal) => ({
    id: meal.rowId,
    nameEn: meal.nameEn,
  }));

  const productChoices = products.map((product: Product) => ({
    id: product.rowId,
    nameEn: product.nameEn,
  }));

  return (
    <SimpleForm>
      <NumberInput source="quantity" />
      <TextInput source="unit" />
      <AutocompleteInput
          optionText="nameEn"
          source="productId"
          label="Product"
          validate={[required()]}
          choices={ productChoices }
      />
      <AutocompleteInput
          optionText="nameEn"
          source="mealId"
          label="Meal"
          validate={[required()]}
          choices={ mealChoices }
        />
    </SimpleForm>
  );
};