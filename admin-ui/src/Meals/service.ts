import { ApolloClient, gql } from "@apollo/client";

const searchStringQuery = gql`
  query searchMeal($searchString: String, $category: [CategoryT]) {
    meals(
      filter: {
        or: [
          { code: { includes: $searchString } }
          { nameEn: { includes: $searchString } }
          { nameFr: { includes: $searchString } }
          { descriptionEn: { includes: $searchString } }
          { descriptionFr: { includes: $searchString } }
          { tags: { contains: [$searchString] } }
          { categories: { overlaps: $category } }
        ]
      }
    ) {
      edges {
        node {
          rowId
        }
      }
    }
  }
`;

const searchStringCategoryQuery = gql`
  query searchCategory($searchString: CategoryT!) {
    query {
      meals(filter: { categories: { anyEqualTo: $searchString } }) {
        edges {
          node {
            rowId
          }
        }
      }
    }
  }
`;

const extractIdsFromResult = (result: any) => {
  const meals = result?.data?.query?.meals?.edges || [];
  type EdgeType = { node: MealType };
  const extractedMeals: MealType[] = meals.map((edge: EdgeType) => edge.node);
  return extractedMeals.map((id) => id.rowId);
};

export const getSearchByString = async (
  client: ApolloClient<object>,
  searchString: string,
): Promise<any> => {
  const response = await client.query({
    query: searchStringQuery,
    variables: { searchString },
  });
  console.log(response);
  const ids = await extractIdsFromResult(response);
  console.log(ids);
  return ids;
};

export type MealType = {
  rowId: string;
};
