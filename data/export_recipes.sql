-- To use this 
-- select * from export_recipes() inside psql 
-- or from the shell
-- psql -X -A -t -c "select * from export_meals()" > data/dump2.json
create or replace function export_recipes() returns setof json as $$
    begin
        return query
        select json_agg(json_build_object(
            'name_en', m.name_en,
            'name_fr', m.name_fr,
            'tags', m.tags,
            'description_en', m.description_en,
            'description_fr', m.description_fr,
            'categories', m.categories,
            'photo_url', m.photo_url,
            'video_url', m.video_url,
            'method', m.method,
            'total_cost', m.total_cost,
            'serving_cost', m.serving_cost,
            'tips', m.tips,
            'servings_size', m.servings_size,
            'servings_size_unit', m.servings_size_unit,
            'nutrition_rating', m.nutrition_rating,
            'prep_time', m.prep_time,
            'cook_time', m.cook_time,
            'portions', m.portions,
            'ingredients', mi.ingredients
        ))
        from app.meal m
        left join lateral (
            select json_agg(json_build_object(
            'name', i.name,
            'quantity', i.quantity,
            'unit', i.unit,
            'product_keyword', i.product_keyword,
            'substitutes', si.substitutes
            )) as ingredients
            from app.ingredient i
            left join lateral (
                select json_agg(json_build_object(
                'name', si.name,
                'quantity', si.quantity,
                'unit', si.unit,
                'product_keyword', si.product_keyword,
                'substitute_reason', si.substitute_reason
                )) as substitutes
                from app.ingredient si
                where si.substitute_ingredient_id = i.id
            ) si on true
            where i.meal_id = m.id and substitute_ingredient_id is null
        ) mi on true;
    end;
    $$ language plpgsql;