begin;
drop function if exists app.upsert_person_from_cognito(text, text, text);
commit;
