/**
 * @generated SignedSource<<1ce334861d2916529459e623749a8005>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FavoritesMealPlanQuery$variables = {
  slug: string;
};
export type FavoritesMealPlanQuery$data = {
  readonly gqLocalState: {
    readonly selectedMeal: {
      readonly nameEn: string;
      readonly rowId: any;
      readonly id: string;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};
export type FavoritesMealPlanQuery = {
  variables: FavoritesMealPlanQuery$variables;
  response: FavoritesMealPlanQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
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
  "name": "id",
  "storageKey": null
},
v4 = {
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
          "concreteType": "SelectedMeal",
          "kind": "LinkedField",
          "name": "selectedMeal",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FavoritesMealPlanQuery",
    "selections": [
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
      (v4/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FavoritesMealPlanQuery",
    "selections": [
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
                        "selections": [
                          (v2/*: any*/),
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "nameFr",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "descriptionEn",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "descriptionFr",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "categories",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "tags",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "code",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "photoUrl",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "videoUrl",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "0a5ae228b61b0ceb2f36799537d7d73c",
    "id": null,
    "metadata": {},
    "name": "FavoritesMealPlanQuery",
    "operationKind": "query",
    "text": "query FavoritesMealPlanQuery(\n  $slug: String!\n) {\n  ...PersonFavoriteMeals_favorites_20J5Pl\n}\n\nfragment PersonFavoriteMeals_favorites_20J5Pl on Query {\n  people(filter: {slug: {equalTo: $slug}}, first: 1) {\n    nodes {\n      favoriteMeals {\n        nodes {\n          meal {\n            rowId\n            nameEn\n            nameFr\n            descriptionEn\n            descriptionFr\n            categories\n            tags\n            code\n            photoUrl\n            videoUrl\n            id\n          }\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "694be900db8a05d29cdbb0c8f994727f";

export default node;
