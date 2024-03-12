BEGIN;

-- tags in the table product are for listing substitute reasons
alter table app.product 
    add column if not exists product_keywords text[], 
    drop column if exists code;
create index if not exists 
    idx_product_product_keywords on app.product using gin(product_keywords);

create table if not exists app.ingredient (
    id bigserial primary key,
    name text not null,
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

create INDEX idx_ingredient_product_keyword ON app.ingredient(product_keyword);
create INDEX idx_ingredient_meal_id ON app.ingredient(meal_id);

CREATE or REPLACE FUNCTION app.product_meals(p app.product) RETURNS SETOF app.meal as $$
     SELECT m.* FROM app.meal m JOIN app.ingredient ing ON m.id = ing.meal_id
     WHERE ing.product_keyword = ANY(p.product_keywords);
$$ language SQL STABLE;
comment on function app.product_meals(app.product) is 'Provides a link between Product and the Meals in which it is included as an ingredient.';

-- todo: review above function is required for shopping list

GRANT select, insert, update, delete on app.ingredient to app_meal_designer, app_admin;
GRANT select on app.ingredient to app_anonymous, app_user;
GRANT usage on SEQUENCE app.ingredient_id_seq to app_meal_designer, app_admin;
GRANT EXECUTE on FUNCTION app.product_meals(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;

COMMIT;