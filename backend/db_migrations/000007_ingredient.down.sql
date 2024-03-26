begin;
  drop function app.product_meals(app.product);
  drop table app.ingredient cascade;
commit;
