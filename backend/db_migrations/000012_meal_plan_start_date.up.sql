begin;

ALTER TABLE app.meal_plan ADD COLUMN start_date DATE;
comment on column app.meal_plan.start_date is 'A field to store the meal plan start date with the format YYYY-MM-DD';

commit;