create table if not exists app.nutrition (
    id bigserial primary key,
    servings_per_container numeric,
    serving_size numeric,
    serving_size_unit text,
    serving_size_text text,
    calories numeric,
    total_fat numeric,
    total_fat_unit text,
    total_fat_percent numeric,
    saturated_fat numeric,
    saturated_fat_unit text,
    saturated_fat_percent numeric,
    trans_fat numeric,
    trans_fat_unit text,
    trans_fat_percent numeric,
    cholesterol numeric,
    cholesterol_unit text,
    cholesterol_percent numeric,
    sodium numeric,
    sodium_unit text,
    sodium_percent numeric,
    carbohydrate numeric,
    carbohydrate_unit text,
    carbohydrate_percent numeric,
    dietary_fiber numeric,
    dietary_fiber_unit text,
    dietary_fiber_percent numeric,
    total_sugar numeric,
    total_sugar_unit text,
    total_sugar_percent numeric,
    protein numeric,
    protein_unit text,
    protein_percent numeric,
    vit_a numeric,
    vit_c numeric,
    vit_d numeric,
    vit_b6 numeric,
    vit_b12 numeric,
    vit_k numeric,
    vit_e numeric,
    calcium numeric,
    iron numeric,
    potassium numeric,
    nutritionable_id bigint not null,
    nutritionable_type text not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.nutrition is 'Table to store nutrition details';

create trigger tg_nutrition_set_updated_at before update
on app.nutrition
for each row execute procedure app.set_updated_at();

create or replace function app.product_nutrition(p app.product) returns setof app.nutrition as $$
  select * from app.nutrition n where n.nutritionable_id=p.id and n.nutritionable_type='product';
$$ language sql stable;

grant select on table app.nutrition to app_anonymous, app_user, app_meal_designer, app_admin;
grant usage on sequence app.nutrition_id_seq to app_meal_designer, app_admin;
grant insert, update, delete on table app.nutrition to app_meal_designer, app_admin;

grant execute on function app.product_nutrition(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;