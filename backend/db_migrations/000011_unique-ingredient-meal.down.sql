begin;
alter table app.ingredient drop constraint ingredient_code_key;
alter table app.ingredient add constraint ingredient_code_key unique (code);
commit;