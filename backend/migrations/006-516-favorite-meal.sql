BEGIN;
CREATE TABLE IF NOT EXISTS app.favorite_meals (
    id BIGSERIAL PRIMARY KEY,
    meal_id BIGINT NOT NULL REFERENCES app.meal(id),
    person_id BIGINT REFERENCES app.person(id),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE (meal_id, person_id)
);

-- Create triggers to set created_at and updated_at timestamps
CREATE OR REPLACE TRIGGER tg_favorite_meals_set_updated_at BEFORE UPDATE
ON app.favorite_meals 
FOR EACH ROW EXECUTE PROCEDURE app.set_updated_at();

CREATE OR REPLACE TRIGGER tg_favorite_meals_set_created_at BEFORE INSERT
ON app.favorite_meals 
FOR EACH ROW EXECUTE PROCEDURE app.set_created_at();

-- Create row level security to enable only to view current user favorite meals
ALTER TABLE app.favorite_meals ENABLE ROW LEVEL SECURITY;
--An admin will be able to view/create/update favorite meals for any user
CREATE POLICY admin_favorite_meals ON app.favorite_meals for all to app_admin using(true);
--A meal designer will be able to view/create/update favorite meals for any user
CREATE POLICY meal_designer_favorite_meals ON app.favorite_meals for all to app_meal_designer using(true);
--A user will only be able to view/create/update only if he/she/they are the current logged in user
CREATE POLICY user_favorite_meals ON app.favorite_meals for all to app_user
USING (person_id = nullif(current_setting('jwt.claims.person_id', true), '')::BIGINT);

-- Function to add a meal plan to favorites
CREATE OR REPLACE FUNCTION app.add_favorite_meal(meal_id_param BIGINT) RETURNS VOID AS $$
BEGIN
    -- Fetch the person_id from the current session
    INSERT INTO app.favorite_meals (meal_id, person_id)
    SELECT meal_id_param, NULLIF(current_setting('jwt.claims.person_id', true), '')::BIGINT;
END;
$$ LANGUAGE plpgsql;


-- Function to delete a meal plan from favorites
CREATE OR REPLACE FUNCTION app.remove_favorite_meal(meal_id_param BIGINT) RETURNS VOID AS $$
DECLARE
    person_id_param BIGINT;
BEGIN
    -- Fetch the person_id from the current session
    person_id_param := NULLIF(current_setting('jwt.claims.person_id', true), '')::BIGINT;

    -- Delete from favorite_meals table based on meal_id and person_id
    DELETE FROM app.favorite_meals
    WHERE meal_id = meal_id_param AND person_id = person_id_param;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to appropriate roles
GRANT select, insert, delete, update on app.favorite_meals to app_user, app_meal_designer, app_admin;
GRANT usage on SEQUENCE app.favorite_meals_id_seq to app_user, app_meal_designer, app_admin;
GRANT execute on function app.add_favorite_meal(bigint) to app_user,app_admin,app_meal_designer;
GRANT execute on function app.remove_favorite_meal(bigint) to app_user,app_admin,app_meal_designer;

COMMIT;