with meals_arr as (
  select to_json(
    (
      json_build_object(
        '__identifiers'::text, json_build_array( ( (meals_rel."id")::numeric)::text),
        'nameEn'::text, (meals_rel."name_en"),
        'rowId'::text, ((meals_rel."id"))::text,
        '@products'::text,
        (
          with products_arr as (
            select to_json(
              (
                json_build_object(
                  '__identifiers'::text, json_build_array( ( (products_rel."id")::numeric)::text),
                  'rowId'::text, ((products_rel."id"))::text,
                  'nameEn'::text, (products_rel."name_en")
                )
              )
            ) as "@nodes"
            from "app"."meal_products"(meals_rel) as products_rel -- this is a function call
            where (TRUE) and (TRUE) -- totally superfluous
          ),
          products_arr_data as (
            select json_agg(
              to_json(products_arr)
            ) as data
            from products_arr
          )
          select json_build_object(
            'data'::text,
            coalesce(
              (
                select products_arr_data.data
                from products_arr_data
              ),
              '[]'::json
            )
          )
        )
      )
    )
  ) as "@nodes"
  from (
    select meals.*
    from "app"."meal" as meals
    where (TRUE) and (TRUE) -- why is this useful?
    order by meals."id" ASC
  ) meals_rel 
),
meals_arr_data as (
  select json_agg(
    to_json(meals_arr)
  ) as data
  from meals_arr
)
select coalesce(
  (
    select meals_arr_data.data
    from meals_arr_data
  ),
  '[]'::json
) as "data"