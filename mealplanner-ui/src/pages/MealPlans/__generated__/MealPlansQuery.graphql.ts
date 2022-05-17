/**
 * @generated SignedSource<<762e136edd8979a6cb46b22574e775e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MealPlansQuery$variables = {};
export type MealPlansQuery$data = {
  readonly mealPlans: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly nameEn: string;
      readonly descriptionEn: string | null;
      readonly person: {
        readonly fullName: string;
      } | null;
      readonly tags: ReadonlyArray<string | null> | null;
      readonly mealPlanEntries: {
        readonly nodes: ReadonlyArray<{
          readonly meal: {
            readonly id: string;
            readonly photoUrl: string | null;
          } | null;
        }>;
      };
    }>;
  } | null;
};
export type MealPlansQuery = {
  variables: MealPlansQuery$variables;
  response: MealPlansQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
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
  "name": "descriptionEn",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Meal",
  "kind": "LinkedField",
  "name": "meal",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "photoUrl",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MealPlansQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MealPlansConnection",
        "kind": "LinkedField",
        "name": "mealPlans",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlan",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Person",
                "kind": "LinkedField",
                "name": "person",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
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
                      (v6/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MealPlansQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MealPlansConnection",
        "kind": "LinkedField",
        "name": "mealPlans",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlan",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Person",
                "kind": "LinkedField",
                "name": "person",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
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
                      (v6/*: any*/),
                      (v0/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "613c5cbb1f5b5e73b9c0d6178d1ef3dc",
    "id": null,
    "metadata": {},
    "name": "MealPlansQuery",
    "operationKind": "query",
    "text": "query MealPlansQuery {\n  mealPlans {\n    nodes {\n      id\n      rowId\n      nameEn\n      descriptionEn\n      person {\n        fullName\n        id\n      }\n      tags\n      mealPlanEntries {\n        nodes {\n          meal {\n            id\n            photoUrl\n          }\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c4eb105605e1997c5262febca2a8a3d";

export default node;
