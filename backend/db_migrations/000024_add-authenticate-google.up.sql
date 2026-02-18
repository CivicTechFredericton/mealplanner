
-- Authenticate Google login by email.
-- If the email exists in the person table, issue a JWT with role and person_id;
-- otherwise return null.

create or replace function app.authenticate_google(user_email text)
returns app.jwt_token as $$
declare
  person app.person;
begin
  -- look up person by email
  select * into person
  from app.person p
  where p.email = user_email;

  if person is null then
    return null; -- email not found in DB
  end if;

  -- issue jwt_token: (role, person_id, exp)
  return (
    person.role::text,
    person.id,
    extract(epoch from (now() + interval '7 days'))
  )::app.jwt_token;
end;
$$ language plpgsql security definer;
comment on function app.authenticate_google(text) is 'Authenticate Google login by email. If email exists in the person table, issue a JWT with claims for Person and role; otherwise return null.';
grant execute on function app.authenticate_google(text) to app_anonymous, app_user;
