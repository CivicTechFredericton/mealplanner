/**
 * @generated SignedSource<<0553f561b90d4ee189fa7510a15c0194>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CreateMealPlanAllUsersQuery$variables = {};
export type CreateMealPlanAllUsersQuery$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly fullName: string;
    }>;
  } | null;
};
export type CreateMealPlanAllUsersQuery = {
  variables: CreateMealPlanAllUsersQuery$variables;
  response: CreateMealPlanAllUsersQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
            "name": "fullName",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateMealPlanAllUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateMealPlanAllUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8787ee79d3f4038da94d2c5b2d91e555",
    "id": null,
    "metadata": {},
    "name": "CreateMealPlanAllUsersQuery",
    "operationKind": "query",
    "text": "query CreateMealPlanAllUsersQuery {\n  people {\n    nodes {\n      id\n      rowId\n      fullName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fae5ed408ee251d301a386e5ba3193e0";

export default node;
