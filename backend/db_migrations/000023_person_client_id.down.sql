begin;

drop index if exists idx_person_client_id;
alter table app.person drop column if exists client_id;

commit;
