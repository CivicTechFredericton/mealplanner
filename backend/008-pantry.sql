BEGIN;
create table if not exists app.pantry(
    id bigserial PRIMARY KEY,
    person_id bigint REFERENCES  app.person(id) NOT NULL,
    product_id bigint REFERENCES app.product(id) NOT NULL,
    created_at timestamp default now() NOT NULL,
    updated_at timestamp default now() NOT NULL
);
comment on table app.pantry is 'Table to store pantry details';

create trigger tg_app_pantry_set_updated_at before UPDATE
on app.pantry
for each row execute procedure app.set_updated_at(); 

create trigger tg_app_pantry_set_created_at before insert
on app.pantry
for each row execute procedure app.set_created_at(); 

create index idx_pantry_person_id on app.pantry(person_id);
create index idx_pantry_product_id on app.pantry(product_id);

GRANT select, insert, delete, update on app.pantry to app_user;
GRANT usage on SEQUENCE app.pantry_id_seq to app_user;

COMMIT;
