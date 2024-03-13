begin;
create or replace function app.all_meal_tags() returns SETOF text as $$
  select distinct unnest(tags) as tag from app.meal;
$$ language sql stable;

COMMENT ON FUNCTION app.all_meal_tags() IS 'Unique tags from all meals';

grant execute on function app.all_meal_tags() to app_anonymous, app_user, app_meal_designer, app_admin;
end;
commit;