BEGIN;
create table if not exists app.meal (
    id bigserial primary key,
    code text not null,
    name_en TEXT not NULL,
    name_fr TEXT,
    tags text[],
    description_en text,
    description_fr text,
    categories text[],
    photo_url text,
    video_url text,
    method text,
    cooking_duration numeric,
    total_cost numeric,
    serving_cost numeric,
    tips text,
    servings_size numeric,
    servings_size_unit text,
    serves numeric,
	nutrition_rating integer default 10,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal is 'Table to store meal details';

create trigger tg_meal_set_updated_at before update
on app.meal 
for each row execute procedure app.set_updated_at();

create or replace function app.meal_nutrition(m app.meal) returns app.nutrition as $$
  select * from app.nutrition n where n.nutritionable_id=m.id and n.nutritionable_type='meal' limit 1;
$$ language sql stable;

GRANT SELECT, INSERT, UPDATE, DELETE on TABLE app.meal 
to app_meal_designer, app_admin;

GRANT SELECT on table app.meal 
to app_anonymous, app_user, app_meal_designer, app_admin;

GRANT USAGE on SEQUENCE app.meal_id_seq 
to app_meal_designer, app_admin;

GRANT EXECUTE on FUNCTION app.meal_nutrition(app.meal) 
to app_anonymous, app_user, app_meal_designer, app_admin;

COMMIT;
