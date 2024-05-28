GRANT execute on function app.duplicate_meal_plan(bigint, bigint) to app_admin, app_meal_designer;
drop function if exists app.duplicate_meal_plan(mealplan_id bigint, p_id bigint);