/**
 * @generated SignedSource<<4063b59cda5390ed5eeb710f39d6d040>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type state_loginMutation$variables = {
  password: string;
  userEmail: string;
};
export type state_loginMutation$data = {
  readonly authenticate: {
    readonly jwtToken: {
      readonly personId: any | null | undefined;
      readonly role: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type state_loginMutation = {
  response: state_loginMutation$data;
  variables: state_loginMutation$variables;
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
    "name": "state_loginMutation",
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
    "name": "state_loginMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "95f74194e1ce9013e3f04142e32ed07a",
    "id": null,
    "metadata": {},
    "name": "state_loginMutation",
    "operationKind": "mutation",
    "text": "mutation state_loginMutation(\n  $userEmail: String!\n  $password: String!\n) {\n  authenticate(input: {userEmail: $userEmail, password: $password}) {\n    jwtToken {\n      role\n      personId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "16265381cc93ddf848b8a1d94916eea1";

export default node;
