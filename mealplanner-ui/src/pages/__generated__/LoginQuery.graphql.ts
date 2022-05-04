/**
 * @generated SignedSource<<b2efcfb9eddc7714aa7d1993181dc5e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LoginQuery$variables = {};
export type LoginQuery$data = {
  readonly currentPerson: {
    readonly fullName: string | null;
    readonly email: string | null;
  } | null;
  readonly gqLocalState: {
    readonly currentUser: {
      readonly personID: any;
    } | null;
  };
};
export type LoginQuery = {
  variables: LoginQuery$variables;
  response: LoginQuery$data;
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
  },
  {
    "kind": "ClientExtension",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQLocalState",
        "kind": "LinkedField",
        "name": "gqLocalState",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CurrentLoggedInUser",
            "kind": "LinkedField",
            "name": "currentUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "personID",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LoginQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ba6e4c171e71c11d4c587ec42309a657",
    "id": null,
    "metadata": {},
    "name": "LoginQuery",
    "operationKind": "query",
    "text": "query LoginQuery {\n  currentPerson {\n    fullName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "52d1e2fb92d01b73596425c8f8cdbdef";

export default node;
