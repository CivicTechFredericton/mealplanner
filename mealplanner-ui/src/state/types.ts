import { MealPlansQuery$data } from "../pages/MealPlans/__generated__/MealPlansQuery.graphql";
import { SearchMeal_data$data } from "../pages/MealPlans/__generated__/SearchMeal_data.graphql";
import { MealsQuery$data } from "../pages/Meals/__generated__/MealsQuery.graphql";
export type SearchedMeal = Exclude<
  Exclude<SearchMeal_data$data["meals"], null>["nodes"],
  null
>[number];

export type MealPlanNode = Exclude<
  Exclude<
    Exclude<MealPlansQuery$data["mealPlans"], null>["edges"],
    null
  >[number]["node"],
  null
>;

export type MealNode = Exclude<
  Exclude<Exclude<MealsQuery$data["meals"], null>["nodes"], null>[number],
  null
>;
