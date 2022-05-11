/**
 * @generated SignedSource<<82bd5b46cad060ab1dd9670833f58ca8>>
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
    readonly person: {
      readonly id: string;
      readonly rowId: any;
    } | null;
    readonly email: string | null;
    readonly fullName: string | null;
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
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "person",
        "plural": false,
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
          }
        ],
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
    "cacheID": "eaf642213dfed784a6a57b77ef8be1f4",
    "id": null,
    "metadata": {},
    "name": "state_CurrentUserQuery",
    "operationKind": "query",
    "text": "query state_CurrentUserQuery {\n  currentPerson {\n    person {\n      id\n      rowId\n    }\n    email\n    fullName\n  }\n}\n"
  }
};
})();

(node as any).hash = "acffc15db375e4ad9a4a05eb45fe5a81";

export default node;
