begin;
  do language plpgsql $$
  declare
    admn app.person;
    user1 app.person;
    user2 app.person;
    meal1 app.meal;
    product1 app.product;
  begin
    admn := app.register_person('Vagmi Mudumbai', 'vagmi@tarkalabs.com', 'password');
    user1 := app.register_person('User One', 'user1@example.com', 'password');
    user2 := app.register_person('User Two', 'user2@example.com', 'password');

    INSERT INTO app.product (name_en, name_fr, code, price, quantity, unit, upc, walmart_link, tags)
    VALUES ('HIMALAYAN PINK SALT', 'sel rose de l''Himalaya', 'hs', '2.97', 200,'g', '62891583057', 
    'https://www.walmart.ca/en/ip/great-value-pink-himalayan-rock-salt-grinder-refill/6000199880834',
    '{"indian cuisine", "condiments", "vegan", "vegetarian"}');

    INSERT INTO app.product (name_en, name_fr, code, price, quantity, unit, upc, walmart_link, tags)
    VALUES ('COCONUT chunks', 'morceaux de noix de coco', 'cc_v', '3.47', 200, 'g', '80914514137', 
    'https://www.walmart.ca/en/ip/coconut-chunks-200g/6000198054613',
    '{"indian cuisine", "vegetable","vegan", "vegetarian", "frozen", "farm fresh"}') returning * into product1;

    INSERT INTO app.product (name_en, name_fr, code, price, quantity, unit, upc, walmart_link, tags)
    VALUES ('Coriander leaves', 'feuilles de coriandre', 'cl_v', '1.47', '1', 'bunch', '4889', 'https://www.walmart.ca/en/ip/cilantro/981707',
    '{"indian cuisine", "vegetable","vegan", "vegetarian", "farm fresh"}');

    INSERT INTO app.product (name_en, name_fr, code, price, quantity, unit, upc, walmart_link, tags)
    VALUES ('Red Chilli', 'rouge piment', 'rc_v', '1.27', 100, 'g', '82815810318', 'https://www.walmart.ca/en/ip/red-chilli-whole/6000188763096',
    '{"indian cuisine", "vegetable","vegan", "vegetarian", "grocery"}');

    INSERT INTO app.product(name_en, name_fr, code, price, quantity, unit, upc, walmart_link, tags)
    VALUES ('Roasted gram', '', 'rg_p', '1.97', '350', 'g', '82815820042', 'https://www.walmart.ca/en/ip/pti-roasted-chana-with-skin/6000188764683',
    '{"indian cuisine", "pulse", "vegetarian", "vegan", "grocery"}');

    INSERT INTO app.meal (code, name_en, name_fr, tags, description_en, description_fr, categories, photo_url, video_url, 
    method, cooking_duration, total_cost, serving_cost, tips, servings_size, servings_size_unit, serves) 
    VALUES ('cc_side', 'coriander coconut chutney', 'chutney de coriandre à la noix de coco', 
    '{"side dish", "vegetarian", "vegan", "indian cuisine"}', 
    'It can be used  to eat along with idli, dosa, vada, bonda or bajji', 'Il peut être utilisé pour manger avec idli, dosa vada, bonda ou bajji', 
    '{"Breakfast", "snacks", "dinner"}', 'http://photo_url', 'http://video_url', 
    '1. Clean the bunch of coriander leaves thoroughly.
    2. grind 1 cup of coconut chunks to powder in a mixie
    3. Then add 3/4th cup of roasted gram,  3 red chilli, 1 inch ginger and grind it
    4. Then add coriander leaves, salt to taste and 1/2 cup of water and grind it to a paste.
    5. Serve it is a thottukai for idli, dosa, vada, bonda or bajji',
    10, '11.15', '2', 
    'Defreeze the coconut chunks before 30 minutes to obtain soft texture.
    You can grind the coconut chunks to a poweder and store it in an airtight container.',
    2, 'tbsp', 1) returning * into meal1;

    INSERT INTO app.ingredient(unit, quantity, product_id, meal_id)
    VALUES ('tbsp', 2, product1.id, meal1.id);

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
    2.5, 0, 1.6, 8.2, meal1.id,'meal');
    
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
     0, 0, 0, 3, product1.id, 'product');
  end;
  $$;
commit;
