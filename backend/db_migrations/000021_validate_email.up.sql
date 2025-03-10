CREATE OR REPLACE FUNCTION app.email_exists(user_email TEXT) 
RETURNS BOOLEAN AS $$
DECLARE
    exists_flag BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM app.person WHERE email = user_email
    ) INTO exists_flag;
    RETURN exists_flag;
END;
$$ LANGUAGE plpgsql STABLE;
 
create or replace function app.person_details(user_email text) 
  returns app.jwt_token as $$
declare
  person app.person;
begin
  select * into person
    from app.person p
    where p.email = user_email;
  return (
    person.role::text,
    person.id,  
    extract(epoch from (now() + interval '7 days'))
  )::app.jwt_token;
end;
$$ language plpgsql;
grant execute on function app.email_exists(text) to app_anonymous;
grant execute on function app.person_details(text) to app_anonymous;
CREATE POLICY select_person_email_anonymous
    ON app.person 
    FOR SELECT 
    TO app_anonymous
    USING (email IS NOT NULL);
COMMIT;