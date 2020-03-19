BEGIN;

-- alter the table person to add meal plan id as a foreign key
-- create index for the above
-- write a function that makes a query to join meal plan with meals with products and measure and 
-- returns product id, product name, quantity, unit

ALTER TABLE app.person ADD meal_plan_id BIGINT references app.meal_plan(id);

create index idx_person_meal_plan_id on app.person(meal_plan_id);

create type app.shopping_list_item as (
    product_id BIGINT,
    product_name text,
    quantity numeric,
    unit text
);

create or replace function app.person_shopping_list(p app.person) returns setof app.shopping_list_item as $$

select app.product.id, app.product.name_en, SUM(app.measure.quantity), app.measure.unit 
from app.person
JOIN app.meal_plan_entry on app.person.meal_plan_id=app.meal_plan_entry.meal_plan_id
JOIN app.measure on app.meal_plan_entry.meal_id=app.measure.meal_id
JOIN app.product on app.measure.product_id=app.product.id
WHERE app.person.id = p.id
GROUP BY app.product.id, app.product.name_en, app.measure.unit;

$$ language sql stable;

GRANT execute on function app.person_shopping_list(app.person) to app_user, app_meal_designer, app_admin;
COMMIT;