begin;

create table if not exists app.product (
    id bigserial primary key,
    name_en text not null,
    name_fr text,
    code text not null,
    price numeric not null,
    quantity numeric not null,
    unit text not null,
    is_archived boolean not null default false,
    upc text,
    walmart_link text,
    tags text[],
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.product is 'Table to store product details';

create trigger tg_product_set_updated_at before update
on app.product 
for each row execute procedure app.set_updated_at();

create or replace function app.product_nutrition(p app.product) returns app.nutrition as $$
  select * from app.nutrition n where n.nutritionable_id=p.id and n.nutritionable_type='product' limit 1;
$$ language sql stable;

grant execute on function app.product_nutrition(app.product) to app_anonymous, app_user, app_meal_designer, app_admin;
grant select on table app.product to app_anonymous, app_user, app_meal_designer, app_admin;
grant usage on sequence app.product_id_seq to app_meal_designer, app_admin;
grant insert, update, delete on table app.product to app_meal_designer, app_admin;

commit;