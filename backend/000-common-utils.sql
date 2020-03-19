begin;
  create schema if not exists app;
  create schema if not exists app_private;

  -- after schema creation and before function creation
  alter default privileges revoke execute on functions from public;

  create or replace function app.set_updated_at() returns trigger as $$
  begin
    new.updated_at := current_timestamp;
    return new;
  end;
  $$ language plpgsql;
end;