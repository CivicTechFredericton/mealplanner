begin;
-- drop uuid for meal_plan
-- drop trigger first (depends on the function)
DROP TRIGGER IF EXISTS tg_meal_plan_set_app_user_person_uuid ON app.meal_plan;

-- drop the function
DROP FUNCTION IF EXISTS app.set_meal_plan_new_person_uuid();

-- drop the RLS policy
DROP POLICY IF EXISTS all_meal_plan_user_uuid ON app.meal_plan;

-- drop the column
ALTER TABLE app.meal_plan DROP COLUMN IF EXISTS person_uuid;

-- drop uuid for favorite_meals
-- drop the functions
DROP FUNCTION IF EXISTS app.remove_favorite_meal_uuid(bigint);
DROP FUNCTION IF EXISTS app.add_favorite_meal_uuid(bigint);

-- drop the RLS policy
DROP POLICY IF EXISTS user_favorite_meals_uuid ON app.favorite_meals;

-- drop the column
ALTER TABLE app.favorite_meals DROP COLUMN IF EXISTS person_uuid;
commit;
