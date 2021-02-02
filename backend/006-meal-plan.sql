BEGIN;
create table if not exists app.meal_plan (
    id bigserial primary key,
    name_en text not null,
    name_fr text,
    description_en text,
    description_fr text,
    person_id bigint REFERENCES app.person(id),
    tags text[],
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal_plan is 'Collection of Meals, organized together in a Plan, typically a weekly plan.';
comment on column app.meal_plan.name_en is 'A short name for the Plan in English';
comment on column app.meal_plan.name_fr is 'A short name for the Plan in French';
comment on column app.meal_plan.description_en is 'A full description of the Meal Plan in English';
comment on column app.meal_plan.description_fr is 'A full description of the Meal Plan in French';
comment on column app.meal_plan.person_id is 'Reference to the Person who is the assignee of the Plan';
comment on column app.meal_plan.tags is 'A list of tags (strings) used to apply attributes to the Meal Plan. May include things like "week one" or "for 5" to facilitate filtering help the user organize plans';

create trigger tg_meal_plan_set_updated_at before update
on app.meal_plan 
for each row execute procedure app.set_updated_at();

create index idx_meal_plan_person_id on app.meal_plan(person_id);

GRANT select, insert, delete, update on app.meal_plan to app_meal_designer, app_admin;
GRANT select on app.meal_plan to app_anonymous, app_user;
GRANT usage on SEQUENCE app.meal_plan_id_seq to app_meal_designer, app_admin;

COMMIT;
