/**
 * @generated SignedSource<<0a80130f9602ba00ce83fc41418e0b6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
export type FavoriteMealsQuery$variables = {
  currentUserId?: any | null;
};
export type FavoriteMealsQuery$data = {
  readonly favoriteMeals: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly meal: {
        readonly rowId: any;
        readonly nameEn: string;
        readonly nameFr: string | null;
        readonly descriptionEn: string | null;
        readonly descriptionFr: string | null;
        readonly categories: ReadonlyArray<CategoryT | null> | null;
        readonly tags: ReadonlyArray<string | null> | null;
        readonly code: string;
        readonly photoUrl: string | null;
        readonly videoUrl: string | null;
      } | null;
    }>;
  } | null;
};
export type FavoriteMealsQuery = {
  variables: FavoriteMealsQuery$variables;
  response: FavoriteMealsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "currentUserId"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "equalTo",
            "variableName": "currentUserId"
          }
        ],
        "kind": "ObjectValue",
        "name": "personId"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      "CREATED_AT_DESC"
    ]
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
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
  "name": "descriptionEn",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionFr",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categories",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FavoriteMealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FavoriteMealsConnection",
        "kind": "LinkedField",
        "name": "favoriteMeals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FavoriteMeal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Meal",
                "kind": "LinkedField",
                "name": "meal",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/)
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
    "name": "FavoriteMealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FavoriteMealsConnection",
        "kind": "LinkedField",
        "name": "favoriteMeals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FavoriteMeal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Meal",
                "kind": "LinkedField",
                "name": "meal",
                "plural": false,
                "selections": [
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
    ]
  },
  "params": {
    "cacheID": "0ec3c20581dc2be5ab0c0b40e22c04f1",
    "id": null,
    "metadata": {},
    "name": "FavoriteMealsQuery",
    "operationKind": "query",
    "text": "query FavoriteMealsQuery(\n  $currentUserId: BigInt\n) {\n  favoriteMeals(orderBy: [CREATED_AT_DESC], first: 1000, filter: {personId: {equalTo: $currentUserId}}) {\n    nodes {\n      id\n      rowId\n      meal {\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        categories\n        tags\n        code\n        photoUrl\n        videoUrl\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "13e7833a027612ae19b09e5b1798b9cd";

export default node;
