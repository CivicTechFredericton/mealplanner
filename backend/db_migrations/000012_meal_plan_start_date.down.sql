begin;
ALTER TABLE app.meal_plan DROP COLUMN if exists start_date; 
commit;