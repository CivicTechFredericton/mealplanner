/**
 * @generated SignedSource<<60548045efbedf0f79bc353ef3c170d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddFavoriteMealMutation$variables = {
  mealIdParam: any;
};
export type AddFavoriteMealMutation$data = {
  readonly addFavoriteMeal: {
    readonly preflight: boolean;
  } | null;
};
export type AddFavoriteMealMutation = {
  variables: AddFavoriteMealMutation$variables;
  response: AddFavoriteMealMutation$data;
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
    "concreteType": "AddFavoriteMealPayload",
    "kind": "LinkedField",
    "name": "addFavoriteMeal",
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
    "name": "AddFavoriteMealMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddFavoriteMealMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "845394e9674a875624c959e9a121be69",
    "id": null,
    "metadata": {},
    "name": "AddFavoriteMealMutation",
    "operationKind": "mutation",
    "text": "mutation AddFavoriteMealMutation(\n  $mealIdParam: BigInt!\n) {\n  addFavoriteMeal(input: {mealIdParam: $mealIdParam}) {\n    preflight\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3f705cff13b312d0afdacd572858ad5";

export default node;
