begin;
  create type app.role_type as  enum ('app_user', 'app_meal_designer', 'app_admin');

  create table if not exists app.person (
    id bigserial primary key,
    full_name text not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
  );
  comment on table app.person is 'Person represents a user that can log in and work with the application based on their role.';
  comment on column app.person.full_name is 'Person''s full name';
  comment on column app.person.id is 'database id (PK) for the Person';
  -- todo: fix grants so that timestamps aren't updatable

  create trigger tg_person_set_updated_at before update
  on app.person 
  for each row execute procedure app.set_updated_at();
  
  create trigger tg_person_set_created_at before insert
  on app.person 
  for each row execute procedure app.set_created_at();
  
  create table if not exists app_private.account (
    person_id bigint primary key references app.person(id) on delete cascade,
    role app.role_type not null default 'app_user',
    email text not null unique,
    password_hash text not null,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
  );

  create or replace function app_private.make_first_user_admin() returns trigger as $$
  declare
    acct_count int;
  begin
    select count(1) into acct_count from app_private.account;
    if acct_count = 0 THEN
      new.role = 'app_admin';
    end if;
    return new;
  end;
  $$ language plpgsql security definer;
  
  create trigger tg_account_make_admin before insert 
  on app_private.account
  for each row execute procedure app_private.make_first_user_admin();

  comment on table app_private.account is 'Table to store person private details';

  create trigger tg_account_set_updated_at
  before update on app_private.account 
  for each row execute procedure app.set_updated_at();

  create trigger tg_account_set_created_at before insert
  on app_private.account 
  for each row execute procedure app.set_created_at();

  create extension if not exists pgcrypto;

  create or replace function app.register_person(
    full_name text,
    email text,
    password text
  ) returns app.person as $$
  declare
    p app.person;
  begin
    insert into app.person (full_name) values (full_name) returning * into p;
    insert into 
      app_private.account(person_id, email, password_hash) 
      values (p.id, email, crypt(password, gen_salt('bf')));
    return p;
  end;
  $$ language plpgsql security definer;
  comment on function app.register_person(text,text,text) is 'Creates a Person plus private account details (username, password). People with account details may log in. By default the first registered Person will have role admin, others will start with lowest privilege. see authorize* to elevate privilege.';

  create type app.jwt_token as (
    role text,
    person_id bigint,
    exp bigint
  );

  create or replace function app.authenticate(
    user_email text, 
    password text) returns app.jwt_token as $$
    declare 
      acct app_private.account;
    begin
      select * into acct from app_private.account a where a.email = user_email;
      if acct.password_hash = crypt(password, acct.password_hash) THEN
        return (acct.role::text, acct.person_id, extract(epoch from (now() + interval '7 days')))::app.jwt_token;
      end if;
      return null;
    end;
  $$ language plpgsql security definer;
  comment on function app.authenticate(text,text) is 'Login method for People. Username and password are authenticated against the account table. On success a JWT is created with claims for Person and role.';

  create type app.current_user as (id bigint, role text, email text, full_name text);

  create or replace function app.current_person() returns app.current_user as $$
    select app.person.id, app_private.account.role::text, app_private.account.email, app.person.full_name
    from app.person
    join app_private.account on app.person.id = app_private.account.person_id
    where id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint
  $$ language sql stable security definer;
  comment on function app.current_person() is 'Account details for the currently logged in Person';

  create or replace function app.current_user_person(cu app.current_user) returns app.person as $$
    select * from app.person where id=cu.id
  $$ language sql stable;
  comment on function app.current_user_person(app.current_user) is 'Person details for current_user.';

  grant usage on schema app to app_anonymous, app_meal_designer, app_user, app_admin;

  grant select, insert on table app.person to app_anonymous, app_user, app_meal_designer, app_admin;
  grant update, delete on table app.person to app_user, app_meal_designer, app_admin;
  grant usage, select on sequence app.person_id_seq to app_anonymous, app_user, app_meal_designer, app_admin;

  grant execute on function app.authenticate(text, text) to app_anonymous;
  grant execute on function app.current_person() to app_anonymous, app_user, app_meal_designer, app_admin;
  grant execute on function app.current_user_person(app.current_user) to app_user, app_meal_designer, app_admin;
  grant execute on function app.register_person(text, text, text) to app_admin;
  -- 2020/02/01 removed app_anonymous from registration

  alter table app.person enable row level security;

  -- admins and meal designers can see all users, others can see only themselves 
  create policy select_person_user 
    on app.person 
    for select 
    to app_user using (id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

  create policy select_person_meal_designer 
    on app.person 
    for select 
    to app_meal_designer using (true);

  create policy all_person_admin
    on app.person 
    for all
    to app_admin using (true);

  -- users and meal designers can only update themselves
  create policy update_person_user
    on app.person 
    for update
    to app_user 
    using (id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

  create policy update_person_meal_designer
    on app.person 
    for update
    to app_meal_designer
    using (id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

commit;
