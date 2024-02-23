import { ApolloClient, gql } from "@apollo/client";

const searchStringQuery = gql`
  query searchMeal($searchString: String, $category: [CategoryT]) {
    meals(
      filter: {
        or: [
          { code: { includesInsensitive: $searchString } }
          { nameEn: { includesInsensitive: $searchString } }
          { nameFr: { includesInsensitive: $searchString } }
          { descriptionEn: { includesInsensitive: $searchString } }
          { descriptionFr: { includesInsensitive: $searchString } }
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

const extractIdsFromResult = (result: QueryResponse) => {
  const extractedMeals: MealResultType[] = result.data.meals.edges.map((edge) => edge.node);
  return extractedMeals.map((id) => id.rowId);
};

export const getSearchByString = async (
  client: ApolloClient<object>,
  searchString: string,
  category: string[] = []
): Promise<string[]> => {
  let isCategory: boolean = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"].includes(
    searchString.toUpperCase()
  );

  if (isCategory) {
    category.push(searchString.toUpperCase());
    const result = await client.query({
      query: searchStringQuery,
      variables: { searchString, category },
    });
    const ids = extractIdsFromResult(result);
    return ids;
  }
  const result = await client.query({
    query: searchStringQuery,
    variables: { searchString, category },
  });
  const ids = extractIdsFromResult(result);
  return ids;
};

export type MealResultType = {
  rowId: string;
};
type QueryResponse = {
  data: {
    meals: {
      edges: [{ node: MealResultType }];
    };
  };
};
