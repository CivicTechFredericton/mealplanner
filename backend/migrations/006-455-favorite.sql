BEGIN;
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

create policy all_favorite_meal_all
    on app.favorite_meal
    for all
    to app_admin, app_meal_designer, app_user
    using (id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

COMMIT;