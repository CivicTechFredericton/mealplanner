/**
 * @generated SignedSource<<ee8efe20135b2c956043edb7537c5285>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LoginQuery$variables = Record<PropertyKey, never>;
export type LoginQuery$data = {
  readonly currentPerson: {
    readonly email: string | null | undefined;
    readonly fullName: string | null | undefined;
  } | null | undefined;
  readonly gqLocalState: {
    readonly currentUser: {
      readonly personID: any;
    } | null | undefined;
  };
};
export type LoginQuery = {
  response: LoginQuery$data;
  variables: LoginQuery$variables;
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
