/**
 * @generated SignedSource<<609a4259058fae6a427d9c4a86131736>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK" | "%future added value";
export type MealQuery$variables = {
  mealId: any;
};
export type MealQuery$data = {
  readonly meal: {
    readonly categories: ReadonlyArray<CategoryT | null | undefined> | null | undefined;
    readonly code: any | null | undefined;
    readonly cookTime: any | null | undefined;
    readonly descriptionEn: string | null | undefined;
    readonly descriptionFr: string | null | undefined;
    readonly ingredients: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly name: string;
          readonly quantity: any;
          readonly rowId: any;
          readonly substituteIngredient: {
            readonly rowId: any;
          } | null | undefined;
          readonly substituteIngredientId: any | null | undefined;
          readonly substituteReason: ReadonlyArray<string | null | undefined> | null | undefined;
          readonly unit: string;
        };
      }>;
    };
    readonly method: string | null | undefined;
    readonly nameEn: string;
    readonly nameFr: string | null | undefined;
    readonly nutrition: {
      readonly calcium: any | null | undefined;
      readonly calories: any | null | undefined;
      readonly carbohydrate: any | null | undefined;
      readonly carbohydratePercent: any | null | undefined;
      readonly carbohydrateUnit: string | null | undefined;
      readonly cholesterol: any | null | undefined;
      readonly cholesterolPercent: any | null | undefined;
      readonly cholesterolUnit: string | null | undefined;
      readonly dietaryFiber: any | null | undefined;
      readonly dietaryFiberPercent: any | null | undefined;
      readonly dietaryFiberUnit: string | null | undefined;
      readonly iron: any | null | undefined;
      readonly potassium: any | null | undefined;
      readonly protein: any | null | undefined;
      readonly proteinPercent: any | null | undefined;
      readonly proteinUnit: string | null | undefined;
      readonly saturatedFat: any | null | undefined;
      readonly saturatedFatPercent: any | null | undefined;
      readonly saturatedFatUnit: string | null | undefined;
      readonly servingSize: any | null | undefined;
      readonly servingSizeText: string | null | undefined;
      readonly servingSizeUnit: string | null | undefined;
      readonly servingsPerContainer: any | null | undefined;
      readonly sodium: any | null | undefined;
      readonly sodiumPercent: any | null | undefined;
      readonly sodiumUnit: string | null | undefined;
      readonly totalFat: any | null | undefined;
      readonly totalFatPercent: any | null | undefined;
      readonly totalFatUnit: string | null | undefined;
      readonly totalSugar: any | null | undefined;
      readonly totalSugarPercent: any | null | undefined;
      readonly totalSugarUnit: string | null | undefined;
      readonly transFat: any | null | undefined;
      readonly transFatPercent: any | null | undefined;
      readonly transFatUnit: string | null | undefined;
      readonly vitA: any | null | undefined;
      readonly vitB12: any | null | undefined;
      readonly vitB6: any | null | undefined;
      readonly vitC: any | null | undefined;
      readonly vitD: any | null | undefined;
      readonly vitE: any | null | undefined;
      readonly vitK: any | null | undefined;
    } | null | undefined;
    readonly nutritionRating: number | null | undefined;
    readonly photoUrl: string | null | undefined;
    readonly portions: any | null | undefined;
    readonly prepTime: any | null | undefined;
    readonly rowId: any;
    readonly servingCost: any | null | undefined;
    readonly servingsSize: any | null | undefined;
    readonly servingsSizeUnit: string | null | undefined;
    readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly tips: string | null | undefined;
    readonly totalCost: any | null | undefined;
    readonly videoUrl: string | null | undefined;
  } | null | undefined;
};
export type MealQuery = {
  response: MealQuery$data;
  variables: MealQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mealId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rowId",
    "variableName": "mealId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionFr",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categories",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoUrl",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "method",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCost",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingCost",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tips",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingsSize",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingsSizeUnit",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prepTime",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cookTime",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "portions",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nutritionRating",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "calcium",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "calories",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "carbohydrate",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "carbohydratePercent",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "carbohydrateUnit",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cholesterol",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cholesterolPercent",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cholesterolUnit",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dietaryFiber",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dietaryFiberPercent",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dietaryFiberUnit",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iron",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "potassium",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "protein",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "proteinPercent",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "proteinUnit",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saturatedFat",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saturatedFatPercent",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saturatedFatUnit",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingSize",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingSizeText",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingSizeUnit",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "servingsPerContainer",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sodium",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sodiumPercent",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sodiumUnit",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalFatPercent",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalFat",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalFatUnit",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalSugar",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalSugarPercent",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalSugarUnit",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transFat",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transFatPercent",
  "storageKey": null
},
v56 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "transFatUnit",
  "storageKey": null
},
v57 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitA",
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitB12",
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitB6",
  "storageKey": null
},
v60 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitC",
  "storageKey": null
},
v61 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitD",
  "storageKey": null
},
v62 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitE",
  "storageKey": null
},
v63 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vitK",
  "storageKey": null
},
v64 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v65 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "quantity",
  "storageKey": null
},
v66 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unit",
  "storageKey": null
},
v67 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "substituteReason",
  "storageKey": null
},
v68 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "substituteIngredientId",
  "storageKey": null
},
v69 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MealQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Meal",
        "kind": "LinkedField",
        "name": "meal",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Nutrition",
            "kind": "LinkedField",
            "name": "nutrition",
            "plural": false,
            "selections": [
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v36/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/),
              (v42/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v49/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v62/*: any*/),
              (v63/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IngredientsConnection",
            "kind": "LinkedField",
            "name": "ingredients",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "IngredientsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Ingredient",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v64/*: any*/),
                      (v2/*: any*/),
                      (v65/*: any*/),
                      (v66/*: any*/),
                      (v67/*: any*/),
                      (v68/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Ingredient",
                        "kind": "LinkedField",
                        "name": "substituteIngredient",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MealQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Meal",
        "kind": "LinkedField",
        "name": "meal",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Nutrition",
            "kind": "LinkedField",
            "name": "nutrition",
            "plural": false,
            "selections": [
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v36/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/),
              (v42/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v49/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v62/*: any*/),
              (v63/*: any*/),
              (v69/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IngredientsConnection",
            "kind": "LinkedField",
            "name": "ingredients",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "IngredientsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Ingredient",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v64/*: any*/),
                      (v2/*: any*/),
                      (v65/*: any*/),
                      (v66/*: any*/),
                      (v67/*: any*/),
                      (v68/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Ingredient",
                        "kind": "LinkedField",
                        "name": "substituteIngredient",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v69/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v69/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v69/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74b1de11c7d3e0759bff40b2121e12d4",
    "id": null,
    "metadata": {},
    "name": "MealQuery",
    "operationKind": "query",
    "text": "query MealQuery(\n  $mealId: BigInt!\n) {\n  meal(rowId: $mealId) {\n    rowId\n    code\n    nameEn\n    nameFr\n    tags\n    descriptionEn\n    descriptionFr\n    categories\n    photoUrl\n    videoUrl\n    method\n    totalCost\n    servingCost\n    tips\n    servingsSize\n    servingsSizeUnit\n    prepTime\n    cookTime\n    portions\n    nutritionRating\n    nutrition {\n      calcium\n      calories\n      carbohydrate\n      carbohydratePercent\n      carbohydrateUnit\n      cholesterol\n      cholesterolPercent\n      cholesterolUnit\n      dietaryFiber\n      dietaryFiberPercent\n      dietaryFiberUnit\n      iron\n      potassium\n      protein\n      proteinPercent\n      proteinUnit\n      saturatedFat\n      saturatedFatPercent\n      saturatedFatUnit\n      servingSize\n      servingSizeText\n      servingSizeUnit\n      servingsPerContainer\n      sodium\n      sodiumPercent\n      sodiumUnit\n      totalFatPercent\n      totalFat\n      totalFatUnit\n      totalSugar\n      totalSugarPercent\n      totalSugarUnit\n      transFat\n      transFatPercent\n      transFatUnit\n      vitA\n      vitB12\n      vitB6\n      vitC\n      vitD\n      vitE\n      vitK\n      id\n    }\n    ingredients {\n      edges {\n        node {\n          name\n          rowId\n          quantity\n          unit\n          substituteReason\n          substituteIngredientId\n          substituteIngredient {\n            rowId\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3d414be8b54ce77d104403951b87790e";

export default node;
