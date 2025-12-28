import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { getCurrentPerson } from "../../state/state";
import { MealsDataQuery } from "./__generated__/MealsDataQuery.graphql";

const mealsDataQuery = graphql`
  query MealsDataQuery($slug: String!) {
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
    ...PersonFavoriteMeals_favorites @arguments(slug: $slug)
  }
`;

export const useMealsData = () => {
  const slug = getCurrentPerson().personSlug;
  const data = useLazyLoadQuery<MealsDataQuery>(
    mealsDataQuery,
    { slug: slug as string },
    { fetchPolicy: "store-or-network" }
  );
  return data;
};
