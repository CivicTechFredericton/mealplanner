create or replace function app.reset_password(p_id bigint, passwd text) returns app.person as $$
declare
p app.person;

begin
  update app_private.account 
  set password_hash=crypt(passwd, gen_salt('bf')) 
  where person_id=p_id;
  select * into p FROM app.person WHERE id=p_id;
  return p;
end;
$$ language plpgsql security definer;

grant execute on function app.reset_password(bigint, text) to app_admin;