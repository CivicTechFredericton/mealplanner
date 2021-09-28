BEGIN;

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
comment on column app.meal_plan_entry.days is '??';
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

GRANT select, insert, delete, update on app.meal_plan_entry to app_user, app_meal_designer, app_admin;
GRANT select on app.meal_plan_entry to app_anonymous;
GRANT usage on SEQUENCE app.meal_plan_entry_id_seq to app_user, app_meal_designer, app_admin;

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
