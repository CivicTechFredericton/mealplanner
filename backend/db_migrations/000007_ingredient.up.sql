begin;

create table if not exists app.ingredient (
    id bigserial primary key,
    name text not null,
    code int unique,
    quantity numeric not null,
    unit text not null,
    product_keyword text not null,
    substitute_ingredient_id bigint references app.ingredient(id),
    substitute_reason text[],
    meal_id bigint references app.meal(id) not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table app.ingredient is 'Ingredients in the recipe referred with meal_id. Specific to the recipe, not to be confused with the Product quantity and unit.';
comment on column app.ingredient.unit is 'The measurement type to be used by the preparer, i.e. tsp, tbsp, cup, mL, etc.';
comment on column app.ingredient.code is 'Unique code for the ingredient such 1, 2, 3, to later combine as M001-I01';
comment on column app.ingredient.quantity is 'The numerical part of the measurement to be used by the preparer. Combines with unit to describe the measurement such as 1 tbsp, etc.';
comment on column app.ingredient.product_keyword is 'Reference to the Product item as it would be purchased. Product has tags which are the keywords';
comment on column app.ingredient.meal_id is 'Reference back to the Meal for which this is an ingredient.';
comment on column app.ingredient.substitute_ingredient_id is 'If the current record is a substitute to another ingredient, then this represents the other ingredient id';
comment on column app.ingredient.substitute_reason is 'Reason can be specified such as vegan, gluten-free for which this substitute exists';


create trigger tg_ingredient_set_updated_at before update
on app.ingredient 
for each row execute procedure app.set_updated_at();

create trigger tg_ingredient_set_created_at before insert
on app.ingredient
for each row execute procedure app.set_created_at();

create index idx_ingredient_product_keyword on app.ingredient(product_keyword);
create index idx_ingredient_meal_id on app.ingredient(meal_id);

create or replace function app.product_meals(p app.product) returns setof app.meal as $$
     select m.* from app.meal m join app.ingredient ing on m.id = ing.meal_id
     where ing.product_keyword = any(p.product_keywords);
$$ language sql stable;
comment on function app.product_meals(app.product) is 'Provides a link between Product and the Meals in which it is included as an ingredient.';

grant select, insert, update, delete on app.ingredient to app_meal_designer, app_admin;
grant select on app.ingredient to app_anonymous, app_user;
grant usage on sequence app.ingredient_id_seq to app_meal_designer, app_admin;
grant execute on function app.product_meals(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;

commit;
