begin;

-- Only people who already have a record may sign in.
--
-- This function used to create a person for anyone presenting a valid Cognito
-- token, which meant that holding a Cognito account was enough to get into the
-- meal planner. Records now come from the CSV import instead, so that last
-- case refuses.
--
-- Returns null when there is no matching record. The caller turns that into a
-- 401. Null is used rather than raising, so the backend can tell "not allowed"
-- apart from "the database broke".
create or replace function app.upsert_person_from_cognito(
  p_cognito_sub text,
  p_email text,
  p_full_name text
) returns app.person as $$
declare
  p app.person;
begin
  if p_cognito_sub is null or btrim(p_cognito_sub) = '' then
    raise exception 'cognito_sub is required';
  end if;

  -- 1) existing link by sub
  select * into p
  from app.person
  where cognito_sub = p_cognito_sub
  limit 1;

  if found then
    return p;
  end if;

  -- 2) one-time link by email (existing user, including anyone imported from
  --    a CSV, who has a record but has never signed in)
  if p_email is not null and btrim(p_email) <> '' then
    select * into p
    from app.person
    where lower(email) = lower(p_email)
      and cognito_sub is null
    limit 1
    for update;

    if found then
      update app.person
      set cognito_sub = p_cognito_sub
      where id = p.id
      returning * into p;
      return p;
    end if;
  else
    raise exception 'email is required for cognito onboarding';
  end if;

  -- 3) no record for this person, so they are not on the approved list
  return null;
end;
$$ language plpgsql security definer;

comment on function app.upsert_person_from_cognito(text, text, text) is
  'Resolves a Cognito login to an app.person. Links an existing record on first sign-in. Returns null when no record exists, because only people imported from the approved list may use the app.';

commit;
