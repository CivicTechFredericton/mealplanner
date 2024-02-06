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
  let result = await client.query({
    query: searchStringQuery,
    variables: { searchString },
  });
  return result;
};

export type MealType = {
  rowId: string;
};
