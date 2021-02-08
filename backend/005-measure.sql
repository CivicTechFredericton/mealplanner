BEGIN;

create table if not exists app.measure (
    id bigserial primary key,
    unit text NOT NULL,
    quantity numeric NOT NULL,
    product_id BIGINT REFERENCES app.product(id) not null,
    meal_id BIGINT REFERENCES app.meal(id) NOT NULL,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.measure is 'Measurement details for each of the ingredients in the recipe. Specific to the recipe, not to be confused with the Product quantity and unit.';
comment on column app.measure.unit is 'The measurement type to be used by the preparer, i.e. tsp, tbsp, cup, mL, etc.';
comment on column app.measure.quantity is 'The numerical part of the measurement to be used by the preparer. Combines with unit to describe the measurement such as 1 tbsp, etc.';
comment on column app.measure.product_id is 'Reference to the Product item as it would be purchased. Provides individual product naming, nutrition, etc.';
comment on column app.measure.meal_id is 'Reference back to the Meal for which this is an ingredient.';

create trigger tg_measure_set_updated_at before update
on app.measure 
for each row execute procedure app.set_updated_at();

create trigger tg_measure_set_created_at before insert
on app.measure 
for each row execute procedure app.set_created_at();

create INDEX idx_measure_product_id ON app.measure(product_id);
create INDEX idx_measure_meal_id ON app.measure(meal_id);

CREATE or REPLACE FUNCTION app.product_meals(p app.product) RETURNS SETOF app.meal as $$
     SELECT m.* FROM app.meal m JOIN app.measure msr ON m.id = msr.meal_id
     WHERE msr.product_id=p.id;
$$ language SQL STABLE;
comment on function app.product_meals(app.product) is 'Provides a link between Product and the Meals in which it is included as an ingredient.';

CREATE or REPLACE FUNCTION app.meal_products(m app.meal) RETURNS SETOF app.product as $$
    SELECT p.*
    FROM app.product p JOIN app.measure msr ON p.id = msr.product_id
    WHERE msr.meal_id = m.id;
$$ language SQL STABLE;
comment on function app.meal_products(app.meal) is 'Provides a link between a Meal and all the Products that are used within it as ingredients.';
-- todo: review both functions above to determine if they are really needed. They may be redundant with the natural graph functionality.

GRANT select, insert, update, delete on app.measure to app_meal_designer, app_admin;
GRANT select on app.measure to app_anonymous, app_user;
GRANT usage on SEQUENCE app.measure_id_seq to app_meal_designer, app_admin;
GRANT EXECUTE on FUNCTION app.product_meals(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
GRANT EXECUTE on FUNCTION app.meal_products(app.meal) to app_anonymous, app_user, app_meal_designer, app_admin;

COMMIT;
