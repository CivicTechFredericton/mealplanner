/**
 * @generated SignedSource<<16e11e25a14eed5a787619e4930bb231>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type state_checkUserByEmailQuery$variables = {
  email: string;
};
export type state_checkUserByEmailQuery$data = {
  readonly personByEmail: {
    readonly rowId: any;
    readonly email: string;
  } | null;
};
export type state_checkUserByEmailQuery = {
  variables: state_checkUserByEmailQuery$variables;
  response: state_checkUserByEmailQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "state_checkUserByEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "personByEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "state_checkUserByEmailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "personByEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "22d3efa0f7aef89f93d14c8187f649d3",
    "id": null,
    "metadata": {},
    "name": "state_checkUserByEmailQuery",
    "operationKind": "query",
    "text": "query state_checkUserByEmailQuery(\n  $email: String!\n) {\n  personByEmail(email: $email) {\n    rowId\n    email\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e0b3f6b0f6ffcea5ede71c8753d59519";

export default node;
