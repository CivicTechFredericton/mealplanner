begin;

alter table app.person drop column if exists invited_at;

commit;
