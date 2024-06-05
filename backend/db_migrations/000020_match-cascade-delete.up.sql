begin;
alter table app.ingredient
drop constraint ingredient_substitute_ingredient_id_fkey,
add constraint ingredient_substitute_ingredient_id_fkey
   foreign key (substitute_ingredient_id)
   references app.ingredient(id)
   on delete set null, --to avoid a further error of trying to delete a primary ingredient that doesn't exist, we must set the substitute to null
drop constraint ingredient_meal_id_fkey,
add constraint ingredient_meal_id_fkey
   foreign key (meal_id)
   references app.meal(id) 
   on delete cascade;

alter table app.match
drop constraint match_ingredient_id_fkey,
add constraint match_ingredient_id_fkey
    foreign key (ingredient_id)
    references app.ingredient(id)
    on delete cascade;
commit;