BEGIN;

CREATE TABLE IF NOT EXISTS app.social_login (
	id BIGSERIAL PRIMARY KEY,
	provider TEXT NOT NULL CHECK (provider IN ('Google', 'Facebook')),
	provider_user_id TEXT NOT NULL,
	access_token TEXT NOT NULL,
	refresh_token TEXT NOT NULL,
	id_token TEXT NOT NULL,
	token_response JSONB NOT NULL DEFAULT '{}',
	created_at TIMESTAMP DEFAULT now() NOT NULL,
	updated_at TIMESTAMP DEFAULT now() NOT NULL,
	person_id BIGINT NOT NULL REFERENCES app.person (id) ON DELETE CASCADE,

	-- Enforce uniqueness: One provider per person
	CONSTRAINT unique_provider_per_person UNIQUE (person_id, provider),

	-- Prevent duplicate provider_user_id across provider
	CONSTRAINT unique_provider_user_id UNIQUE (provider, provider_user_id)
);

CREATE TRIGGER tg_social_login_set_updated_at BEFORE UPDATE 
ON app.social_login
FOR EACH ROW EXECUTE FUNCTION app.set_updated_at();

CREATE TRIGGER tg_social_login_set_created_at BEFORE INSERT 
ON app.social_login
FOR EACH ROW EXECUTE FUNCTION app.set_created_at();

GRANT SELECT, INSERT, UPDATE, DELETE on table app.social_login to app_user, app_meal_designer, app_admin;

GRANT USAGE, SELECT ON SEQUENCE app.social_login_id_seq TO app_user, app_meal_designer, app_admin;

COMMIT;
