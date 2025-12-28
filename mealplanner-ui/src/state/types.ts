import { MealPlansQuery$data } from "../pages/MealPlans/__generated__/MealPlansQuery.graphql";
import { SearchMeal_data$data } from "../pages/MealPlans/__generated__/SearchMeal_data.graphql";
import { MealsDataQuery$data } from "../pages/Meals/__generated__/MealsDataQuery.graphql";
export type SearchedMeal = Exclude<
  NonNullable<NonNullable<SearchMeal_data$data["meals"]>["nodes"]>[number],
  null
>;

export type MealPlanNode = Exclude<
  Exclude<
    NonNullable<NonNullable<MealPlansQuery$data["mealPlans"]>["edges"]>[number]["node"],
    null
  >,
  null
>;

export type MealNode = Exclude<
  NonNullable<NonNullable<MealsDataQuery$data["meals"]>["nodes"]>[number],
  null
>;
