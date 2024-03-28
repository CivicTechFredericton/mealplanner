/**
 * @generated SignedSource<<31d180638382a0804ed5aab9329143f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
export type MealsQuery$variables = {
  slug: string;
};
export type MealsQuery$data = {
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly rowId: any;
      readonly nameEn: string;
      readonly nameFr: string | null;
      readonly descriptionEn: string | null;
      readonly descriptionFr: string | null;
      readonly categories: ReadonlyArray<CategoryT | null> | null;
      readonly tags: ReadonlyArray<string | null> | null;
      readonly code: any | null;
      readonly photoUrl: string | null;
      readonly videoUrl: string | null;
    }>;
  } | null;
  readonly gqLocalState: {
    readonly selectedMealTags: ReadonlyArray<string> | null;
    readonly selectedFavoriteMeals: ReadonlyArray<string> | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MealTags_tags" | "PersonFavoriteMeals_favorites">;
};
export type MealsQuery = {
  variables: MealsQuery$variables;
  response: MealsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      "ID_DESC"
    ]
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
  "name": "nameEn",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionFr",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categories",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
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
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQLocalState",
      "kind": "LinkedField",
      "name": "gqLocalState",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "selectedMealTags",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "selectedFavoriteMeals",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = [
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
  (v13/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealsConnection",
        "kind": "LinkedField",
        "name": "meals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Meal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
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
              (v11/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "meals(first:1000,orderBy:[\"ID_DESC\"])"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MealTags_tags"
      },
      {
        "args": [
          {
            "kind": "Variable",
            "name": "slug",
            "variableName": "slug"
          }
        ],
        "kind": "FragmentSpread",
        "name": "PersonFavoriteMeals_favorites"
      },
      (v12/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealsConnection",
        "kind": "LinkedField",
        "name": "meals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Meal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": (v14/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": "meals(first:1000,orderBy:[\"ID_DESC\"])"
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100
          }
        ],
        "concreteType": "AllMealTagsConnection",
        "kind": "LinkedField",
        "name": "allMealTags",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AllMealTagEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "node",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "allMealTags(first:100)"
      },
      (v12/*: any*/),
      {
        "alias": null,
        "args": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "kind": "Variable",
                    "name": "equalTo",
                    "variableName": "slug"
                  }
                ],
                "kind": "ObjectValue",
                "name": "slug"
              }
            ],
            "kind": "ObjectValue",
            "name": "filter"
          },
          {
            "kind": "Literal",
            "name": "first",
            "value": 1
          }
        ],
        "concreteType": "PeopleConnection",
        "kind": "LinkedField",
        "name": "people",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Meal",
                        "kind": "LinkedField",
                        "name": "meal",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v13/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ecc384d7f19a1337828ecf169e5a7934",
    "id": null,
    "metadata": {},
    "name": "MealsQuery",
    "operationKind": "query",
    "text": "query MealsQuery(\n  $slug: String!\n) {\n  meals(orderBy: [ID_DESC], first: 1000) {\n    nodes {\n      rowId\n      nameEn\n      nameFr\n      descriptionEn\n      descriptionFr\n      categories\n      tags\n      code\n      photoUrl\n      videoUrl\n      id\n    }\n  }\n  ...MealTags_tags\n  ...PersonFavoriteMeals_favorites_20J5Pl\n}\n\nfragment MealTags_tags on Query {\n  allMealTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}\n\nfragment PersonFavoriteMeals_favorites_20J5Pl on Query {\n  people(filter: {slug: {equalTo: $slug}}, first: 1) {\n    nodes {\n      favoriteMeals {\n        nodes {\n          meal {\n            rowId\n            nameEn\n            nameFr\n            descriptionEn\n            descriptionFr\n            categories\n            tags\n            code\n            photoUrl\n            videoUrl\n            id\n          }\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef5f5a171527e3c28bd3a663997fe446";

export default node;
