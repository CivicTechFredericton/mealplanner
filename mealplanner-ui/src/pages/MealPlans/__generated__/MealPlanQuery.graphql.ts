/**
 * @generated SignedSource<<6a30e43f6dc32e264371698e75392f54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlanQuery$variables = {
  id: any;
};
export type MealPlanQuery$data = {
  readonly mealPlan: {
    readonly nameEn: string;
    readonly nameFr: string | null;
    readonly descriptionEn: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"Calendar_mealPlan">;
  } | null;
};
export type MealPlanQuery = {
  variables: MealPlanQuery$variables;
  response: MealPlanQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rowId",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v5 = {
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
    "name": "MealPlanQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Calendar_mealPlan"
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
    "name": "MealPlanQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": [
                  "CATEGORY_ASC"
                ]
              }
            ],
            "concreteType": "MealPlanEntriesConnection",
            "kind": "LinkedField",
            "name": "mealPlanEntries",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntry",
                "kind": "LinkedField",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mealId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "days",
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
                      (v5/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "mealPlanEntries(orderBy:[\"CATEGORY_ASC\"])"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1087294c8fc51e7bd50e848b091d1676",
    "id": null,
    "metadata": {},
    "name": "MealPlanQuery",
    "operationKind": "query",
    "text": "query MealPlanQuery(\n  $id: BigInt!\n) {\n  mealPlan(rowId: $id) {\n    nameEn\n    nameFr\n    descriptionEn\n    ...Calendar_mealPlan\n    id\n  }\n}\n\nfragment Calendar_mealPlan on MealPlan {\n  mealPlanEntries(orderBy: [CATEGORY_ASC]) {\n    nodes {\n      category\n      mealId\n      days\n      meal {\n        id\n        nameEn\n        nameFr\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9864b129e12c5a8caead2c4a4d4e0a1f";

export default node;
