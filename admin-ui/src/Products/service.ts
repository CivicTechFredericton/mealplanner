import { ApolloClient, gql } from "@apollo/client";

const searchStringQuery = gql`
  query SearchStrings($searchString: String!) {
    query {
      products(
        filter: {
          or: [
            { code: { includesInsensitive: $searchString } }
            { nameEn: { includesInsensitive: $searchString } }
            { nameFr: { includesInsensitive: $searchString } }
            { upc: { includesInsensitive: $searchString } }
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

const extractIdsFromResult = (result: QueryResponse) => {
  const extractedProducts: ProductResultType[] = result.data.query.products.edges.map((edge) => edge.node);
  return extractedProducts.map((id) => id.rowId);
};

export const getSearchByString = async (
  client: ApolloClient<object>,
  searchString: string
): Promise<string[]> => {
  const result = await client.query({
    query: searchStringQuery,
    variables: { searchString },
  });
  const ids = await extractIdsFromResult(result);
  return ids;
};

export type ProductResultType = {
  rowId: string;
};
type QueryResponse = {
  data: {
    query: {
      products: {
        edges: [{ node: ProductResultType }];
      };
    };
  };
};
