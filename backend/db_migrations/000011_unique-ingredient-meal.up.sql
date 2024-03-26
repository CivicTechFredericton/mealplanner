begin;
-- ingredient code was set as unique globally, but it should be unique per meal
alter table app.ingredient drop constraint ingredient_code_key;
alter table app.ingredient add constraint ingredient_code_key unique (code, meal_id);
commit;