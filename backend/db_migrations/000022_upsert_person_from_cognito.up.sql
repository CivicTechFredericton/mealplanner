begin;

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

  -- 2) one-time link by email (existing user)
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

  -- 3) create new user
  insert into app.person (full_name, email, cognito_sub)
  values (
    coalesce(nullif(btrim(p_full_name), ''), split_part(lower(p_email), '@', 1)),
    lower(p_email),
    p_cognito_sub
  )
  returning * into p;

  return p;
end;
$$ language plpgsql security definer;

commit;
