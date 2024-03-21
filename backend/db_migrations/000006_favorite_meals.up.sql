begin;

create table if not exists app.favorite_meals (
    id bigserial primary key,
    meal_id bigint not null references app.meal(id),
    person_id bigint references app.person(id),
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null,
    unique (meal_id, person_id)
);

-- Create triggers to set created_at and updated_at timestamps
create or replace trigger tg_favorite_meals_set_updated_at before update
on app.favorite_meals 
for each row execute procedure app.set_updated_at();

create or replace trigger tg_favorite_meals_set_created_at before insert
on app.favorite_meals 
for each row execute procedure app.set_created_at();

-- Create row level security to enable only to view current user favorite meals
alter table app.favorite_meals enable row level security;
--An admin will be able to view/create/update favorite meals for any user
create policy admin_favorite_meals on app.favorite_meals for all to app_admin using(true);
--A meal designer will be able to view/create/update favorite meals for any user
create policy meal_designer_favorite_meals on app.favorite_meals for all to app_meal_designer using(true);
--A user will only be able to view/create/update only if he/she/they are the current logged in user
create policy user_favorite_meals on app.favorite_meals for all to app_user
using (person_id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

-- Function to add a meal plan to favorites
create or replace function app.add_favorite_meal(meal_id_param bigint) returns void as $$
begin
    -- fetch the person_id from the current session
    insert into app.favorite_meals (meal_id, person_id)
    select meal_id_param, nullif(current_setting('jwt.claims.person_id', true), '')::bigint;
end;
$$ language plpgsql;


-- Function to delete a meal plan from favorites
create or replace function app.remove_favorite_meal(meal_id_param bigint) returns void as $$
declare
    person_id_param bigint;
begin
    -- fetch the person_id from the current session
    person_id_param := nullif(current_setting('jwt.claims.person_id', true), '')::bigint;

    -- delete from favorite_meals table based on meal_id and person_id
    delete from app.favorite_meals
    where meal_id = meal_id_param and person_id = person_id_param;
end;
$$ language plpgsql;

-- Grant execute permission to appropriate roles
grant select, insert, delete, update on app.favorite_meals to app_user, app_meal_designer, app_admin;
grant usage on sequence app.favorite_meals_id_seq to app_user, app_meal_designer, app_admin;

commit;
