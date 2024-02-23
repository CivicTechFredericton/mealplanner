/**
 * @generated SignedSource<<3dee208d9c0e58042e97bbc565354eef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrentUserQuery$variables = {};
export type CurrentUserQuery$data = {
  readonly currentPerson: {
    readonly fullName: string | null;
    readonly email: string | null;
    readonly role: string | null;
  } | null;
};
export type CurrentUserQuery = {
  variables: CurrentUserQuery$variables;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
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
    "cacheID": "4f2b6b71b98dbba96eff75161ef9c163",
    "id": null,
    "metadata": {},
    "name": "CurrentUserQuery",
    "operationKind": "query",
    "text": "query CurrentUserQuery {\n  currentPerson {\n    fullName\n    email\n    role\n  }\n}\n"
  }
};
})();

(node as any).hash = "037202a19fe5fa19e7806a7a36654aed";

export default node;
