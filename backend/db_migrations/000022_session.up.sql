BEGIN;

CREATE TABLE IF NOT EXISTS app.session (
	id BIGSERIAL PRIMARY KEY,
	auth_channel TEXT NOT NULL CHECK (auth_channel IN ('Password', 'Google', 'Facebook')),
	timestamp TIMESTAMP NOT NULL DEFAULT now(),
	person_id BIGINT NOT NULL REFERENCES app.person(id) ON DELETE CASCADE,
	social_login_id BIGINT REFERENCES app.social_login(id) ON DELETE CASCADE
);

-- index to speed up lookups by person
CREATE INDEX IF NOT EXISTS idx_session_person_id ON app.session(person_id);

CREATE TRIGGER tg_session_set_updated_at BEFORE UPDATE 
ON app.session
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER tg_session_set_created_at BEFORE INSERT 
ON app.session
FOR EACH ROW EXECUTE FUNCTION app.set_created_at();

GRANT SELECT, INSERT, UPDATE, DELETE on table app.session to app_user, app_meal_designer, app_admin;

GRANT USAGE, SELECT ON SEQUENCE app.session_id_seq TO app_user, app_meal_designer, app_admin;

COMMIT;