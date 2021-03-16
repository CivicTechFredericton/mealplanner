create or replace function app.authorize_admin(p_id bigint) returns app.person as $$
declare  
p app.person;
begin
    update app_private.account set role='app_admin' where app_private.account.person_id = p_id;
    select * into p from app.person where app.person.id = p_id;
    return p;
end;
$$ language plpgsql security definer;

comment on function app.authorize_admin(bigint) is 'Elevate Person with p_id to the Admin role';

GRANT execute on function app.authorize_admin(bigint) to app_admin;
