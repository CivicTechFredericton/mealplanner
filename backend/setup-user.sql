begin;
  do language plpgsql $$
    declare
      app_graphile_exists boolean;
    begin
      select true into app_graphile_exists from pg_roles where rolname='app_graphile';

      if app_graphile_exists is null then
        create role app_graphile login password '$PGPASSWORD';
        grant connect on database $DBNAME to app_graphile;

        create role app_anonymous;
        grant app_anonymous to app_graphile;

        create role app_user;
        grant app_user to app_graphile;

        create role app_admin;
        grant app_admin to app_graphile;
      end if;
    end;
  $$;
commit;
