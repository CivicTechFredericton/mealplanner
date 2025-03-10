
DROP FUNCTION IF EXISTS app.person_details(TEXT); 

BEGIN;
DROP POLICY IF EXISTS select_person_email_anonymous ON app.person; 
REVOKE EXECUTE ON FUNCTION app.email_exists(TEXT) FROM app_anonymous; 
DROP FUNCTION IF EXISTS app.email_exists(TEXT);
COMMIT;