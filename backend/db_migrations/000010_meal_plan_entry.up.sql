begin;

create table if not exists app.meal_plan_entry (
    id bigserial primary key,
    category app.category_t not null,
    days int not null,
    meal_plan_id bigint REFERENCES app.meal_plan(id) ON DELETE CASCADE NOT NULL ,
    meal_id bigint REFERENCES app.meal(id) NOT NULL,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal_plan_entry is 'Entries are Meals assigned to days of the week and specific meal times (Breakfast, Lunch, etc) within a specific Plan.';
comment on column app.meal_plan_entry.category is 'Category or mealtime for the assigned Meal. Can be one of "Breakfast", "Lunch", "Dinner" or "Snack" ';
comment on column app.meal_plan_entry.days is 'MONDAY: 0, TUESDAY: 1.., SUNDAY: 6';
comment on column app.meal_plan_entry.meal_plan_id is 'Reference to the Plan in which item belongs.';
comment on column app.meal_plan_entry.meal_id is 'The Meal that is being assigned to the plan.';

create trigger tg_meal_plan_entry_set_updated_at before update
on app.meal_plan_entry
for each row execute procedure app.set_updated_at();

create trigger tg_meal_plan_entry_set_created_at before insert
on app.meal_plan_entry
for each row execute procedure app.set_created_at();

create index idx_meal_plan_entry_meal_plan_id on app.meal_plan_entry(meal_plan_id);
create index idx_meal_plan_entry_meal_id on app.meal_plan_entry(meal_id);
create index idx_meal_plan_entry_category on app.meal_plan_entry(category);
create index idx_meal_plan_entry_days on app.meal_plan_entry(days);

create or replace function app.duplicate_meal_plan(mealplan_id bigint, p_id bigint) returns app.meal_plan as $$
declare
  m app.meal_plan;
  entry_ids bigint[];
begin
  --create a duplicate meal plan with a different meal plan id and person id p_id but the same contents
  insert into app.meal_plan (name_en, name_fr, person_id, description_en, description_fr, tags)
   select name_en, name_fr, p_id as person_id, description_en, description_fr, tags from app.meal_plan where id=mealplan_id
  returning * into m;
  -- m = UPDATE app.meal_plan SET person_id=p_id WHERE id = m.id RETURNING *;

  --create duplicate of all meal plan entries associated with the meal_plan_id

  insert into app.meal_plan_entry (category, days, meal_plan_id, meal_id)
  select category, days, m.id as meal_plan_id, meal_id from app.meal_plan_entry 
  where meal_plan_id = mealplan_id;

  return m;
end;
$$ language plpgsql;
comment on function app.duplicate_meal_plan(bigint, bigint) is 'Duplicate meal plan by meal designer or admin';



grant select, insert, delete, update on app.meal_plan_entry to app_user, app_meal_designer, app_admin;
grant select on app.meal_plan_entry to app_anonymous;
grant usage on sequence app.meal_plan_entry_id_seq to app_user, app_meal_designer, app_admin;
grant execute on function app.duplicate_meal_plan(bigint, bigint) to app_admin, app_meal_designer; 

alter table app.meal_plan_entry enable row level security;

create policy all_meal_plan_entry_admin
  on app.meal_plan_entry
  for all
  to app_admin using(true);

create policy all_meal_plan_entry_meal_designer
  on app.meal_plan_entry
  for all
  to app_meal_designer using(true);

create policy all_meal_plan_entry_user
  on app.meal_plan_entry
  for all
  to app_user using(meal_plan_id in (select id from app.meal_plan where person_id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint)); -- NOTE: depends on meal_plan row level policy

COMMIT;
