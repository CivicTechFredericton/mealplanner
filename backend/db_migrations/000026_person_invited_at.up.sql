begin;

alter table app.person
  add column if not exists invited_at timestamp;

comment on column app.person.invited_at is
  'When a Cognito invitation was last sent. Null means never invited. Lets "Invite everyone" skip people who were already sent one.';

commit;
