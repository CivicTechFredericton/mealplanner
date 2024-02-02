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

    INSERT INTO app.meal
    (code,
     name_en,
     name_fr,
     tags,
     description_en,
     description_fr,
     categories,
     photo_url,
     video_url,
     method,
     cooking_duration,
     total_cost,
     serving_cost,
     tips,
     servings_size,
     servings_size_unit,
     serves)
        VALUES      ( 'cgp_main',
            'Cheese and Garlic Penne',
            null,
            '{"vegetarian", "pasta"}',
            'Very simple and delicious pasta recipe',
            null,
            '{"Lunch", "Dinner"}',
            'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/43/02/3/Z9lYSjJT86fzUAlIWJdH_0S9A6422.jpg',
            null,
            '1. Put garlic through garlic press, or finely chop.
            2. Lightly salt the water and bring to a boil in a large saucepan. Add the penne, stir and cook following package directions to “al dente” stage (pasta still has a bite). Drain and set aside.
            3. While the pasta is cooking, heat the oil in a frying pan or skillet over medium low heat. When hot, add the garlic and fry gently until the flavour is released. Be careful not to brown the garlic.
            4. Add the Italian seasoning, parsley and crushed red peppers and mix to combine. Place the pasta in the saucepan on low heat and pour the garlic and spice mixture over the pasta. Toss gently to coat pasta and heat through.
            5. Place hot pasta in a serving bowl, mix the two cheeses together and sprinkle over the pasta.',
            30,
            0,
            0,
            '1 lb. of dry pasta will yield approximately 2 ¼ to 2 ½ lbs. of cooked pasta',
            1,
            'cup',
            6 ),
          
          (
            'cm_main',
            'Chicken Baked in a Mushroom Sauce',
            null,
            '{"chicken"}',
            'Definite crowd pleaser',
            null,
            '{"Lunch", "Dinner"}',
            'https://www.lecremedelacrumb.com/wp-content/uploads/2021/04/chicken-mushroom-cream-sauce-3sm-3.jpg',
            null,
            '1.Preheat oven to 325f
            2. Peel and cut carrot into thin slices.
            3. Dice the onions.
            4. Place 2 Tbsp. / 30 ml of the oil in a heavy bottom saucepan or Dutch oven. Heat
              over medium heat. When hot, add the diced onions and sliced carrots. Lower
              heat to low, cover pan and cook together until vegetables are softened. Remove
              onions and carrots from the pan and set aside.
            5. Add the remaining 1 Tbsp. /15 ml of oil to the saucepan and heat over medium
              heat. While the oil is heating, remove the skin from the chicken and discard.
              Place the chicken in a bag, add the flour and the salt and pepper. Seal or hold
              the top of the bag and shake the bag well to coat the chicken.
            6. When the oil has heated add the chicken thighs and cook, browning both sides of
              the chicken for about 10 minutes per side.
            7. Pour the whisked mushroom soup and the water into an ovenproof baking dish
              and mix together. Add the chicken pieces and sprinkle the breadcrumbs over all.
            8. Bake in preheated oven until breadcrumbs are browned and the sauce is
              bubbling. Prior to serving, check that no pink is present in the chicken pieces.',
            75,
            0,
            0,
            'For fresh breadcrumbs, place pieces of day old or stale bread in a blender and blend until crumbs form.',
            2,
            'pieces of chicken and sauce',
            4
          ),
          (
            'c_main',
            'Chili',
            null,
            '{"beef"}',
            null,
            null,
            '{"Lunch", "Dinner"}',
            'https://hips.hearstapps.com/hmg-prod/images/best-ever-beef-chili-horizontal-1677260489.jpg?crop=0.670xw:1.00xh;0.162xw,0&resize=980:*',
            null,
            '1. Chop onion.
            2. Put garlic cloves through garlic press, or finely chop.
            3. Place the oil in a heavy bottomed saucepan over medium heat. Add the onions and cook until softened. Add the garlic and cook together for a few minutes.
            4. Add the ground beef and cook, while stirring until the beef is cooked through and no pink remains. Drain the fat and discard.
            5. Add the diced tomatoes, the tomato sauce, bay leaf, jalapeno, salt and chili powder. Stir to blend all ingredients.
            6. Over medium heat, simmer the chili for about 45 minutes until slightly thickened, stirring occasionally.
            7. Discard the bay leaf. Taste for seasoning. Adjust if necessary.',
            70,
            0,
            0,
            'Serve in a bowl sprinkled with a little grated cheese, or over plain boiled rice.',
            1,
            'cup',
            8
          ),
          (
            'cm_main',
            'Coffee Cake Muffins',
            null,
            '{"vegetarian"}',
            'Delicious coffee cake muffins, perfect for pairing with your morning brew or as a sweet treat anytime',
            null,
            '{"Snack", "Breakfast"}',
            'https://www.thediaryofarealhousewife.com/wp-content/uploads/2021/06/coffee-cake-muffin-12.jpg',
            null,
            'Preheat oven to 375 f
            1. For the topping, mix sugar, cinnamon and melted butter or margarine together. Set aside.
            2. In a bowl, beat butter or margarine. Add sugar and egg. Beat well until creamed.
            3. In another bowl, combine sifted flour, baking powder and salt. Add to creamed mixture, alternate with milk. Mix well. Fold in raisins.
            4. Line muffin tin with liners and spoon batter into liners. Sprinkle topping over muffins. 
            5. Bake at 375f for approximately 20 – 30 minutes. Check for “doneness” after about 20 minutes.',
            50,
            0,
            0,
            'To test for “doneness” a toothpick inserted into the muffin should come out clean.',
            1,
            'muffin',
            12
          ),
          (
            'gc_side',
            'Glazed Carrots',
            null,
            '{"vegetarian", "vegetable", "vegan", "Gluten-free"}',
            'Eat alone as a snack, or pair with any meal to add a dose of healthy vegetables',
            null,
            '{"Snack"}',
            'https://i2.wp.com/lmld.org/wp-content/uploads/2015/05/Brown-Sugar-Glazed-Carrots-2.jpg',
            null,
            '1. Peel and thinly slice the carrots.
            2. Bring the water to a boil in a saucepan. When boiling, add the carrots and cook for about 10 to 12 minutes until tender but still retaining some firmness.
            3. Drain the carrots, place back in the saucepan and add the butter and brown sugar. Over low heat, stir until the butter or margarine and the brown sugar has melted and coats the carrots.',
            25,
            0,
            0,
            null,
            0.5,
            'cup',
            4
          ),
          (
            'hv_side',
            'Honey Roasted Root Vegetables',
            null,
            '{"vegetarian", "vegetable", "Gluten-free"}',
            'Pair with any meal to add a dose of healthy vegetables',
            null,
            '{"Snack"}',
            'https://lostinfood.co.uk/wp-content/uploads/2022/01/Honey-Roast-Veg-4-1536x1017.jpeg',
            null,
            '1. Peel and cut carrots into 1/2 inch slices
            2. Peel and cut sweet potatoes into 1 inch chunks
            3. Peel and cut butternut or buttercup squash into 1 inch chunks
            4. Peel and cut beets into 1 inch chunks
            5. Peel and lightly crush garlic cloves, or prick with fork
            6. In a large bowl, whisk the oil with the thyme, vinegar, honey, salt and pepper.
            When thoroughly mixed, add the vegetables and garlic. Turn the vegetables to
            thoroughly coat with the oil and other ingredients.
            7. Spread in a single layer on a baking sheet and bake for approximately 45 – 50 minutes until lightly caramelized and cooked through.',
            70,
            0,
            0,
            'An excellent accompaniment to simple roasted beef, pork or chicken.',
            1,
            'serving',
            12
          ),
          (
            'bl_main',
            'Brown Lentils with Garlic and Onions',
            null,
            '{"vegetable", "vegetarian", "vegan", "Gluten-free"}',
            'Meaty, smokey taste. High in protein and fibre and, as a bonus, great tasting',
            null,
            '{"Lunch", "Dinner"}',
            'https://iheartvegetables.com/wp-content/uploads/2012/06/garlic-lentil-soup-2-of-4.jpg',
            null,
            '1. chop onions
            2. Put garlic cloves through a garlic press, or finely chop
            3. Wash and drain the brown lentils
            4. Heat the oil in a heavy bottomed saucepan over medium heat. When hot add the
            cumin. Stir and add the onions and cook together until the onions are softened.
            5. Add the garlic and continue cooking for a few minutes (be careful not to brown
            the garlic)
            6. Add the lentils and stir to coat with the oil.
            7. Add the water. Bring to a boil and lower heat. Add the salt and cayenne pepper
            and simmer for about 45 minutes to 1 hour until the lentils are softened but still
            retain some firmness.
            8. Taste for seasoning and adjust if necessary.',
            70,
            0,
            0,
            'Serve over plain boiled rice.',
            1,
            'cup',
            4
          ),
          (
            'of_side',
            'Onion Fritters',
            null,
            '{"vegetable", "vegetarian"}',
            'An excellent accompaniment to almost any meal. Or, serve as a snack with your favourite dip',
            null,
            '{"Lunch", "Dinner", "Snack"}',
            'https://itsnotcomplicatedrecipes.com/wp-content/uploads/2023/01/Onion-Fritters-Feature.jpg',
            null,
            '1. Grate, or very finely chop the onions
            2. Mix together all of the dry ingredients.
            3. Add the milk and egg and mix together.
            4. Add the onions and mix well together
            5. Heat the oil over medium heat in a frying pan or skillet. When hot, add ¼ cup
            measures (4 tbsp.) of the mixture into the pan. Fry until browned on both sides
            and the fritter is slightly soft in the centre.',
            35,
            0,
            0,
            null,
            1,
            'fritter',
            6
          ),
          (
            'pb_main',
            'Peanut Butter Cookies',
            null,
            '{"Peanuts"}',
            'Makes about 24 cookies',
            null,
            '{"Snack"}',
            'https://sallysbakingaddiction.com/wp-content/uploads/2022/04/soft-and-thick-peanut-butter-cookies-2.jpg',
            null,
            '1. Combine and mix flour, baking soda and salt in a bowl.
            2. In another bowl, cream shortening and both sugars until smooth and creamy.
            3. Beat in the egg and then the peanut butter and vanilla. Add the flour mixture
            gradually until a soft dough forms.
            4. Lightly grease a baking sheet and form into approximately 1” diameter balls.
            Place balls slightly apart on baking sheet. Press down slightly with a fork.
            5. Bake at 350f for approximately 12 minutes. Remove from oven and transfer
            carefully to a wire cooling rack.',
            20,
            0,
            0,
            null,
            1,
            'cookie',
            24

          ),
          (
            'rbr_main',
            'Red Beans and Rice',
            null,
            '{"vegetarian", "vegan"}',
            'Excellent accompaniment for chicken or pork dishes, or as a meal on its own',
            null,
            '{"Lunch", "Dinner"}',
            'https://blog.fatfreevegan.com/wp-content/uploads/2006/02/red-beans-rice-680w.jpg',
            null,
            '1. Finely dice the onions.
            2. Finely chop the garlic cloves.
            3. Rinse and drain the red kidney beans.
            4. Whisk the coconut milk until it is smooth.
            5. Place the oil in a heavy bottom saucepan. Heat over medium heat. When hot,
            add the diced onions, garlic and thyme. Mix together and cook stirring frequently
            for 3 – 4 minutes.
            6. Add the rice and beans. Stir. Add the water, coconut milk, salt and pepper and
            the chili pepper. Stir to combine ingredients and bring to a boil.
            7. Lower the heat to low, cover the saucepan and cook until almost all of the liquid
            has been absorbed. Remove from the heat and leave, with the lid on, for about
            10 – 15 minutes to finish cooking the rice.
            8. Remove the chili pepper. For a mildly spicy dish, finely chop ½ of the pepper and
            add back to the rice.',
            55,
            0,
            0,
            null,
            1,
            'cup',
            4
          ),
          (
            's_side',
            'Salsa',
            null,
            '{"vegetable", "vegetarian", "vegan", "Gluten-free"}',
            'Use to accompany tacos, burritos, quesadillas, sandwiches or subs.',
            null,
            '{"Snack"}',
            'https://www.cookingclassy.com/wp-content/uploads/2018/07/salsa-17.jpg',
            null,
            '1. Dice the tomatoes.
            2. Finely dice the onions.
            3. Push the garlic cloves through a garlic press, or crush and chop.
            4. Finely chop the jalapeno pepper.
            5. finely chop the fresh cilantro.
            6. In a bowl, mix all the ingredients together. Chill for at least 1 hour before serving. Store
in a glass container in the refrigerator.',
            25,
            0,
            0,
            null,
            1,
            'tbsp',
            15
          ),
          (
            'sj_main',
            'Sloppy Joes',
            null,
            '{"beef"}',
            'A great crowd pleaser',
            null,
            '{"Lunch", "Dinner"}',
            'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Sloppy-Joes-Sandwiches_EXPS_DIYD19_31740_B05_14_2b.jpg',
            null,
            '1. Place the ground beef and diced peppers in a saucepan and cook over medium heat until no pink remains and beef is cooked through. Drain fat and discard.
            2. Stir in the tomatoes, tomato sauce, tomato paste and the remaining ingredients.
            3. Bring to a boil. Lower heat and simmer for about 45 minutes until all flavours have blended. Remove bay leaf. Taste for seasoning. Adjust if necessary.
            4. Place bottom of toasted hamburger bun on a plate and top with 1 cup / 119 ml of
            sloppy joe. Top with remaining half of bun.',
            55, 
            0,
            0,
            'Freezes well for future use.',
            1,
            'cup',
            6
          ),

          (
            'm_side',
            'Marinara Sauce',
            null,
            '{"vegetable", "vegetarian", "vegan"}',
            'A very versatile sauce',
            null,
            '{"Lunch", "Dinner"}',
            'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/06/Marinara-Sauce-main.jpg',
            null,
            '
              1. Crush or finely chop the garlic cloves.
              2. Place the oil in a heavy bottom saucepan. Heat over medium heat. When hot, add the diced onions and cook, stirring frequently until softened.
              3. Add the garlic, lower the heat and cook with the onions for 2 – 3 minutes. Be careful not to brown the garlic.
              4. Add the remainder of the ingredients, stir together and over medium heat simmer for approximately 1 hour until sauce has thickened. Stir frequently while simmering.
              5. Taste for seasoning and adjust as necessary. Remove bay leaf and discard.',
            75,
            0,
            0,
            'Use the sauce to top pasta, as a filling for an omelette, or on a pizza as a base for your favourite pizza toppings.',
            1,
            'cup',
            4
          ),

          (
            'sfv_side',
            'Stir Fried Vegetables',
            null,
            '{"vegetable", "vegetarian"}',
            null,
            null,
            '{"Snack"}',
            'https://www.allrecipes.com/thmb/MF7yU1MBbRlaT40ogVr-1PgggKc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/222658-frozen-vegetable-stir-fry-4x3-1382-583b53fa0bcd4247920611ad431c14cb.jpg',
            null,
            '1. In a bowl, mix together the soya sauce, brown sugar and garlic powder.
              2. Add the oil to a skillet, heavy bottomed frying pan or wok and heat over medium hot heat.
              3. When the oil is hot add the frozen vegetables and, stirring constantly, fry until vegetables are softened and show a few light brown spots.
              4. Fold and mix in the soya sauce mixture. Serve immediately.',
            18,
            0,
            0,
            'Try adding 2 Tsp. / 10 ml of peanut butter to the soya sauce mixture.',
            0.5,
            'cup',
            6
          ),

          (
            'pro_side',
            'Pickled Red Onions',
            null,
            '{"vegetable", "vegetarian", "vegan"}',
            null,
            null,
            '{"Snack"}',
            'https://www.simplejoy.com/wp-content/uploads/2019/01/quick_pickled_red_onions.jpg',
            null,
            '1. Thinly slice the onions (it''s helpful to use a mandoline), and divide the onions between 2 (16-ounce) jars or 3 (10-ounce) jars. Place the garlic and peppercorns in each jar, if using.
              2. Heat the vinegar, water, sugar, and salt in a medium saucepan over medium heat. Stir until the sugar and salt dissolve, about 1 minute. Let cool and pour over the onions. Set aside to cool to room temperature, then store the onions in the fridge.
              3. Your pickled onions will be ready to eat once they''re bright pink and tender - about 1 hour for very thinly sliced onions, or overnight for thicker sliced onions.',
            15,
            0,
            0,
            'They will keep in the fridge for up to 2 weeks.',
            2,
            'tsp',
            5
          ),

          (
            'ssv_main',
            'Simple Spring Mix Salad Vinaigrette',
            null,
            '{"vegetable", "vegetarian", "Gluten-free"}',
            null,
            null,
            '{"Lunch", "Dinner"}',
            'https://i.pinimg.com/736x/50/38/0f/50380f6b79d65a4a7a7750b8160cd9b3.jpg',
            null,
            '1. In a small bowl, whisk together the mustard, minced garlic, vinegar 1 Tsp. / 5ml of salt and ½ Tsp. / 2.5ml of pepper. While whisking slowly add the oil until the dressing is well emulsified. (The Dijon mustard acts as an emulsifier, bringing together the vinegar and oil).
              2. Place the salad greens in a bowl and add enough dressing just to lightly coat.',
            10,
            0,
            0,
            '- Mixed Greens – green or red leaf lettuce, bibb lettuce, radicchio, endive, baby spinach.
              - If olive oil is unavailable, canola oil is a good substitute.
              - To add a little “crunch” to your salad, top with a few homemade croutons, crushed walnuts or hazelnuts, or a mix of both.',
            2,
            'tbsp',
            6
          ),

          (
            'ec_main',
            'Easy 6 Ingredient Chilli',
            null,
            '{"Beef"}',
            null,
            null,
            '{"Lunch", "Dinner"}',
            'https://vikalinka.com/wp-content/uploads/2020/09/Chili-Recipe-7-Edit.jpg',
            null,
            '1. In a large saucepan, cook ground beef over medium to high heat, breaking up lumps and, stirring frequently until browned. Remove the meat with a slotted spoon and set aside. Reserve 1 Tbsp. of the fat and discard the remainder.
            2. Add the diced onion to the saucepan and cook the onions until translucent and softened.
            3. Add the ground beef and all of the remaining ingredients. Stir to combine. Bring to a boil then reduce heat. Simmer for 10 to 15 minutes.
            4.Season with salt and pepper to taste and serve garnished with toppings of your choice.',
            25,
            0,
            0,
            '- If using ground turkey, you may need to brown the turkey in a Tablespoon of olive oil and, after removing the turkey from the saucepan add an additional Tablespoon of oil to cook the onions.
            - Toppings: sour cream, chopped green onions, crumbled taco chips, diced tomatoes, grated cheese. Try it served over crisp iceberg lettuce garnished with taco chips, or served on a toasted hamburger bun, or over plain white or brown rice.
            - You can also make this Chili in a slow cooker.  Brown the ground meat and drain off fat. Place the browned meat in the slow cooker with the remainder of the ingredients and cook on low for 6 – 8 hours or on high for 3 – 4 hours.
            - If not eating immediately, cool and place in sealed container and place in refrigerator for a maximum of 3 – 4 days.',
            1,
            'cup',
            6
          ),

          (
            'bb_main',
            'Banana Bread',
            null,
            '{"Vegetarian"}',
            null,
            null,
            '{"Breakfast", "Snack"}',
            'https://www.simplyrecipes.com/thmb/tR-5eHAZ3lgNR6Yvu3yxdHMNpk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Banana-Bread-LEAD-2-2-63dd39af009945d58f5bf4c2ae8d6070.jpg',
            null,
            '
            1. Preheat the oven to 325 f and grease a 9” x 5” loaf pan
            2. In a large bowl add the mashed ripe bananas, sugar, egg and melted butter or margarine.
            3. In a separate bowl mix together the flour, salt and baking soda. Stir this mixture into the banana mixture until just mixed together.
            4. Place the mixture in the prepared greased 9” x 5” loaf pan and bake in the 325-f preheated oven for about 50 minutes or until a toothpick inserted into the centre of the loaf comes out clean.
            5. Leave in the pan for 10 minutes, then turn out and place on a wire rack to cool.',
            75,
            0,
            0,
            null,
            2,
            'slices',
            4
          );
end;
  $$;

commit;