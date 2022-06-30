begin;
  do language plpgsql $$
  declare
    admn app.person;
    user1 app.person;
    user2 app.person;
    meal_designer app.person;
    person_pass text;

  begin

    create or replace function app_private.product_id_by_upc(c text) returns bigint as $f$
      select id from app.product where upc = c limit 1;
    $f$ language sql stable;

    create or replace function app_private.meal_id_by_code(c text) returns bigint as $f$
      select id from app.meal where code = c limit 1;
    $f$ language sql stable;

    INSERT INTO 
      app.meal (code,      name_en,                     name_fr,                                  tags, 
	        description_en, 
		description_fr, 
		categories,                         photo_url,          video_url, 
                method, 
		cooking_duration, total_cost, serving_cost, 
		tips, 
		servings_size, servings_size_unit, serves) 
        VALUES ('cc_side', 'coriander coconut chutney', 'chutney de coriandre à la noix de coco', '{"side dish", "vegetarian", "vegan", "indian cuisine"}', 
                'It can be used  to eat along with idli, dosa, vada, bonda or bajji', 
		'Il peut être utilisé pour manger avec idli, dosa vada, bonda ou bajji', 
                '{"Breakfast", "Snack", "Dinner"}', null, null, 
                '1. Clean the bunch of coriander leaves thoroughly.
2. grind 1 cup of coconut chunks to powder in a mixie
3. Then add 3/4th cup of roasted gram,  3 red chilli, 1 inch ginger and grind it
4. Then add coriander leaves, salt to taste and 1/2 cup of water and grind it to a paste.
5. Serve it is a thottukai for idli, dosa, vada, bonda or bajji',
                10,               '11.15',    '2', 
                'Defreeze the coconut chunks before 30 minutes to obtain soft texture. You can grind the coconut chunks to a poweder and store it in an airtight container.',
                2,             'tbsp',             1),

               ('cs_side', 'Cucumber Dill Salad',       '', '{"side dish", "vegetarian", "vegan", "salad"}', 
                '', 
		'', 
                '{"Lunch", "Dinner"}', null, null, 
                '1. Wash and dry the cucumber. The skin can be left on or partially removed. If using field cucumbers, peel and remove seeds prior to slicing.
2. Slice the cucumbers as thinly as possible (almost see through). Set aside
3. Place the vinegar, sugar, salt and pepper in a mixing bowl and whisk until the sugar has dissolved completely
4. Add the cucumber, onion and dill. Mix together well
5. Refrigerate, turning occasionally, for at least 1 hour',
                30,               0,          0, 
                'Defreeze the coconut chunks before 30 minutes to obtain soft texture. You can grind the coconut chunks to a poweder and store it in an airtight container.',
                0,             '??',             8),

               ('bb_brkf', 'Breakfast Burrito',         '', '{"breakfast", "lunch", "school"}', 
                '', 
		'', 
                '{"Lunch", "Breakfast"}', null, null, 
                '1. Heat a frying pan or skillet over medium heat. Add the diced bacon and fry until just beginning to crisp. Add the peppers, onion and jalapeno if using and fry, stirring occasionally, until the bacon is cooked and the vegetables are softened. Remove bacon and vegetables from the pan and set aside. Pour off the fat from the pan and discard. Wipe out the pan with a paper towel.

2. In a bowl, whisk the egg, milk salt and pepper together. Add 1 Tbsp. / 15 ml of oil to the pan and heat over medium to low heat. Add the egg mixture and stirring, cook the eggs until just set.

3. While the eggs are cooking, lay out the tortilla shells on a flat surface. Divide the egg mixture between the 6 shells. Sprinkle each with 1 Tbsp. / 15 ml of grated cheese. Roll shells tightly, folding in the edges. Serve immediately with salsa on the side.',
                35,               0,          0, 
                'If for school lunch, wrap in parchment paper and refrigerate for reheating in a microwave. Or, if for a later daily meal, wrap in foil and reheat in a 325-f oven for 8 – 10 minutes.',
                0,             '??',             6),

               ('mc_main', 'Macaroni and Cheese',       '', '{"dinner", "pasta", "stovetop"}', 
                '', 
		'', 
                '{"Lunch", "Dinner"}', null, null, 
                'Preheat oven to 325 f 

1. Bring 3 litres of water, with 1 Tsp. (5 ml) of salt to the boil. Add the macaroni noodles and cook following package directions. Stir occasionally during cooking. Drain and rinse well under cold water. Place in a colander and set aside.

2. For the sauce - In a large saucepan over medium heat, melt the butter. Add the flour and mix well. Lower heat and cook for about 5 minutes. Stir frequently.

3. Heat the milk in a separate pan until warm and slowly add to the butter/flour mixture (the roux) over low heat, stirring frequently, cook until sauce thickens slightly, about 10-15 minutes.  

4. Turn the heat to very low, cover the saucepan and let sit for about 20 minutes, stirring occasionally, to cook out the taste of the flour. Add the grated cheese, salt and pepper. Stir until the cheese has melted. 

5. Add the noodles to the sauce and mix well. Place in a greased 8” x 8” deep baking dish. If the sauce appears too thick, add some warmed milk until desired consistency is reached. Remember, sauce will thicken during cooking as the pasta will absorb the sauce. 

6. Sprinkle the breadcrumbs over the macaroni and dot with butter or margarine. For a spicier topping sprinkle with the chili powder. Bake uncovered in pre-heated oven for about 30-35 minutes or until the sauce has bubbled around the edges and the top is nicely browned. Allow to sit for a few minutes before serving.',
                60,               0,          0, 
                '',
                0,             '??',             6);

    INSERT INTO 
      app.product (name_en,                      name_fr,                    code,    price,  quantity, unit,    upc,           
	           source_link, 
		   tags)
           VALUES ('HIMALAYAN PINK SALT',        'sel rose de l''Himalaya',  'hs',    '2.97', 200,      'g',     '62891583057', 
		   'https://www.walmart.ca/en/ip/great-value-pink-himalayan-rock-salt-grinder-refill/6000199880834', 
		   '{"indian cuisine", "condiments", "vegan", "vegetarian"}'),
		   
		  ('ALLENS APPLE CIDER VINEGAR', '',                         'cv_a',  '6.27', 4,        'L',     '6401312029',
		   'https://www.walmart.ca/en/ip/allens-apple-cider-vinegar/6000201177268',
		   '{"paleo", "vegan", "vegetarian"}'),

		  ('Dill Weed Herb',             '',                         'dw_g',  '1.97', 35,       'g',     '68113186247',
		   'https://www.walmart.ca/en/ip/great-value-dill-weed-herb/6000153707058',
		   '{"vegan", "vegetarian"}'),

		  ('Onion, Yellow',              '',                         'yo_f',  '2.47', 3,        'lb',    '3338360002',
		   'https://www.walmart.ca/en/ip/onion-yellow-your-fresh-market/6000197111437',
		   '{"paleo", "vegan", "vegetarian", "whole30"}'),

		  ('Granulated White Sugar',     '',                         'gs_r',  '2.47', 2,        'kg',    '6284721023',
		   'https://www.walmart.ca/en/ip/redpath-granulated-white-sugar/6000023803963',
		   '{"kosher", "vegan", "vegetarian"}'),

		  ('Iodized Table Salt',         '',                         'ts_g',  '0.87', 1,        'kg',    '68113186260',
		   'https://www.walmart.ca/en/ip/great-value-iodized-table-salt/6000023805321',
		   '{"kosher", "vegan", "vegetarian"}'),

		  ('Ground Black Pepper',        '',                         'gp_g',  '0.87', 250,      'g',     '60538888115',
		   'https://www.walmart.ca/en/ip/great-value-ground-black-pepper/6000149160681',
		   '{"vegan", "vegetarian"}'),

		  ('Cuccumber',                  '',                         'cu_v',  '1.67', 1,        'single','4593',
		   'https://www.walmart.ca/en/ip/cucumber-seedless/6000188920591',
		   '{"vegetable","vegetarian","fresh produce"}'),

                  ('COCONUT chunks',             'morceaux de noix de coco', 'cc_v',  '3.47', 200,      'g',     '80914514137', 
                   'https://www.walmart.ca/en/ip/coconut-chunks-200g/6000198054613',
		   '{"indian cuisine", "vegetable","vegan", "vegetarian", "frozen", "farm fresh"}'),

                  ('Coriander leaves',           'feuilles de coriandre',    'cl_v',  '1.47', 1,        'bunch', '4889', 
		   'https://www.walmart.ca/en/ip/cilantro/981707',
		   '{"indian cuisine", "vegetable","vegan", "vegetarian", "farm fresh"}'),

                  ('Red Chilli',                 'rouge piment',             'rc_v',  '1.27', 100,      'g',     '82815810318', 
		   'https://www.walmart.ca/en/ip/red-chilli-whole/6000188763096',
		   '{"indian cuisine", "vegetable","vegan", "vegetarian", "grocery"}'),

                  ('Naturally Smoked Bacon',     '',                         'sb_g',  '3.77', 375,      'g',     '62891500241', 
		   'https://www.walmart.ca/en/ip/great-value-naturally-smoked-bacon/6000191272204',
		   '{"grocery","pork"}'),

                  ('Green Bell Pepper',          '',                         'gp_f',  '1.03', 1,        'single','4065', 
		   'https://www.walmart.ca/en/ip/pepper-green-bell/6000191286438',
		   '{"produce","vegetable","vegan"}'),

                  ('Green Bell Pepper',          '',                         'gp_f',  '1.03', 1,        'single','4065', 
		   'https://www.walmart.ca/en/ip/pepper-green-bell/6000191286438',
		   '{"produce","vegetable","vegan"}'),

                  ('Pickled Sliced Jalapeños',   '',                         'pj_c',  '3.27', 250,      'mL',    '4600085234', 
		   'https://www.walmart.ca/en/ip/old-el-paso-pickled-sliced-jalapeos/6000188866193',
		   '{"produce","vegetable","vegan"}'),

                  ('Vegetable Oil',              '',                         'vo_g',  '2.67', 946,      'mL',    '60538888027', 
		   'https://www.walmart.ca/en/ip/great-value-vegetable-oil/6000128603850',
		   '{"whole30","vegetable","vegan"}'),

                  ('Large Eggs',                 '',                         'le_g',  '3.00',  12,      'single','68113191195', 
		   'https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943',
		   '{"paleo","vegetarian","whole30"}'),

                  ('Milk',                       '',                         'mi_g',  '3.88',   2,      'L',     '6590022201', 
		   'https://www.walmart.ca/en/ip/baxter-2-partly-skimmed-milk/6000075689064',
		   '{"vegetarian"}'),

                  ('Shredded Cheddar Cheese',    '',                         'sc_g',  '5.67', 320,      'g',     '62891578727', 
		   'https://www.walmart.ca/en/ip/great-value-shredded-double-cheddar-cheese/6000198861824',
		   '{"vegetarian"}'),

                  ('10” Tortillas',              '',                         'ts_d',  '4.07', 610,      'g',     '6872103811', 
		   'https://www.walmart.ca/en/ip/dempsters-original-10-tortillas/1062614',
		   '{"grocery","vegetarian"}'),

                  ('Dry Macaroni',               '',                         'dm_v',  '0.97', 900,      'g',     '60538888129', 
		   'https://www.walmart.ca/en/ip/great-value-dry-macaroni/6000001842787',
		   '{"grocery","pasta"}'),

                  ('Salted Butter',              '',                         'sb_v',  '4.97', 454,      'g',     '62891582939', 
		   'https://www.walmart.ca/en/ip/great-value-salted-butter/6000200237827',
		   '{"grocery","dairy","vegetarian"}'),

                  ('All-Purpose Flour',          '',                         'af_v',  '3.67', 2.5,      'kg',    '62891536574', 
		   'https://www.walmart.ca/en/ip/great-value-original-all-purpose-flour/6000196138270',
		   '{"grocery"}'),

                  ('Plain Bread Crumbs',         '',                         'bc_4',  '1.97', 425,      'g',     '4138761210', 
		   'https://www.walmart.ca/en/ip/4c-plain-bread-crumbs/6000191284471',
		   '{"grocery"}'),

                  ('Roasted gram',               '',                         'rg_p',  '1.97', 350,      'g',     '82815820042', 
		   'https://www.walmart.ca/en/ip/pti-roasted-chana-with-skin/6000188764683',
		   '{"indian cuisine", "pulse", "vegetarian", "vegan", "grocery"}');

    INSERT INTO 
      app.measure(   unit,    quantity, product_id,                                   meal_id)
          VALUES ( 'tbsp',      2,      app_private.product_id_by_upc('80914514137'), app_private.meal_id_by_code('cc_side')),
                 ('bunch',    0.5,      app_private.product_id_by_upc('4889'),        app_private.meal_id_by_code('cc_side')),
                 (    'g',      1,      app_private.product_id_by_upc('82815810318'), app_private.meal_id_by_code('cc_side')),
                 ( 'tbsp',      2,      app_private.product_id_by_upc('82815820042'), app_private.meal_id_by_code('cc_side')),

                 ( 'tbsp',      2,      app_private.product_id_by_upc('62891500241'), app_private.meal_id_by_code('bb_brkf')),
                 (  'cup',    0.5,      app_private.product_id_by_upc('4065'),        app_private.meal_id_by_code('bb_brkf')),
                 (  'cup',    0.5,      app_private.product_id_by_upc('3338360002'),  app_private.meal_id_by_code('bb_brkf')),
                 ( 'each',    0.5,      app_private.product_id_by_upc('4600085234'),  app_private.meal_id_by_code('bb_brkf')),
                 ( 'tbsp',      1,      app_private.product_id_by_upc('60538888027'), app_private.meal_id_by_code('bb_brkf')),
                 ( 'each',      6,      app_private.product_id_by_upc('68113191195'), app_private.meal_id_by_code('bb_brkf')),
                 ( 'tbsp',      3,      app_private.product_id_by_upc('6590022201'),  app_private.meal_id_by_code('bb_brkf')),
                 (  'tsp',      1,      app_private.product_id_by_upc('68113186260'), app_private.meal_id_by_code('bb_brkf')),
                 ('pinch',  0.125,      app_private.product_id_by_upc('60538888115'), app_private.meal_id_by_code('bb_brkf')),
                 ( 'tbsp',      6,      app_private.product_id_by_upc('62891578727'), app_private.meal_id_by_code('bb_brkf')),
                 ( 'each',      6,      app_private.product_id_by_upc('6872103811'),  app_private.meal_id_by_code('bb_brkf')),

                 ( 'each',      1,      app_private.product_id_by_upc('4593'),        app_private.meal_id_by_code('cs_side')),
                 ( 'tbsp',      3,      app_private.product_id_by_upc('6401312029'),  app_private.meal_id_by_code('cs_side')),
                 ( 'tbsp',    1.5,      app_private.product_id_by_upc('6284721023'),  app_private.meal_id_by_code('cs_side')),
                 (  'tsp',   0.25,      app_private.product_id_by_upc('68113186260'), app_private.meal_id_by_code('cs_side')),
                 (  'tsp',   0.25,      app_private.product_id_by_upc('60538888115'), app_private.meal_id_by_code('cs_side')),
                 ( 'each',      1,      app_private.product_id_by_upc('3338360002'),  app_private.meal_id_by_code('cs_side')),
                 ( 'tbsp',      1,      app_private.product_id_by_upc('68113186247'), app_private.meal_id_by_code('cs_side')),

                 (   'lb',    0.5,      app_private.product_id_by_upc('60538888129'), app_private.meal_id_by_code('mc_main')),
                 (  'cup',   0.25,      app_private.product_id_by_upc('62891582939'), app_private.meal_id_by_code('mc_main')),
                 (  'cup',   0.33,      app_private.product_id_by_upc('62891536574'), app_private.meal_id_by_code('mc_main')),
                 (  'cup',    3.5,      app_private.product_id_by_upc('6590022201'),  app_private.meal_id_by_code('mc_main')),
                 (   'oz',     10,      app_private.product_id_by_upc('62891578727'), app_private.meal_id_by_code('mc_main')),
                 (  'tsp',    0.5,      app_private.product_id_by_upc('68113186260'), app_private.meal_id_by_code('mc_main')),
                 ('pinch',      1,      app_private.product_id_by_upc('60538888115'), app_private.meal_id_by_code('mc_main')),
                 ( 'tbsp',      4,      app_private.product_id_by_upc('4138761210'),  app_private.meal_id_by_code('mc_main'));

    INSERT INTO app.nutrition(
    serving_size, serving_size_unit, serving_size_text, calories, total_fat, total_fat_unit,
    saturated_fat, saturated_fat_unit, trans_fat, trans_fat_unit,
    cholesterol, cholesterol_unit, sodium, sodium_unit, potassium, carbohydrate, carbohydrate_unit, 
    dietary_fiber, dietary_fiber_unit, total_sugar, total_sugar_unit, protein, protein_unit,
    vit_a, vit_c, calcium, iron, nutritionable_id, nutritionable_type)
    VALUES(4, 1, 'tbsp', 148, 6.4, 'g',
    4.7, 'g', 0, 'g', 
    0, 'mg', 196.1, 'mg', 0, 16.4, 'g', 
    4.8, 'g', 2.7, 'g', 6.2, 'g', 
    2.5, 0, 1.6, 8.2, app_private.meal_id_by_code('cc_side'),'meal');
    
    INSERT INTO app.nutrition(
    serving_size, serving_size_unit, serving_size_text, calories, total_fat, total_fat_unit,
    saturated_fat, saturated_fat_unit, trans_fat, trans_fat_unit,
    cholesterol, cholesterol_unit, sodium, sodium_unit, potassium, carbohydrate, carbohydrate_unit, 
    dietary_fiber, dietary_fiber_unit, total_sugar, total_sugar_unit, protein, protein_unit,
    vit_a, vit_c, calcium, iron,  nutritionable_id, nutritionable_type)
    VALUES(
     2, 1, 'tbsp', 55, 5, 'g', 
     4.5,'g', 0, 'g', 
     0, 'mg', 2.5, 'mg', 0, 2.5, 'g', 
     1.5, 'g', 1, 'g', 0.5, 'g', 
     0, 0, 0, 3, app_private.product_id_by_upc('80914514137'), 'product');
  

    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    admn := app.register_person('Admin', 'admin@example.com', person_pass);
    raise notice '   Admin login: admin@example.com        %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    meal_designer := app.register_person('Meal Designer', 'mealdesigner@example.com', person_pass);
    perform app.authorize_meal_designer(meal_designer.id);
    raise notice 'Designer login: mealdesigner@example.com %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    user1 := app.register_person('User One', 'user1@example.com', person_pass);
    raise notice '   User1 login: user1@example.com        %', person_pass;
    select substring(encode(digest(random()::TEXT,'sha256'),'hex') from 0 for 16) into person_pass;
    user2 := app.register_person('User Two', 'user2@example.com', person_pass);
    raise notice '   User2 login: user2@example.com        %', person_pass;

    INSERT INTO 
      app.meal_plan ( person_id, name_en,                description_en,                                                               tags) 
             VALUES ( user1.id,  'Vegetarian Meal Plan', 'This meal plan will cater to egg-free vegetarian meals with diary products', '{"vegetarian","egg-free"}');

  end;
  $$;

commit;
