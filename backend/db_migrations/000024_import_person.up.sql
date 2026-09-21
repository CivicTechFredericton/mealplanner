begin;

-- Imports one row from a CSV user upload.
--
-- Matching order:
--   1) client_id, when supplied. This is the stable identifier Greener
--      Village uses, so it wins over email. That is what lets an email be
--      changed without creating a duplicate person.
--   2) email.
--   3) no match, so insert a new person.
--
-- New rows are created with cognito_sub null. They show up in the admin UI
-- straight away so roles can be set, and app.upsert_person_from_cognito
-- attaches the Cognito login the first time the person signs in.
create or replace function app.import_person(
  p_email text,
  p_client_id text default null,
  p_full_name text default null
) returns app.person as $$
declare
  p app.person;
  v_email text;
  v_client_id text;
  v_conflict_id bigint;
begin
  v_email := lower(btrim(coalesce(p_email, '')));
  v_client_id := nullif(btrim(coalesce(p_client_id, '')), '');

  if v_email = '' then
    raise exception 'email is required';
  end if;

  if position('@' in v_email) = 0 then
    raise exception 'not a valid email address: %', v_email;
  end if;

  -- 1) match on client_id
  if v_client_id is not null then
    select * into p
    from app.person
    where client_id = v_client_id
    limit 1
    for update;

    if found then
      if lower(p.email) <> v_email then
        select id into v_conflict_id
        from app.person
        where lower(email) = v_email
          and id <> p.id
        limit 1;

        if v_conflict_id is not null then
          raise exception
            'cannot set email % on client_id %, that email already belongs to person %',
            v_email, v_client_id, v_conflict_id;
        end if;

        update app.person
        set email = v_email
        where id = p.id
        returning * into p;
      end if;

      return p;
    end if;
  end if;

  -- 2) match on email
  select * into p
  from app.person
  where lower(email) = v_email
  limit 1
  for update;

  if found then
    -- No conflict check needed here. If this client_id belonged to anyone,
    -- the branch above would already have matched them. The unique index on
    -- client_id is the backstop.
    if v_client_id is not null and p.client_id is distinct from v_client_id then
      update app.person
      set client_id = v_client_id
      where id = p.id
      returning * into p;
    end if;

    return p;
  end if;

  -- 3) no match, insert
  insert into app.person (full_name, email, client_id)
  values (
    coalesce(nullif(btrim(p_full_name), ''), split_part(v_email, '@', 1)),
    v_email,
    v_client_id
  )
  returning * into p;

  -- app.make_first_user_admin promotes the first row inserted into an empty
  -- app.person table. That is meant for the first person to sign in, not for
  -- a bulk import, where the first row is just whatever came first in the
  -- spreadsheet. Undo it here and leave the trigger itself alone.
  if p.role = 'app_admin' then
    update app.person
    set role = 'app_user'
    where id = p.id
    returning * into p;
  end if;

  return p;
end;
$$ language plpgsql security definer;

comment on function app.import_person(text, text, text) is
  'Imports one row from a CSV user upload. Matches on client_id, then email, otherwise inserts. New rows have no Cognito login attached until the person first signs in.';

grant execute on function app.import_person(text, text, text) to app_admin;

commit;
