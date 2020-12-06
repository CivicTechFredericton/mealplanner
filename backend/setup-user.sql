begin;
  do language plpgsql $$
    declare
      role_exists boolean;
    begin
      select true into role_exists from pg_roles where rolname='app_graphile';

      if role_exists is null then
        create role app_graphile;
	execute format('grant app_graphile to %I',current_user);
        execute format('grant connect on database %I to app_graphile',current_database());
      end if;

      select true into role_exists from pg_roles where rolname='app_anonymous';
      if role_exists is null then
        create role app_anonymous;
        grant app_anonymous to app_graphile;
      end if;


      select true into role_exists from pg_roles where rolname='app_user';
      if role_exists is null then
        create role app_user;
        grant app_user to app_graphile;
      end if;

      select true into role_exists from pg_roles where rolname='app_meal_designer';
      if role_exists is null then
        create role app_meal_designer;
        grant app_meal_designer to app_graphile;
      end if;

      select true into role_exists from pg_roles where rolname='app_admin';
      if role_exists is null then
        create role app_admin;
        grant app_admin to app_graphile;
      end if;
    end;
  $$;
commit;
