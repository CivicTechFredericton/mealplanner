alter table app.measure
drop constraint measure_meal_id_fkey,
add constraint measure_meal_id_fkey
   foreign key (meal_id)
   references app.meal(id)
   on delete cascade;