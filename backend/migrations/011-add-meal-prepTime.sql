alter table app.meal 
    add column if not exists prep_time numeric,
    add column if not exists cook_time numeric,
    add column if not exists portions numeric,
    drop column if exists serves,
    drop column if exists cooking_duration;