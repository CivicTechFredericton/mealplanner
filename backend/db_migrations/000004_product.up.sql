begin;

create table if not exists app.product (
    id bigserial primary key,
    name_en text not null,
    name_fr text,
    price numeric not null,
    quantity numeric not null,
    unit text not null,
    is_archived boolean not null default false,
    upc text,
    image_url text,
    source_url text,
    product_keywords text[], 
    tags text[],
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

create index if not exists 
    idx_product_product_keywords on app.product using gin(product_keywords);

comment on table app.product is 'Product details for off-the-shelf ingredients. In a Meal this combines with the ingredient to describe the ingredient and portion.';
comment on column app.product.name_en is 'Product name in English';
comment on column app.product.name_fr is 'Product name in French';
comment on column app.product.price is 'Dollar value in CAD';
comment on column app.product.quantity is 'The number of units in the item as it is sold. Combines with unit to determine the amount of Product in the item.';
comment on column app.product.unit is 'The unit of measurement applied to quantity to determine amount of Product sold.';
comment on column app.product.is_archived is '??';
comment on column app.product.upc is 'The Universal Product Code or SKU for the retail Product.';
comment on column app.product.image_url is 'A link to a retailer''s product image.';
comment on column app.product.source_url is 'A link to a retailer''s listing of the Product. This is meant to be a reference to the source of data for Quantity, Price, UPC, etc.';
comment on column app.product.tags is 'A list of tags (strings) used to apply attributes to the product listing. May include things like "vegetarian" or "contains peanuts" to facilitate filtering and matching with user''s dietrary needs and so forth. Tag values are determined by the user.';


create trigger tg_product_set_updated_at before update
on app.product 
for each row execute procedure app.set_updated_at();

create trigger tg_product_set_created_at before insert
on app.product 
for each row execute procedure app.set_created_at();

create or replace function app.product_nutrition(p app.product) returns app.nutrition as $$
  select * from app.nutrition n where n.nutritionable_id=p.id and n.nutritionable_type='product' limit 1;
$$ language sql stable;
comment on function app.product_nutrition(app.product) is 'Provides a link from Product to the specific nutritional value for the retail Product item, i.e. the nutritional label on the Product packaging.';

grant execute on function app.product_nutrition(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
grant select on table app.product to app_anonymous, app_user, app_meal_designer, app_admin;
grant usage on sequence app.product_id_seq to app_meal_designer, app_admin;
grant insert, update, delete on table app.product to app_meal_designer, app_admin;

commit;
