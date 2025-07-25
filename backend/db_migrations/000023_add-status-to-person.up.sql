-- Create the enum type: app.status_type
DO $$ BEGIN
	CREATE TYPE app.status_type AS ENUM ('app_pending', 'app_active', 'app_inactive');
EXCEPTION
	WHEN duplicate_object THEN NULL;
END $$;

-- Add the new column using the enum
ALTER TABLE app.person ADD COLUMN status app.status_type NOT NULL DEFAULT 'app_pending';

ALTER TYPE app.current_user ADD ATTRIBUTE status TEXT;

-- Add status to the function: app.current_person()
CREATE OR REPLACE FUNCTION app.current_person() RETURNS app.current_user AS $$
	SELECT
		app.person.id,
		app.person.role::text,
		app.person.email,
		app.person.full_name,
		app.person.slug,
		app.person.terms_and_conditions,
		app.person.status::text
	FROM app.person
	WHERE id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint
$$ LANGUAGE sql STABLE SECURITY DEFINER;
