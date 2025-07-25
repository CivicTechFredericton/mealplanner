BEGIN;
ALTER TABLE app.person DROP COLUMN IF EXISTS status;
ALTER TYPE app.current_user DROP ATTRIBUTE IF EXISTS status;
DROP TYPE IF EXISTS app.status_type;
DROP FUNCTION IF EXISTS app.current_person();
COMMIT;