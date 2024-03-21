begin;
create table if not exists app.match (
    id bigserial primary key,
    product_id bigint references app.product(id) not null,
    ingredient_id bigint references app.ingredient(id) not null,
    relevance int not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

comment on table app.match is 'Connecting product with a particular ingredient and the relevance';
comment on column app.match.ingredient_id is 'The ingredient id from the ingredient table';
comment on column app.match.product_id is 'The product id from the product table';
comment on column app.match.relevance is 'How relevant is a product to the ingredient - 1 being best, 2 denotes good, not exists if not a match';
 
-- only if you mention STABLE it will be treated as Query, otherwise will be assumed as mutation
-- SETOF returns a connection which has pageInfo, edges -> cursor, node
create or replace function app.ingredient_matched_products(i app.ingredient) returns SETOF app.product as $$
    SELECT p.* 
    FROM app.product p JOIN app.match mch ON p.id = mch.product_id 
    WHERE mch.ingredient_id = i.id order by mch.relevance;
$$ language SQL STABLE;
comment on function app.ingredient_matched_products(app.ingredient) is 'Given a ingredient, returns a set of products that match';

create or replace function app.product_matched_ingredients(p app.product) returns SETOF app.ingredient as $$
    SELECT i.*
    FROM app.ingredient i JOIN app.match mch ON i.id = mch.ingredient_id
    WHERE mch.product_id = p.id order by mch.relevance;
$$ language SQL STABLE;
comment on function app.product_matched_ingredients(app.product) is 'Given a product, returns a set of ingredients that match';

create or replace function app.product_keyword_ingredients(p app.product) returns SETOF app.ingredient as $$
    SELECT i.*
    FROM app.ingredient i where i.product_keyword = ANY(p.product_keywords);
$$ language SQL STABLE;
comment on function app.product_keyword_ingredients(app.product) is 'Given a product keyword, returns a set of ingredients that have the product keyword';

create or replace function app.ingredient_keyword_products(i app.ingredient) returns SETOF app.product as $$
    SELECT p.*
    FROM app.product p where i.product_keyword = ANY(p.product_keywords); 
$$ language SQL STABLE;
comment on function app.ingredient_keyword_products(app.ingredient) is 'Given a product keyword from ingredient, returns a set of products that have the product keyword';

create or replace function app.update_matches(ing_id bigint, product_ids bigint[]) returns SETOF app.match as $$
    declare
    relevances int[];
    len int;
    begin
        len := array_length(product_ids, 1);
        select array_agg(s) from generate_series(1, len) s into relevances;
        delete from app.match where ingredient_id = ing_id;
        insert into app.match(product_id, ingredient_id, relevance) 
        select unnest(product_ids), ing_id, unnest(relevances); 
        return query select * from app.match where ingredient_id = ing_id;
    end;
$$ language plpgsql;
comment on function app.update_matches(bigint, bigint[]) is 'Given an ingredient id and product ids, updates the matches and returns the updated matches';

grant select on table app.match to app_anonymous, app_user, app_admin, app_meal_designer;
grant insert, update, delete on table app.match to app_meal_designer, app_admin;
grant usage on sequence app.match_id_seq to app_meal_designer, app_admin;
grant execute on function app.ingredient_matched_products(app.ingredient) to app_anonymous, app_user, app_meal_designer, app_admin;
grant execute on function app.product_matched_ingredients(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
grant execute on function app.product_keyword_ingredients(p app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
grant execute on function app.ingredient_keyword_products(i app.ingredient) to app_anonymous, app_user, app_meal_designer, app_admin;
grant execute on function app.update_matches(ingredient_id bigint, product_ids bigint[]) to app_meal_designer, app_admin;

commit;
