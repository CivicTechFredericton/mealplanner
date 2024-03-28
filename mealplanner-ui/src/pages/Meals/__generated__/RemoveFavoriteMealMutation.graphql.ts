/**
 * @generated SignedSource<<c48d3d40e3af949cf26c9f25989f4a16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveFavoriteMealMutation$variables = {
  mealIdParam: any;
};
export type RemoveFavoriteMealMutation$data = {
  readonly removeFavoriteMeal: {
    readonly preflight: boolean;
  } | null;
};
export type RemoveFavoriteMealMutation = {
  variables: RemoveFavoriteMealMutation$variables;
  response: RemoveFavoriteMealMutation$data;
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
    "concreteType": "RemoveFavoriteMealPayload",
    "kind": "LinkedField",
    "name": "removeFavoriteMeal",
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
    "cacheID": "6e9c39a37f6f50401e3b62a541bc38e1",
    "id": null,
    "metadata": {},
    "name": "RemoveFavoriteMealMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveFavoriteMealMutation(\n  $mealIdParam: BigInt!\n) {\n  removeFavoriteMeal(input: {mealIdParam: $mealIdParam}) {\n    preflight\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8d887b661436fd5071536c0b48b61ba";

export default node;
