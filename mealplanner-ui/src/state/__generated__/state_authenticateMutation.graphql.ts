/**
 * @generated SignedSource<<34e0e9fb5417bafa378b6b1655981ed5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type state_authenticateMutation$variables = {
  userEmail: string;
  password: string;
};
export type state_authenticateMutation$data = {
  readonly authenticate: {
    readonly jwtToken: {
      readonly role: string | null;
      readonly personId: any | null;
    } | null;
  } | null;
};
export type state_authenticateMutation = {
  variables: state_authenticateMutation$variables;
  response: state_authenticateMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userEmail"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "password",
            "variableName": "password"
          },
          {
            "kind": "Variable",
            "name": "userEmail",
            "variableName": "userEmail"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "AuthenticatePayload",
    "kind": "LinkedField",
    "name": "authenticate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "JwtToken",
        "kind": "LinkedField",
        "name": "jwtToken",
        "plural": false,
        "selections": [
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
            "name": "personId",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_authenticateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_authenticateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ea0cf19bdb431a18d9ba961cd14af78a",
    "id": null,
    "metadata": {},
    "name": "state_authenticateMutation",
    "operationKind": "mutation",
    "text": "mutation state_authenticateMutation(\n  $userEmail: String!\n  $password: String!\n) {\n  authenticate(input: {userEmail: $userEmail, password: $password}) {\n    jwtToken {\n      role\n      personId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c301aba9d41fef7c460798def131c48";

export default node;
