BEGIN;
CREATE TABLE IF NOT EXISTS app.favorite_meals (
    id BIGSERIAL PRIMARY KEY,
    meal_id BIGINT NOT NULL,
    user_id BIGINT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create triggers to set created_at and updated_at timestamps
CREATE TRIGGER tg_favorite_meals_set_updated_at BEFORE UPDATE
ON app.favorite_meals 
FOR EACH ROW EXECUTE PROCEDURE app.set_updated_at();

CREATE TRIGGER tg_favorite_meals_set_created_at BEFORE INSERT
ON app.favorite_meals 
FOR EACH ROW EXECUTE PROCEDURE app.set_created_at();

-- Function to add a meal plan to favorites
CREATE OR REPLACE FUNCTION app.create_favorite_meal(meal_id_param BIGINT) RETURNS VOID AS $$
BEGIN
    -- Fetch the person_id from the current session
    INSERT INTO app.favorite_meals (meal_id, person_id)
    SELECT meal_id_param, NULLIF(current_setting('jwt.claims.person_id', true), '')::BIGINT;
END;
$$ LANGUAGE plpgsql;


-- Function to delete a meal plan from favorites
CREATE OR REPLACE FUNCTION app.delete_favorite_meal(meal_id_param BIGINT) RETURNS VOID AS $$
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

COMMIT;