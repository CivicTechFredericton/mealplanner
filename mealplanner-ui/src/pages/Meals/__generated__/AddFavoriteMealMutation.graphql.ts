/**
 * @generated SignedSource<<f82690ddcc53c51c9a2407665077b79d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AddFavoriteMealMutation$variables = {
  mealIdParam: any;
};
export type AddFavoriteMealMutation$data = {
  readonly addFavoriteMealUuid: {
    readonly preflight: boolean;
  } | null | undefined;
};
export type AddFavoriteMealMutation = {
  response: AddFavoriteMealMutation$data;
  variables: AddFavoriteMealMutation$variables;
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
    "concreteType": "AddFavoriteMealUuidPayload",
    "kind": "LinkedField",
    "name": "addFavoriteMealUuid",
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
    "cacheID": "22e902d1d01c9b7c6ea85f502124d079",
    "id": null,
    "metadata": {},
    "name": "AddFavoriteMealMutation",
    "operationKind": "mutation",
    "text": "mutation AddFavoriteMealMutation(\n  $mealIdParam: BigInt!\n) {\n  addFavoriteMealUuid(input: {mealIdParam: $mealIdParam}) {\n    preflight\n  }\n}\n"
  }
};
})();

(node as any).hash = "227398027e398cd23c4cd480b29ab09d";

export default node;
