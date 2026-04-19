begin;

alter table app.person
  add column if not exists cognito_sub text;

create unique index if not exists idx_person_cognito_sub
  on app.person (cognito_sub)
  where cognito_sub is not null;

comment on column app.person.cognito_sub is
  'Stable Cognito user identifier (JWT sub claim).';

commit;
