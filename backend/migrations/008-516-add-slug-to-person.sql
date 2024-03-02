-- Need to have a route user-slug/favorites for mealplans and meals
-- to list user favorites
BEGIN;
ALTER TABLE app.person 
    ADD COLUMN slug TEXT NOT NULL DEFAULT nanoid(10);

CREATE UNIQUE INDEX idx_person_slug
    ON app.person (slug);
COMMIT;

alter type app.current_user add attribute slug text;

--  Current person is updated with slug
create or replace function app.current_person() returns app.current_user as $$
    select app.person.id, app.person.role::text, app.person.email, 
           app.person.full_name, app.person.slug
    from app.person
    where id = nullif(current_setting('jwt.claims.person_id', true), '')::bigint
  $$ language sql stable security definer;