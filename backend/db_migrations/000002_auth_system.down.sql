begin;
  drop function if exists app.register_person(text, text, text);
  drop function if exists app.authenticate(text, text);
  drop function if exists app.authorize_admin(bigint);
  drop function if exists app.authorize_meal_designer(bigint);
  drop function if exists app.current_person();
  drop function if exists app.current_user_person(app.current_user);
  drop table app_private.account cascade;
  drop table app.person cascade;
  drop type app.current_user;
  drop type app.jwt_token;
commit;
