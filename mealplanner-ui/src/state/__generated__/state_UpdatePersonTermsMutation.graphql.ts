/**
 * @generated SignedSource<<374890b307e3bb2a9dcacb217b29f485>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type state_UpdatePersonTermsMutation$variables = {
  personTerms: boolean;
};
export type state_UpdatePersonTermsMutation$data = {
  readonly updatePersonTerms: {
    readonly preflight: boolean;
  } | null | undefined;
};
export type state_UpdatePersonTermsMutation = {
  response: state_UpdatePersonTermsMutation$data;
  variables: state_UpdatePersonTermsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "personTerms"
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
            "name": "personTerms",
            "variableName": "personTerms"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdatePersonTermsPayload",
    "kind": "LinkedField",
    "name": "updatePersonTerms",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "preflight",
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
    "name": "state_UpdatePersonTermsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "state_UpdatePersonTermsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "050e6f3d7de3cd245039b663cc7e0367",
    "id": null,
    "metadata": {},
    "name": "state_UpdatePersonTermsMutation",
    "operationKind": "mutation",
    "text": "mutation state_UpdatePersonTermsMutation(\n  $personTerms: Boolean!\n) {\n  updatePersonTerms(input: {personTerms: $personTerms}) {\n    preflight\n  }\n}\n"
  }
};
})();

(node as any).hash = "78cc802dda7f77f9e03e516ee8fc83d3";

export default node;
