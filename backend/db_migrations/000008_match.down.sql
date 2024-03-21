begin;
  drop function app.update_matches(bigint, bigint[]);
  drop function app.ingredient_matched_products(app.ingredient);
  drop function app.product_matched_ingredients(app.product);
  drop function app.product_keyword_ingredients(app.product);
  drop function app.ingredient_keyword_products(app.ingredient);
  drop table app.match cascade;
commit;
