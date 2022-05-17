import { SearchMeal_data$data } from "../pages/MealPlans/__generated__/SearchMeal_data.graphql";
import { MealPlansQuery$data } from "../pages/MealPlans/__generated__/MealPlansQuery.graphql";
export type SearchedMeal = Exclude<
  Exclude<SearchMeal_data$data["meals"], null>["nodes"],
  null
>[number];

export type MealPlanNode = Exclude<Exclude<MealPlansQuery$data["mealPlans"], null>["nodes"], null>[number];
