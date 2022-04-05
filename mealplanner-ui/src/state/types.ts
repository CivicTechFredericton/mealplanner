import { SearchMeal_data$data } from "../pages/MealPlans/__generated__/SearchMeal_data.graphql";

export type SearchedMeal = Exclude<
  Exclude<SearchMeal_data$data["meals"], null>["nodes"],
  null
>[number];
