-- Create the favorite_meal_plan table if it doesn't exist
CREATE TABLE IF NOT EXISTS app.favorite_meal_plan (
    id SERIAL PRIMARY KEY,
    meal_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function to add a meal plan to favorites
CREATE OR REPLACE FUNCTION app.favorite_meal_plan(meal_id TEXT, user_id TEXT) RETURNS app.meal_plan AS $$
BEGIN
    -- Check if the meal plan is already favorited by the user
    IF EXISTS (SELECT 1 FROM app.favorite_meal_plan WHERE meal_id = meal_id AND user_id = user_id) THEN
        -- If the meal plan is already favorited, you may choose to handle this case according to your requirements
        -- For example, you might throw an exception or do nothing
        -- RAISE EXCEPTION 'Meal plan is already favorited by the user';
        RETURN;
    ELSE
        -- If the meal plan is not favorited by the user, insert a new entry
        INSERT INTO app.favorite_meal_plan (meal_id, user_id) VALUES (meal_id, user_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION app.favorite_meal_plan(TEXT, TEXT) IS 'Add a meal plan to favorites for a user';

-- Grant execute permission to appropriate roles
GRANT EXECUTE,SELECT ON FUNCTION app.favorite_meal_plan(TEXT, TEXT) TO app_anonymous, app_user, app_meal_designer, app_admin;

COMMIT;
