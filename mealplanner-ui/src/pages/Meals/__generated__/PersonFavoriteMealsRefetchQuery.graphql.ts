/**
 * @generated SignedSource<<26192702ad278a573223d89e109634ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FavoriteMealCondition = {
  createdAt?: any | null | undefined;
  mealId?: any | null | undefined;
  personId?: any | null | undefined;
  personUuid?: string | null | undefined;
  rowId?: any | null | undefined;
  updatedAt?: any | null | undefined;
};
export type PersonFavoriteMealsRefetchQuery$variables = {
  condition?: FavoriteMealCondition | null | undefined;
};
export type PersonFavoriteMealsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};
export type PersonFavoriteMealsRefetchQuery = {
  response: PersonFavoriteMealsRefetchQuery$data;
  variables: PersonFavoriteMealsRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "condition"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "condition",
    "variableName": "condition"
  }
],
v2 = {
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
        "args": (v1/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "490b7089f456ff692fe6655c1c90ebf5",
    "id": null,
    "metadata": {},
    "name": "PersonFavoriteMealsRefetchQuery",
    "operationKind": "query",
    "text": "query PersonFavoriteMealsRefetchQuery(\n  $condition: FavoriteMealCondition = null\n) {\n  ...PersonFavoriteMeals_favorites_3ZFPk6\n}\n\nfragment PersonFavoriteMeals_favorites_3ZFPk6 on Query {\n  favoriteMeals(condition: $condition) {\n    nodes {\n      personUuid\n      meal {\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        categories\n        tags\n        code\n        photoUrl\n        videoUrl\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5a9e73d1fb21ff4573452234cc9d73a";

export default node;
