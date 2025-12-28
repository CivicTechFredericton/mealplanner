/**
 * @generated SignedSource<<2f3b71842c68e872c5ad3fa442b8c9b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type state_logoutMutation$variables = Record<PropertyKey, never>;
export type state_logoutMutation$data = {
  readonly logout: {
    readonly status: string | null | undefined;
  };
};
export type state_logoutMutation = {
  response: state_logoutMutation$data;
  variables: state_logoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "LogoutPayload",
    "kind": "LinkedField",
    "name": "logout",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
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
    "name": "state_logoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "state_logoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e478353ad634af3edf231a045dc1ea94",
    "id": null,
    "metadata": {},
    "name": "state_logoutMutation",
    "operationKind": "mutation",
    "text": "mutation state_logoutMutation {\n  logout {\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "94d400d6bc33876c68abfcd3032ce093";

export default node;
