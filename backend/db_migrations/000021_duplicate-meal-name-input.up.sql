
comment on column app.meal_plan_entry.days is 'MONDAY: 0, TUESDAY: 1.., SUNDAY: 6';
revoke execute on function app.duplicate_meal_plan(bigint,bigint) from app_admin, app_meal_designer, app_user;
drop function if exists app.duplicate_meal_plan(bigint,bigint); --otherwise it creates two separate functions
create or replace function app.duplicate_meal_plan(mealplan_id bigint, p_id bigint, dup_name_en text) returns app.meal_plan as $$
declare
m app.meal_plan;
entry_ids bigint[];
p app.person;
begin
p := app.current_user_person(app.current_person());

--create a duplicate meal plan with a different meal plan id and person id p_id but the same contents
IF (p.id = p_id and p.role='app_user') THEN
 INSERT INTO app.meal_plan (name_en, name_fr, person_id, description_en, description_fr, tags)
  SELECT dup_name_en as name_en, name_fr, p_id as person_id, description_en, description_fr, tags FROM app.meal_plan WHERE id=mealplan_id
 RETURNING * INTO m;
ELSE
 INSERT INTO app.meal_plan (name_en, name_fr, person_id, description_en, description_fr, tags)
  SELECT dup_name_en as name_en, name_fr, null, description_en, description_fr, tags FROM app.meal_plan WHERE id=mealplan_id
 RETURNING * INTO m;
END IF;
-- m = UPDATE app.meal_plan SET person_id=p_id WHERE id = m.id RETURNING *;

--create duplicate of all meal plan entries associated with the meal_plan_id

INSERT INTO app.meal_plan_entry (category, days, meal_plan_id, meal_id)
SELECT category, days, m.id AS meal_plan_id, meal_id FROM app.meal_plan_entry 
WHERE meal_plan_id = mealplan_id;

return m;

end;

$$ language plpgsql;

comment on function app.duplicate_meal_plan(bigint, bigint,text) is 'Duplicate meal plan by meal designer, admin, or user';
GRANT execute on function app.duplicate_meal_plan(bigint, bigint,text) to app_admin, app_meal_designer, app_user;  