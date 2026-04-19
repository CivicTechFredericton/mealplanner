begin;

drop index if exists idx_person_cognito_sub;
alter table app.person drop column if exists cognito_sub;

commit;
