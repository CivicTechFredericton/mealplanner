create table if not exists app.product (
    id bigserial primary key,
    name_en text not null,
    name_fr text,
    code text not null,
    price numeric not null,
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

grant select on table app.product to app_anonymous, app_user, app_meal_designer, app_admin;
grant usage on sequence app.product_id_seq to app_meal_designer, app_admin;
grant insert, update, delete on table app.product to app_meal_designer, app_admin;