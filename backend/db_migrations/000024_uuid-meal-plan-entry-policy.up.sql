begin;

-- Add meal_plan_entry RLS policy for Cognito (UUID-based) users.
-- The existing all_meal_plan_entry_user policy uses jwt.claims.person_id (integer),
-- but Cognito users only have jwt.claims.person_uuid, so they were silently blocked
-- from inserting/reading entries. This mirrors all_meal_plan_user_uuid on meal_plan.
create policy all_meal_plan_entry_user_uuid
  on app.meal_plan_entry
  for all
  to app_user using(meal_plan_id in (
    select id from app.meal_plan
    where person_uuid = nullif(current_setting('jwt.claims.person_uuid', true), '')
  ));

commit;
