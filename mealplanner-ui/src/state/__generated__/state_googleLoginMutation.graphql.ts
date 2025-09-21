/**
 * @generated SignedSource<<234efc602706abe08b48d2b506518728>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type state_googleLoginMutation$variables = {
  userEmail: string;
};
export type state_googleLoginMutation$data = {
  readonly authenticateGoogle: {
    readonly jwtToken: {
      readonly role: string | null;
      readonly personId: any | null;
    } | null;
  } | null;
};
export type state_googleLoginMutation = {
  variables: state_googleLoginMutation$variables;
  response: state_googleLoginMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userEmail"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
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
    "concreteType": "AuthenticateGooglePayload",
    "kind": "LinkedField",
    "name": "authenticateGoogle",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "state_googleLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "state_googleLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4d4c52ccf878fd1c6e51775a0598a98d",
    "id": null,
    "metadata": {},
    "name": "state_googleLoginMutation",
    "operationKind": "mutation",
    "text": "mutation state_googleLoginMutation(\n  $userEmail: String!\n) {\n  authenticateGoogle(input: {userEmail: $userEmail}) {\n    jwtToken {\n      role\n      personId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a8068d6d694b1cd42e1172b03ac08aa";

export default node;
