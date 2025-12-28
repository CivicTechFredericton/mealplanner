/**
 * @generated SignedSource<<71a757562e45b6ebc96fae95c485ef8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MealPlanHeaderAllUsersQuery$variables = Record<PropertyKey, never>;
export type MealPlanHeaderAllUsersQuery$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly fullName: string;
      readonly id: string;
      readonly rowId: any;
    }>;
  } | null | undefined;
};
export type MealPlanHeaderAllUsersQuery = {
  response: MealPlanHeaderAllUsersQuery$data;
  variables: MealPlanHeaderAllUsersQuery$variables;
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
