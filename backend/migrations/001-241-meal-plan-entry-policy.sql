BEGIN;

-- ensure that regular, unprivileged user's new plans are automatically assigned to them
-- if they aren't, the insert violates row level policy
create or replace function app.set_meal_plan_new_person_id() returns trigger as $$
  begin
    if current_user = 'app_user' then
      new.person_id := nullif(current_setting('jwt.claims.person_id', true), '')::bigint;
    end if;
    return new;
  end;
  $$ language plpgsql;

drop trigger if exists tg_meal_plan_set_app_user_person_id on app.meal_plan;
create trigger tg_meal_plan_set_app_user_person_id before insert
  on app.meal_plan
  for each row execute procedure app.set_meal_plan_new_person_id();


-- allow regular users to update meal plan entries	
GRANT insert, delete, update on app.meal_plan_entry to app_user;
GRANT usage on SEQUENCE app.meal_plan_entry_id_seq to app_user;

-- add row level perms to restrict which entries can be updated
alter table app.meal_plan_entry enable row level security;

-- admin can work on any meal plan and its entries
drop policy if exists all_meal_plan_entry_admin on app.meal_plan_entry;
create policy all_meal_plan_entry_admin
  on app.meal_plan_entry
  for all
  to app_admin using(true);

-- meal designer can work on any meal plan and its entries
drop policy if exists all_meal_plan_entry_meal_designer on app.meal_plan_entry;
create policy all_meal_plan_entry_meal_designer
  on app.meal_plan_entry
  for all
  to app_meal_designer using(true);

-- user can only see or update entries belonging to their own meal plans
-- IMPORTANT: the row level policy on meal_plan must be in place for this to work
drop policy if exists all_meal_plan_entry_user on app.meal_plan_entry;
create policy all_meal_plan_entry_user
  on app.meal_plan_entry
  for all
  to app_user using(meal_plan_id in (select id from app.meal_plan where person_id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint)); -- NOTE: depends on meal_plan row level policy


COMMIT;
