/**
 * @generated SignedSource<<6e03d53d7594e3c9c1c57772ee8e0970>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MealPlanHeaderAllUsersQuery$variables = {};
export type MealPlanHeaderAllUsersQuery$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly fullName: string;
    }>;
  } | null;
};
export type MealPlanHeaderAllUsersQuery = {
  variables: MealPlanHeaderAllUsersQuery$variables;
  response: MealPlanHeaderAllUsersQuery$data;
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
    "name": "MealPlanHeaderAllUsersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MealPlanHeaderAllUsersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "24986f3af07dcaf7fd663759303683d4",
    "id": null,
    "metadata": {},
    "name": "MealPlanHeaderAllUsersQuery",
    "operationKind": "query",
    "text": "query MealPlanHeaderAllUsersQuery {\n  people {\n    nodes {\n      id\n      rowId\n      fullName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "26d871c51e0e2f3db427002fcb92aa5b";

export default node;
