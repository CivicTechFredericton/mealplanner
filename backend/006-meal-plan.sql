BEGIN;
create table if not exists app.meal_plan (
    id bigserial primary key,
    name_en text not null,
    name_fr text,
    description_en text,
    description_fr text,
    client_id bigint REFERENCES app.clients(id),
    tags text[],
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal_plan is 'Table to store meal_plan details';

create trigger tg_meal_plan_set_updated_at before update
on app.meal_plan 
for each row execute procedure app.set_updated_at();

create index idx_meal_plan_client_id on app.meal_plan(client_id);

GRANT select, insert, delete, update on app.meal_plan to app_meal_designer, app_admin;
GRANT select on app.meal_plan to app_anonymous, app_user;
GRANT usage on SEQUENCE app.meal_plan_id_seq to app_meal_designer, app_admin;

COMMIT;
