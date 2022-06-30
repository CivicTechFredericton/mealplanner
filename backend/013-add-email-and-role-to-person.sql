BEGIN;

alter table app.person
    add column email text,
    add column role app.role_type default 'app_user';

update app.person
    SET email = app_private.account.email,
        role = app_private.account.role
    FROM app_private.account
    WHERE app_private.account.person_id = app.person.id;

alter table app.person
    alter column email set not null,
    alter column role set not null;

alter table app_private.account
    DROP column email,
    DROP column role;

-- set email 
create or replace function app.register_person(
    full_name text,
    email text,
    password text
) returns app.person as $$
    declare p app.person;
begin
    insert into app.person (full_name, email)
    values (full_name, email)
    returning * into p;
    insert into app_private.account(person_id, password_hash)
    values (p.id, crypt(password, gen_salt('bf')));
    return p;
end;
$$ language plpgsql security definer;

--replacing the function to include app.person.role (from person table) in the jwt_token
create or replace function app.authenticate(user_email text, password text) returns app.jwt_token as $$
    declare acct app_private.account;
    person app.person;
begin
    select * into person
        from app.person p
        where p.email = user_email;
    select * into acct
        from app_private.account a
        where a.person_id = person.id;
    -- The salt is stored along with the password_hash. The crypt function
    -- will read the bytes corresponding to the salt from the password_hash column
    if acct.password_hash = crypt(password, acct.password_hash) THEN return (
        person.role::text,
        acct.person_id,
        extract(epoch from (now() + interval '7 days'))
    )::app.jwt_token;
    end if;
    return null;
end;
$$ language plpgsql security definer;

drop trigger tg_account_make_admin on app_private.account;
drop function app_private.make_first_user_admin();

create or replace function app.make_first_user_admin() returns trigger as $$
    declare person_count int;
begin
    select count(1) into person_count
    from app.person;
    if person_count = 0 then 
        new.role = 'app_admin';
    end if;
    return new;
end;
$$ language plpgsql security definer;
create trigger tg_person_make_admin 
before insert on app.person 
for each row execute procedure app.make_first_user_admin();

create or replace function app.authorize_admin(p_id bigint) returns app.person as $$ 
declare
p app.person;
begin
    update app.person set role='app_admin' where app.person.id = p_id
    returning * into p;
    return p;
end;
$$ language plpgsql security definer;


create or replace function app.authorize_meal_designer(p_id bigint) returns app.person as $$
declare
p app.person;
begin
    update app.person set role='app_meal_designer' where app.person.id = p_id
    returning * into p;
    return p;
end;
$$ language plpgsql security definer;

create or replace function app.current_person() returns app.current_user as $$
    select app.person.id, app.person.role::text, app.person.email, app.person.full_name
    from app.person
    where id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint
  $$ language sql stable security definer;

COMMIT;