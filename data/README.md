# data

Here I have described the steps I have done in the data folder.

Created a bun package using
```
bun init -y
```

Created import recipes JSON files based on recipe-assistant (another sub-project using AI)
Imported meal table from recipes

How I did it:
Created a meals-ingredients-substitutes.json from the database extracting to a json using the function described in export_recipes.sql
Then ran this in the command prompt to copy the output of this function to a json. The tricky part is to use a lot of options to ensure the json was not invalid.
```tsx
psql -X -A -t -c "select * from export_recipes()" > data/meals-ingredients-substitutes.json
```

importRecipes script can loop through this json file and inserts into the database when it is new.
Created a substitute as an array inside ingredients and created ingredients as an array inside a meal. That way when a meal is created, the foreign id can be assigned to each of the ingredient while creating the record. Then that ingredient id will be used as subsititute_ingredient_id while creating the substitute ingredients.

Created the products-all-items.json from the scraper api (part of recipe-assistant). 

importProducts script can loop through the json file products-all-items.json and inserts it into the database when it is new.

### populating sample data

Create a new .env file inside the mealplanner/data directory and add the DB_URL as following:
```DB_URL=postgres://postgres:databasepassword@127.0.0.1:5433/postgres
```

Then, run the following commands inside the data directory

*To do in a fresh db:*
`bun importRecipes.ts` to import the meals and ingredients
and
`bun importProducts.ts` to import the products.

