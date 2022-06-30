/**
 * @generated SignedSource<<60a83d84174717cbd15c23640c4b411d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
export type state_createMealPlanEntryMutation$variables = {
  connections: ReadonlyArray<string>;
  category: CategoryT;
  days: number;
  mealPlanId: any;
  mealId: any;
};
export type state_createMealPlanEntryMutation$data = {
  readonly createMealPlanEntry: {
    readonly mealPlanEntryEdge: {
      readonly cursor: any | null;
      readonly node: {
        readonly id: string;
        readonly rowId: any;
        readonly days: number;
        readonly category: CategoryT;
        readonly mealId: any;
        readonly meal: {
          readonly id: string;
          readonly rowId: any;
          readonly nameEn: string;
        } | null;
      };
    } | null;
  } | null;
};
export type state_createMealPlanEntryMutation = {
  variables: state_createMealPlanEntryMutation$variables;
  response: state_createMealPlanEntryMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "category"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "days"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mealId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mealPlanId"
},
v5 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "category",
            "variableName": "category"
          },
          {
            "kind": "Variable",
            "name": "days",
            "variableName": "days"
          },
          {
            "kind": "Variable",
            "name": "mealId",
            "variableName": "mealId"
          },
          {
            "kind": "Variable",
            "name": "mealPlanId",
            "variableName": "mealPlanId"
          }
        ],
        "kind": "ObjectValue",
        "name": "mealPlanEntry"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "MealPlanEntriesEdge",
  "kind": "LinkedField",
  "name": "mealPlanEntryEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MealPlanEntry",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v6/*: any*/),
        (v7/*: any*/),
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
          "concreteType": "Meal",
          "kind": "LinkedField",
          "name": "meal",
          "plural": false,
          "selections": [
            (v6/*: any*/),
            (v7/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "nameEn",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_createMealPlanEntryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "CreateMealPlanEntryPayload",
        "kind": "LinkedField",
        "name": "createMealPlanEntry",
        "plural": false,
        "selections": [
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_createMealPlanEntryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "CreateMealPlanEntryPayload",
        "kind": "LinkedField",
        "name": "createMealPlanEntry",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "mealPlanEntryEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "695ed30437496c0883463974ff4fabcf",
    "id": null,
    "metadata": {},
    "name": "state_createMealPlanEntryMutation",
    "operationKind": "mutation",
    "text": "mutation state_createMealPlanEntryMutation(\n  $category: CategoryT!\n  $days: Int!\n  $mealPlanId: BigInt!\n  $mealId: BigInt!\n) {\n  createMealPlanEntry(input: {mealPlanEntry: {category: $category, days: $days, mealPlanId: $mealPlanId, mealId: $mealId}}) {\n    mealPlanEntryEdge {\n      cursor\n      node {\n        id\n        rowId\n        days\n        category\n        mealId\n        meal {\n          id\n          rowId\n          nameEn\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4c04f90fc87135b4d671d37212a21df";

export default node;
