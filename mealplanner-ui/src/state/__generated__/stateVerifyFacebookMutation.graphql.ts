/**
 * @generated SignedSource<<926c025b48e7939dc1e1a6cb0fb013a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type stateVerifyFacebookMutation$variables = {
  accessToken: string;
  email: string;
};
export type stateVerifyFacebookMutation$data = {
  readonly verifyFacebookToken: {
    readonly success: boolean;
  };
};
export type stateVerifyFacebookMutation = {
  variables: stateVerifyFacebookMutation$variables;
  response: stateVerifyFacebookMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "accessToken"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accessToken",
        "variableName": "accessToken"
      },
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "VerifyFacebookTokenPayload",
    "kind": "LinkedField",
    "name": "verifyFacebookToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "stateVerifyFacebookMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "stateVerifyFacebookMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f227f8dea2f9c368bce459243459daa0",
    "id": null,
    "metadata": {},
    "name": "stateVerifyFacebookMutation",
    "operationKind": "mutation",
    "text": "mutation stateVerifyFacebookMutation(\n  $accessToken: String!\n  $email: String!\n) {\n  verifyFacebookToken(accessToken: $accessToken, email: $email) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "bdb2f9c290411cb87db94cab7e8c3f10";

export default node;
