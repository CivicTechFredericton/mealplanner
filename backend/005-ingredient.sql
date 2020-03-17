BEGIN;

create table if not exists app.ingredient (
    id bigserial primary key,
    unit text NOT NULL,
    quantity numeric NOT NULL,
    product_id BIGINT REFERENCES app.product(id) not null,
    meal_id BIGINT REFERENCES app.meal(id) NOT NULL,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.ingredient is 'Table to store ingredient details';

create trigger tg_ingredient_set_updated_at before update
on app.ingredient 
for each row execute procedure app.set_updated_at();

create INDEX idx_ingredient_product_id ON app.ingredient(product_id);
create INDEX idx_ingredient_meal_id ON app.ingredient(meal_id);

CREATE or REPLACE FUNCTION app.product_meals(p app.product) RETURNS SETOF app.meal as $$
     SELECT m.* FROM app.meal m JOIN app.ingredient ing ON m.id = ing.meal_id
     WHERE ing.product_id=p.id;
$$ language SQL STABLE;

CREATE or REPLACE FUNCTION app.meal_products(m app.meal) RETURNS SETOF app.product as $$
    SELECT p.*
    FROM app.product p JOIN app.ingredient ing ON p.id = ing.product_id
    WHERE ing.meal_id = m.id;
$$ language SQL STABLE;

GRANT select, insert, update, delete on app.ingredient to app_meal_designer, app_admin;
GRANT select on app.ingredient to app_anonymous, app_user;
GRANT usage on SEQUENCE app.ingredient_id_seq to app_meal_designer, app_admin;
GRANT EXECUTE on FUNCTION app.product_meals(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
GRANT EXECUTE on FUNCTION app.meal_products(app.meal) to app_anonymous, app_user, app_meal_designer, app_admin;

COMMIT;