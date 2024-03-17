import fs from "node:fs/promises";
import pgp from "pg-promise";

const recipesPath = "meals-ingredients.json";

type RecipeContentType = {
  nameEn: string;
  nameFr: string;
  tags: string[];
  descriptionEn: string;
  descriptionFr: string;
  categories: string[];
  photoUrl: string;
  videoUrl: string;
  method: string;
  totalCost: number;
  servingCost: number;
  tips: string;
  servingsSize: number;
  servingsSizeUnit: string;
  nutritionRating: number;
  prepTime: number;
  cookTime: number;
  portions: number;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
    productKeyword: string;
    substitutes:
      | {
          name: string;
          quantity: string;
          unit: string;
          productKeyword: string;
          substituteReason: string;
        }[]
      | null;
  }[];
}[];

const pgpMain = pgp();
const db = pgpMain(process.env.DB_URL!);

const importRecipes = async (fileName: string) => {
  const data = await fs.readFile(fileName);
  const recipes: RecipeContentType = JSON.parse(data.toString());
  // used marked and parsed the method earlier in recipe-assistant.
  // Since this json is from the database it is already parsed.
  // When there are no portions, prepTime, cookTime, set them to 0 was done using recipe-assistant
  for (const recipe of recipes) {
    // insert into meal table
    const mealRec = await db.one(
      `INSERT INTO app.meal(
      tags,
      name_en,
      method,
      portions,
      prep_time,
      cook_time,
      tips) 
      VALUES(
          $1, $2, $3, $4, $5, $6, $7
      ) RETURNING *
      `,
      [
        recipe.tags,
        recipe.nameEn,
        recipe.method,
        recipe.portions,
        recipe.prepTime,
        recipe.cookTime,
        recipe.tips,
      ]
    );

    for (const ingredient of recipe.ingredients) {
      // As part of recipe-assistant, called the method from identifyProductKeywods to get ingredients and its keywords
      // and populate the ingredients table
      // const ing = await getProductKeywords(ingredient.nameEn);
      // Used firstRecId as null and updated when the first record is inserted intio the ingredients table
      // and used that value for the substitute_ingredient_id
      // if ingredient has or, there will be more than one productkeyword and ingredient name and is taken care in the recipe-assistant
      // If quantity is not a number (Number.isNaN(NaN) is true while NaN === NaN is false), then set the quantity to 0.
      // if ingredient.unit is undefined or set to 0 then unit is assumed as "some". This is for salt and pepper.

      // This is inserting only the primary ingredient.
      const ingRec = await db.one(
        `INSERT INTO app.ingredient(
            name,
            quantity,
            unit,
            product_keyword,
            meal_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
          `,
        [
          ingredient.name,
          ingredient.quantity,
          ingredient.unit,
          ingredient.productKeyword,
          mealRec.id,
        ]
      );

      // This is inserting the substitute ingredients.
      if (!ingredient.substitutes) {
        continue;
      }

      for (const substitute of ingredient.substitutes) {
        const substituteIngRec = await db.one(
          `INSERT INTO app.ingredient(
              name,
              quantity,
              unit,
              product_keyword,
              meal_id,
              substitute_ingredient_id,
              substitute_reason)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *
            `,
          [
            substitute.name,
            substitute.quantity,
            substitute.unit,
            substitute.productKeyword,
            mealRec.id,
            ingRec.id,
            substitute.substituteReason,
          ]
        );
      }
    }
    // )
    // )
  }
};

await importRecipes(recipesPath);
