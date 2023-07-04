BEGIN;
create table if not exists app.favorite_meal (
    id bigserial primary key,
    person_id bigserial REFERENCES app.person(id) ON DELETE CASCADE not null,
    meal_id BIGINT REFERENCES app.meal(id) ON DELETE CASCADE not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.favorite_meal is 'Favorite list for each of the user with meal.';
comment on column app.favorite_meal.person_id is 'Reference to the Person who has created Favorite list.';
comment on column app.favorite_meal.meal_id is 'Reference to the Meal for which the Favorite is assigned by a perticular user.';

create trigger tg_app_favorite_set_updated_at before update
on app.favorite_meal
for each row execute procedure app.set_updated_at(); 

create trigger tg_app_favorite_set_created_at before insert
on app.favorite_meal
for each row execute procedure app.set_created_at();

create index idx_favorite_meal_person_id on app.favorite_meal(person_id);
create index idx_favorite_meal_product_id on app.favorite_meal(meal_id);

alter table app.favorite_meal enable row level security;

GRANT SELECT, INSERT, UPDATE, DELETE on TABLE app.favorite_meal 
to app_user, app_meal_designer, app_admin;

create policy all_favorite_meal
    on app.favorite_meal
    for all
    to app_admin, app_meal_designer, app_user
    using (person_id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

COMMIT;