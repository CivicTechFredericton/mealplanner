/**
 * @generated SignedSource<<78d29ec4a81454feb42e42c49bb764ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
export type MealQuery$variables = {
  mealId: any;
};
export type MealQuery$data = {
  readonly meal: {
    readonly rowId: any;
    readonly code: any | null;
    readonly nameEn: string;
    readonly nameFr: string | null;
    readonly tags: ReadonlyArray<string | null> | null;
    readonly descriptionEn: string | null;
    readonly descriptionFr: string | null;
    readonly categories: ReadonlyArray<CategoryT | null> | null;
    readonly photoUrl: string | null;
    readonly videoUrl: string | null;
    readonly method: string | null;
    readonly totalCost: any | null;
    readonly servingCost: any | null;
    readonly tips: string | null;
    readonly servingsSize: any | null;
    readonly servingsSizeUnit: string | null;
    readonly prepTime: any | null;
    readonly cookTime: any | null;
    readonly portions: any | null;
    readonly nutritionRating: number | null;
    readonly nutrition: {
      readonly id: string;
    } | null;
  } | null;
};
export type MealQuery = {
  variables: MealQuery$variables;
  response: MealQuery$data;
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
  "name": "id",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "Nutrition",
  "kind": "LinkedField",
  "name": "nutrition",
  "plural": false,
  "selections": [
    (v22/*: any*/)
  ],
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
          (v23/*: any*/)
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
          (v23/*: any*/),
          (v22/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3d9fc0e35ce6a7a7e60d38e8d39a8310",
    "id": null,
    "metadata": {},
    "name": "MealQuery",
    "operationKind": "query",
    "text": "query MealQuery(\n  $mealId: BigInt!\n) {\n  meal(rowId: $mealId) {\n    rowId\n    code\n    nameEn\n    nameFr\n    tags\n    descriptionEn\n    descriptionFr\n    categories\n    photoUrl\n    videoUrl\n    method\n    totalCost\n    servingCost\n    tips\n    servingsSize\n    servingsSizeUnit\n    prepTime\n    cookTime\n    portions\n    nutritionRating\n    nutrition {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c7f547edb0feb149d3e0f574c4c37db6";

export default node;
