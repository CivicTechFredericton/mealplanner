/**
 * @generated SignedSource<<51b4b2d3a92807c6d00240e28892bfeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMealsRefetchQuery$variables = {
  slug: string;
};
export type PersonFavoriteMealsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};
export type PersonFavoriteMealsRefetchQuery = {
  variables: PersonFavoriteMealsRefetchQuery$variables;
  response: PersonFavoriteMealsRefetchQuery$data;
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonFavoriteMealsRefetchQuery",
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonFavoriteMealsRefetchQuery",
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "rowId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "nameEn",
                            "storageKey": null
                          },
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
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
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
                "name": "selectedFavoriteMeals",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "4ad0855e73dee0fa9a6372280a10dc57",
    "id": null,
    "metadata": {},
    "name": "PersonFavoriteMealsRefetchQuery",
    "operationKind": "query",
    "text": "query PersonFavoriteMealsRefetchQuery(\n  $slug: String!\n) {\n  ...PersonFavoriteMeals_favorites_20J5Pl\n}\n\nfragment PersonFavoriteMeals_favorites_20J5Pl on Query {\n  people(filter: {slug: {equalTo: $slug}}, first: 1) {\n    nodes {\n      favoriteMeals {\n        nodes {\n          meal {\n            rowId\n            nameEn\n            nameFr\n            descriptionEn\n            descriptionFr\n            categories\n            tags\n            code\n            photoUrl\n            videoUrl\n            id\n          }\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ed7cd897fa668b44d236208f6198e3ff";

export default node;
