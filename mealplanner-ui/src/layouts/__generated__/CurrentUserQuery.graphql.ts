/**
 * @generated SignedSource<<56d7e0b9bcccbe8c4664e66453ee30ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CurrentUserQuery$variables = Record<PropertyKey, never>;
export type CurrentUserQuery$data = {
  readonly currentPerson: {
    readonly email: string | null | undefined;
    readonly fullName: string | null | undefined;
    readonly role: string | null | undefined;
  } | null | undefined;
};
export type CurrentUserQuery = {
  response: CurrentUserQuery$data;
  variables: CurrentUserQuery$variables;
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
