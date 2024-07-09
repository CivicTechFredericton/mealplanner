revoke execute on function app.duplicate_meal_plan(bigint,bigint,text) from app_admin, app_meal_designer, app_user;
drop function if exists app.duplicate_meal_plan(bigint,bigint,text); --otherwise it creates two separate functions
comment on column app.meal_plan_entry.days is 'MONDAY: 0, TUESDAY: 1.., SUNDAY: 6';
create or replace function app.duplicate_meal_plan(mealplan_id bigint, p_id bigint) returns app.meal_plan as $$
declare
m app.meal_plan;
entry_ids bigint[];
begin
--create a duplicate meal plan with a different meal plan id and person id p_id but the same contents
INSERT INTO app.meal_plan (name_en, name_fr, person_id, description_en, description_fr, tags)
 SELECT name_en, name_fr, p_id as person_id, description_en, description_fr, tags FROM app.meal_plan WHERE id=mealplan_id
RETURNING * INTO m;
-- m = UPDATE app.meal_plan SET person_id=p_id WHERE id = m.id RETURNING *;

--create duplicate of all meal plan entries associated with the meal_plan_id

INSERT INTO app.meal_plan_entry (category, days, meal_plan_id, meal_id)
SELECT category, days, m.id AS meal_plan_id, meal_id FROM app.meal_plan_entry 
WHERE meal_plan_id = mealplan_id;

return m;

end;

$$ language plpgsql;

comment on function app.duplicate_meal_plan(bigint, bigint) is 'Duplicate meal plan by meal designer or admin';
GRANT execute on function app.duplicate_meal_plan(bigint, bigint) to app_admin, app_meal_designer; 