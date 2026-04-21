begin;
-- as aws cognito stores the user id as a uuid, we need to add a new column to store that value. This will allow us to eventually remove the person_id column which is a reference to the old auth system's person table
ALTER TABLE app.meal_plan ADD COLUMN person_uuid VARCHAR(64);
COMMENT ON COLUMN app.meal_plan.person_uuid IS 'Reference to the Person UUID from the auth system, used for identifying the assignee of the Plan.';

-- auto-assign cognito UUID on insert for regular users
create or replace function app.set_meal_plan_new_person_uuid() returns trigger as $$
  begin
    if current_user = 'app_user' then
      new.person_uuid := nullif(current_setting('jwt.claims.person_uuid', true), '');
    end if;
    return new;
  end;
$$ language plpgsql;

create trigger tg_meal_plan_set_app_user_person_uuid before insert
  on app.meal_plan
  for each row execute procedure app.set_meal_plan_new_person_uuid();

-- RLS policy for cognito users
create policy all_meal_plan_user_uuid
  on app.meal_plan
  for all
  to app_user using(person_uuid = nullif(current_setting('jwt.claims.person_uuid', true), ''));

ALTER TABLE app.favorite_meals ADD COLUMN person_uuid VARCHAR(64);
COMMENT ON COLUMN app.favorite_meals.person_uuid IS 'Reference to the Person UUID from the auth system, used for identifying the assignee of the favorite meal.';

-- RLS policy for cognito users
create policy user_favorite_meals_uuid on app.favorite_meals for all to app_user
using (person_uuid = nullif(current_setting('jwt.claims.person_uuid', true), ''));

-- Function to add a meal plan to favorites
create or replace function app.add_favorite_meal_uuid(meal_id_param bigint) returns void as $$
begin
    -- fetch the person_uuid from the current session
    insert into app.favorite_meals (meal_id, person_uuid)
    select meal_id_param, nullif(current_setting('jwt.claims.person_uuid', true), '')::varchar(64);
end;
$$ language plpgsql;

-- Function to delete a meal plan from favorites
create or replace function app.remove_favorite_meal_uuid(meal_id_param bigint) returns void as $$
declare
    person_uuid_param varchar(64);
begin
    -- fetch the person_uuid from the current session
    person_uuid_param := nullif(current_setting('jwt.claims.person_uuid', true), '')::varchar(64);

    -- delete from favorite_meals table based on meal_id and person_uuid
    delete from app.favorite_meals
    where meal_id = meal_id_param and person_uuid = person_uuid_param;
end;
$$ language plpgsql;

commit;