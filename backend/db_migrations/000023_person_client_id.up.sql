begin;

alter table app.person
  add column if not exists client_id text;

create unique index if not exists idx_person_client_id
  on app.person (client_id)
  where client_id is not null;

comment on column app.person.client_id is
  'External identifier used by Greener Village. Stored but never interpreted. Used to match an existing person when their email changes.';

commit;
