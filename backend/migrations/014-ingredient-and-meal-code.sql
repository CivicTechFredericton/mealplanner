begin;
ALTER table app.meal add column if not exists code int;
ALTER table app.ingredient add column if not exists code int;
comment on column app.meal.code is 'Unique code for the meal such 1, 2, 3, etc to later show as M001 - need not be same as the db id';
comment on column app.ingredient.code is 'Unique code for the ingredient such 1, 2, 3, to later combine as M001-I01';
commit;