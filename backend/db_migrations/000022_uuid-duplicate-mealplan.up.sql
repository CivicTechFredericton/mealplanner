begin;

create or replace function app.duplicate_meal_plan_uuid(mealplan_id bigint) returns app.meal_plan as $$
declare
  m app.meal_plan;
  p_uuid varchar(64);
begin
  p_uuid := nullif(current_setting('jwt.claims.person_uuid', true), '');

  INSERT INTO app.meal_plan (name_en, name_fr, person_uuid, description_en, description_fr, tags)
    SELECT name_en, name_fr, p_uuid, description_en, description_fr, tags
    FROM app.meal_plan WHERE id = mealplan_id
  RETURNING * INTO m;

  INSERT INTO app.meal_plan_entry (category, days, meal_plan_id, meal_id)
    SELECT category, days, m.id AS meal_plan_id, meal_id FROM app.meal_plan_entry
    WHERE meal_plan_id = mealplan_id;

  return m;
end;
$$ language plpgsql;

comment on function app.duplicate_meal_plan_uuid(bigint) is 'Duplicate meal plan assigned to the current cognito user';
GRANT execute on function app.duplicate_meal_plan_uuid(bigint) to app_admin, app_meal_designer, app_user;

commit;
