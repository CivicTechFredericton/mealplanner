/**
 * @generated SignedSource<<d56225c54acab50cc2f2154d7fa56f2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentUserQuery$variables = {};
export type CurrentUserQueryVariables = CurrentUserQuery$variables;
export type CurrentUserQuery$data = {
  readonly currentPerson: {
    readonly fullName: string | null;
    readonly email: string | null;
  } | null;
};
export type CurrentUserQueryResponse = CurrentUserQuery$data;
export type CurrentUserQuery = {
  variables: CurrentUserQueryVariables;
  response: CurrentUserQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrentUser",
    "kind": "LinkedField",
    "name": "currentPerson",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fullName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
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
    "name": "CurrentUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrentUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "81978fec4b0c1784e5fb4f1dd29c1675",
    "id": null,
    "metadata": {},
    "name": "CurrentUserQuery",
    "operationKind": "query",
    "text": "query CurrentUserQuery {\n  currentPerson {\n    fullName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "c188ef0bf1babe3c0018f15af211494a";

export default node;
