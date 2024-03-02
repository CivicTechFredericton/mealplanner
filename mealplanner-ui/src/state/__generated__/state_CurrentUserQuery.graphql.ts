/**
 * @generated SignedSource<<eb374f6230dfc05fff930e5d69f8506b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type state_CurrentUserQuery$variables = {};
export type state_CurrentUserQuery$data = {
  readonly currentPerson: {
    readonly rowId: any | null;
    readonly email: string | null;
    readonly fullName: string | null;
    readonly role: string | null;
    readonly slug: string | null;
  } | null;
};
export type state_CurrentUserQuery = {
  variables: state_CurrentUserQuery$variables;
  response: state_CurrentUserQuery$data;
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
        "name": "rowId",
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
        "name": "fullName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
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
    "name": "state_CurrentUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "state_CurrentUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e1386ae5cebceca86301ad711b3f6368",
    "id": null,
    "metadata": {},
    "name": "state_CurrentUserQuery",
    "operationKind": "query",
    "text": "query state_CurrentUserQuery {\n  currentPerson {\n    rowId\n    email\n    fullName\n    role\n    slug\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff00cae081fc66e331b709846013d6d4";

export default node;
