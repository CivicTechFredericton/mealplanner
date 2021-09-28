BEGIN;

  -- admins and meal designers can see all users, others can see only themselves 
  drop policy if exists select_person on app.person;
  drop policy if exists select_person_user on app.person;
  drop policy if exists select_person_meal_designer on app.person;

  create policy select_person_user
    on app.person
    for select
    to app_user using (id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint);

  create policy select_person_meal_designer
    on app.person
    for select
    to app_meal_designer using (true);

COMMIT;
