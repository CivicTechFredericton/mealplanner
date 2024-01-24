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
          ]
        }
      ) {
        edges {
          node {
            id
            code
            nameEn
          }
        }
      }
    }
  }
`;

export const searchString = async (
  client: ApolloClient<object>,
  searchString: string
): Promise<void> => {
  let result = client.query({
    query: searchStringQuery,
    variables: { searchString },
  });
  return;
};
