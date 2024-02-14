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

const extractIdsFromResult = (result: any) => {
  console.log(result);
  const products = result?.data?.query?.products?.edges || [];
  type EdgeType = { node: ProductType };
  const extractedProducts: ProductType[] = products.map((edge: EdgeType) => edge.node);
  return extractedProducts.map((id) => id.rowId);
};

export const getSearchByString = async (
  client: ApolloClient<object>,
  searchString: string
): Promise<string[]> => {
  const result =  await client
    .query({
      query: searchStringQuery,
      variables: { searchString },
    });
    const ids = await extractIdsFromResult(result);
    return ids;
};

export type ProductType = {
  rowId: string;
};
