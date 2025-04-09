/**
 * @generated SignedSource<<5172fa55ae0cf954ca8fd62222e27f1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LoginVerifyEmailQuery$variables = {
  username: string;
};
export type LoginVerifyEmailQuery$data = {
  readonly emailExists: boolean | null;
};
export type LoginVerifyEmailQuery = {
  variables: LoginVerifyEmailQuery$variables;
  response: LoginVerifyEmailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userEmail",
        "variableName": "username"
      }
    ],
    "kind": "ScalarField",
    "name": "emailExists",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginVerifyEmailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginVerifyEmailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b41068ad53e98dd76ad2d321a04a02e",
    "id": null,
    "metadata": {},
    "name": "LoginVerifyEmailQuery",
    "operationKind": "query",
    "text": "query LoginVerifyEmailQuery(\n  $username: String!\n) {\n  emailExists(userEmail: $username)\n}\n"
  }
};
})();

(node as any).hash = "f1d89b6909299f7f0d3546b8463c87c4";

export default node;
