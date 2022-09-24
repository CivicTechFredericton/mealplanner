ALTER TABLE app.measure
DROP CONSTRAINT measure_meal_id_fkey,
ADD CONSTRAINT measure_meal_id_fkey
   FOREIGN KEY (meal_id)
   REFERENCES app.meal(id)
   ON DELETE CASCADE;