/**
 * @generated SignedSource<<885c2d23cb8f7d534f6085e2de0e4c42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RemoveFavoriteMealMutation$variables = {
  mealIdParam: any;
};
export type RemoveFavoriteMealMutation$data = {
  readonly removeFavoriteMealUuid: {
    readonly preflight: boolean;
  } | null | undefined;
};
export type RemoveFavoriteMealMutation = {
  response: RemoveFavoriteMealMutation$data;
  variables: RemoveFavoriteMealMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mealIdParam"
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
            "name": "mealIdParam",
            "variableName": "mealIdParam"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RemoveFavoriteMealUuidPayload",
    "kind": "LinkedField",
    "name": "removeFavoriteMealUuid",
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
    "name": "RemoveFavoriteMealMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveFavoriteMealMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "57e67f0cf280878dad27064262ab9231",
    "id": null,
    "metadata": {},
    "name": "RemoveFavoriteMealMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveFavoriteMealMutation(\n  $mealIdParam: BigInt!\n) {\n  removeFavoriteMealUuid(input: {mealIdParam: $mealIdParam}) {\n    preflight\n  }\n}\n"
  }
};
})();

(node as any).hash = "4dd2bbe556a2e8895a05a5803dd02462";

export default node;
