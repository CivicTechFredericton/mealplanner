BEGIN;

create table if not exists app.clients(
  id bigserial primary key,
  client_id text,
  created_at timestamp default now() not null,
  updated_at timestamp default now() not null
);
comment on table app.clients is 'Table to store client data';

create trigger tg_client_set_updated_at before update
on app.clients 
for each row execute procedure app.set_updated_at();

GRANT select, insert, delete, update on app.clients to app_admin;
GRANT select on app.clients to app_meal_designer, app_user;
GRANT usage on SEQUENCE app.clients_id_seq to app_admin;

COMMIT;
