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
  searchString: string
): Promise<any> => {
  const isCategory = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].includes(searchString.toUpperCase());

  if (isCategory) {
    return await client
      .query({
        query: searchStringCategoryQuery,
        variables: { searchString },
      })
      .then((result) => extractIdsFromResult(result));
  }
  return await client
    .query({
      query: searchStringQuery,
      variables: { searchString },
    })
    .then((result) => extractIdsFromResult(result));
};


export type MealType = {
  rowId: string;
};

export type CategoryT = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | null;
