begin;

grant execute on function app.add_favorite_meal_uuid(bigint) to app_user, app_meal_designer, app_admin;
grant execute on function app.remove_favorite_meal_uuid(bigint) to app_user, app_meal_designer, app_admin;

commit;
