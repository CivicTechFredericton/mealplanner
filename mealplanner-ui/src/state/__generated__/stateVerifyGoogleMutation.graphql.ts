/**
 * @generated SignedSource<<b1f350d1ddd3287a9b4a84152f3ea5dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type stateVerifyGoogleMutation$variables = {
  idToken: string;
  email: string;
};
export type stateVerifyGoogleMutation$data = {
  readonly verifyGoogleToken: {
    readonly success: boolean;
  };
};
export type stateVerifyGoogleMutation = {
  variables: stateVerifyGoogleMutation$variables;
  response: stateVerifyGoogleMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "idToken"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "idToken",
        "variableName": "idToken"
      }
    ],
    "concreteType": "VerifyGoogleTokenPayload",
    "kind": "LinkedField",
    "name": "verifyGoogleToken",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "stateVerifyGoogleMutation",
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
    "name": "stateVerifyGoogleMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "933a4f98e6bbc2ae6aba33f354b6b514",
    "id": null,
    "metadata": {},
    "name": "stateVerifyGoogleMutation",
    "operationKind": "mutation",
    "text": "mutation stateVerifyGoogleMutation(\n  $idToken: String!\n  $email: String!\n) {\n  verifyGoogleToken(idToken: $idToken, email: $email) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "ceb4995aae1120811d8ae42b723806a3";

export default node;
