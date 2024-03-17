# data

Init'ed with

```
bun init -y
```

Created import recipes JSON files based on recipe-assistant (another sub-project using AI)
Imported meal table from recipes
How I did it:
Created a meals-ingredients-substitutes.json from the database extracting to a json using the function described in export_recipes.sql
Then ran this in the command prompt to copy the output of this function to a json. The tricky part is to use a lot of options to ensure the json was not invalid.
```tsx
psql -X -A -t -c "select * from export_recipes()" > data/dump2.json
```

Created a substitute as an array inside ingredients and created ingredients as an array inside a meal. That way when a meal is created, the foreign id can be assigned to each of the ingredient while creating the record. Then that ingredient id will be used as subsititute_ingredient_id while creating the substitute ingredients.

Created the products-all-items.json from the scraper api (part of recipe-assistant). 

Need to import the products.
