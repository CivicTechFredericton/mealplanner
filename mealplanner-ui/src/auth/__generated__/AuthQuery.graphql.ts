/**
 * @generated SignedSource<<21136f156117d50068f6c181fe227ac4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AuthQuery$variables = {};
export type AuthQuery$data = {
  readonly currentPerson: {
    readonly fullName: string | null;
    readonly email: string | null;
  } | null;
};
export type AuthQuery = {
  variables: AuthQuery$variables;
  response: AuthQuery$data;
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
    "name": "AuthQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "269c081f8c6d9e0adba205b3d8499fa2",
    "id": null,
    "metadata": {},
    "name": "AuthQuery",
    "operationKind": "query",
    "text": "query AuthQuery {\n  currentPerson {\n    fullName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "979b13f86896a364c414d38078751024";

export default node;
