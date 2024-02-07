import { ApolloClient, gql } from '@apollo/client';

const searchStringQuery = gql`
  query SearchStrings($searchString: String!) {
    query {
      meals(
        filter: {
          or: [
            { code: { includes: $searchString } }
            { nameEn: { includes: $searchString } }
            { nameFr: { includes: $searchString } }
            { descriptionEn: { includes: $searchString } }
            { descriptionFr: { includes: $searchString } }
            { tags: { contains: [$searchString] } }
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
  }
`;

export const getSearchByString = async (
  client: ApolloClient<object>,
  searchString: string
): Promise<any> => {
  return await client.query({
    query: searchStringQuery,
    variables: { searchString },
  }).then(result => {
    const meals = result?.data?.query?.meals?.edges || [];
    type EdgeType = { node: MealType };
    const extractedMeals: MealType[] = meals.map((edge: EdgeType) => edge.node);
    const idsArray = extractedMeals.map((id) => id.rowId);
    return idsArray; // Return only the needed ids
  });
};

export type MealType = {
  rowId: string;
};
