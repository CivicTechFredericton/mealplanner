/**
 * @generated SignedSource<<6da59e7c670cc7c44e4f3c6683262a99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMealsRefetchQuery$variables = Record<PropertyKey, never>;
export type PersonFavoriteMealsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};
export type PersonFavoriteMealsRefetchQuery = {
  response: PersonFavoriteMealsRefetchQuery$data;
  variables: PersonFavoriteMealsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonFavoriteMealsRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PersonFavoriteMeals_favorites"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PersonFavoriteMealsRefetchQuery",
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
                "kind": "ScalarField",
                "name": "personUuid",
                "storageKey": null
              },
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
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e54238939295e681f6d22cc969d7b0fa",
    "id": null,
    "metadata": {},
    "name": "PersonFavoriteMealsRefetchQuery",
    "operationKind": "query",
    "text": "query PersonFavoriteMealsRefetchQuery {\n  ...PersonFavoriteMeals_favorites\n}\n\nfragment PersonFavoriteMeals_favorites on Query {\n  favoriteMeals {\n    nodes {\n      personUuid\n      meal {\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        categories\n        tags\n        code\n        photoUrl\n        videoUrl\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a415b944129f4ccf45debdd7d6005c5";

export default node;
