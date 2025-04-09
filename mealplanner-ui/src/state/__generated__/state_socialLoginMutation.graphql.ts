/**
 * @generated SignedSource<<bcc25817eee6d2cb2720f31fa94a238e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type state_socialLoginMutation$variables = {
  userEmail: string;
};
export type state_socialLoginMutation$data = {
  readonly personDetails: {
    readonly jwtToken: {
      readonly role: string | null;
      readonly personId: any | null;
    } | null;
  } | null;
};
export type state_socialLoginMutation = {
  variables: state_socialLoginMutation$variables;
  response: state_socialLoginMutation$data;
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
    "concreteType": "PersonDetailsPayload",
    "kind": "LinkedField",
    "name": "personDetails",
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
    "name": "state_socialLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "state_socialLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7716ba443b6b82cb9a4616ad9a45bd24",
    "id": null,
    "metadata": {},
    "name": "state_socialLoginMutation",
    "operationKind": "mutation",
    "text": "mutation state_socialLoginMutation(\n  $userEmail: String!\n) {\n  personDetails(input: {userEmail: $userEmail}) {\n    jwtToken {\n      role\n      personId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f05409c863939346ae27b32aeaccfda";

export default node;
