import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { MealsDataQuery } from "./__generated__/MealsDataQuery.graphql";

const mealsDataQuery = graphql`
  query MealsDataQuery {
    meals(orderBy: [ID_DESC], first: 1000) {
      nodes {
        rowId
        nameEn
        nameFr
        descriptionEn
        descriptionFr
        categories
        tags
        code
        photoUrl
        videoUrl
      }
    }
    # fragment name from MealTags
    ...MealTags_tags
    gqLocalState {
      selectedMealTags
    }
    # fragment name from PersonFavoriteMeals
    ...PersonFavoriteMeals_favorites
  }
`;

export const useMealsData = () => {
  const data = useLazyLoadQuery<MealsDataQuery>(
    mealsDataQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
  return data;
};
