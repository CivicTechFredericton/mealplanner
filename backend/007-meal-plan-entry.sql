BEGIN;


create type app.category_t as enum('Breakfast', 'Lunch', 'Dinner', 'Snack');

create table if not exists app.meal_plan_entry (
    id bigserial primary key,
    category app.category_t not null,
    days int not null,
    meal_plan_id bigint REFERENCES app.meal_plan(id) NOT NULL,
    meal_id bigint REFERENCES app.meal(id) NOT NULL,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal_plan_entry is 'Table to store meal_plan_entries details';

create trigger tg_meal_plan_entry_set_updated_at before update
on app.meal_plan_entry
for each row execute procedure app.set_updated_at();

create index idx_meal_plan_entry_meal_plan_id on app.meal_plan_entry(meal_plan_id);
create index idx_meal_plan_entry_meal_id on app.meal_plan_entry(meal_id);

GRANT select, insert, delete, update on app.meal_plan_entry to app_meal_designer, app_admin;
GRANT select on app.meal_plan_entry to app_anonymous, app_user;
GRANT usage on SEQUENCE app.meal_plan_entry_id_seq to app_meal_designer, app_admin;

COMMIT;