begin;
  drop function if exists app.add_favorite_meals(bigint);
  drop function if exists app.remove_favorite_meals(bigint);
  drop table app.favorite_meals cascade;
commit;
