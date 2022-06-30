/**
 * @generated SignedSource<<2ff664c4007a3e1325b5429bb6a74731>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type state_deleteMealPlanEntryMutation$variables = {
  connections: ReadonlyArray<string>;
  mpeId: any;
};
export type state_deleteMealPlanEntryMutation$data = {
  readonly deleteMealPlanEntry: {
    readonly mealPlanEntryEdge: {
      readonly cursor: any | null;
      readonly node: {
        readonly id: string;
        readonly rowId: any;
      };
    } | null;
  } | null;
};
export type state_deleteMealPlanEntryMutation = {
  variables: state_deleteMealPlanEntryMutation$variables;
  response: state_deleteMealPlanEntryMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mpeId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "rowId",
        "variableName": "mpeId"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "state_deleteMealPlanEntryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteMealPlanEntryPayload",
        "kind": "LinkedField",
        "name": "deleteMealPlanEntry",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlanEntriesEdge",
            "kind": "LinkedField",
            "name": "mealPlanEntryEdge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntry",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "state_deleteMealPlanEntryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteMealPlanEntryPayload",
        "kind": "LinkedField",
        "name": "deleteMealPlanEntry",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlanEntriesEdge",
            "kind": "LinkedField",
            "name": "mealPlanEntryEdge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntry",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "filters": null,
                    "handle": "deleteEdge",
                    "key": "",
                    "kind": "ScalarHandle",
                    "name": "id",
                    "handleArgs": [
                      {
                        "kind": "Variable",
                        "name": "connections",
                        "variableName": "connections"
                      }
                    ]
                  },
                  (v4/*: any*/)
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
    "cacheID": "f536b25910b303dbb3b927d97759e985",
    "id": null,
    "metadata": {},
    "name": "state_deleteMealPlanEntryMutation",
    "operationKind": "mutation",
    "text": "mutation state_deleteMealPlanEntryMutation(\n  $mpeId: BigInt!\n) {\n  deleteMealPlanEntry(input: {rowId: $mpeId}) {\n    mealPlanEntryEdge {\n      cursor\n      node {\n        id\n        rowId\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "55fa0536055d4f3c780bf1e9c7dab3c0";

export default node;
