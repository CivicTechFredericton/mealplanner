begin;

revoke execute on function app.add_favorite_meal_uuid(bigint) from app_user, app_meal_designer, app_admin;
revoke execute on function app.remove_favorite_meal_uuid(bigint) from app_user, app_meal_designer, app_admin;

commit;
