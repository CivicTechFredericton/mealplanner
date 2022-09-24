/**
 * @generated SignedSource<<3f8ac7d180bb0fb706c7a926078830fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type state_updateMealPlanMutation$variables = {
  mealPlanId: any;
  mealPlanName?: string | null;
  descriptionEn?: string | null;
  personId?: any | null;
  tags?: ReadonlyArray<string | null> | null;
};
export type state_updateMealPlanMutation$data = {
  readonly updateMealPlan: {
    readonly mealPlan: {
      readonly id: string;
      readonly rowId: any;
      readonly nameEn: string;
      readonly descriptionEn: string | null;
      readonly personId: any | null;
      readonly tags: ReadonlyArray<string | null> | null;
      readonly " $fragmentSpreads": FragmentRefs<"MealPlanHeader_mealPlan">;
    } | null;
  } | null;
};
export type state_updateMealPlanMutation = {
  variables: state_updateMealPlanMutation$variables;
  response: state_updateMealPlanMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descriptionEn"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mealPlanId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mealPlanName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "personId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tags"
},
v5 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "descriptionEn",
            "variableName": "descriptionEn"
          },
          {
            "kind": "Variable",
            "name": "nameEn",
            "variableName": "mealPlanName"
          },
          {
            "kind": "Variable",
            "name": "personId",
            "variableName": "personId"
          },
          {
            "kind": "Variable",
            "name": "tags",
            "variableName": "tags"
          }
        ],
        "kind": "ObjectValue",
        "name": "patch"
      },
      {
        "kind": "Variable",
        "name": "rowId",
        "variableName": "mealPlanId"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "personId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_updateMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateMealPlanPayload",
        "kind": "LinkedField",
        "name": "updateMealPlan",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlan",
            "kind": "LinkedField",
            "name": "mealPlan",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MealPlanHeader_mealPlan"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_updateMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateMealPlanPayload",
        "kind": "LinkedField",
        "name": "updateMealPlan",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlan",
            "kind": "LinkedField",
            "name": "mealPlan",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nameFr",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Person",
                "kind": "LinkedField",
                "name": "person",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fullName",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b963515f602c6c3077642408ac15214",
    "id": null,
    "metadata": {},
    "name": "state_updateMealPlanMutation",
    "operationKind": "mutation",
    "text": "mutation state_updateMealPlanMutation(\n  $mealPlanId: BigInt!\n  $mealPlanName: String\n  $descriptionEn: String\n  $personId: BigInt\n  $tags: [String]\n) {\n  updateMealPlan(input: {patch: {nameEn: $mealPlanName, descriptionEn: $descriptionEn, personId: $personId, tags: $tags}, rowId: $mealPlanId}) {\n    mealPlan {\n      id\n      rowId\n      nameEn\n      descriptionEn\n      personId\n      tags\n      ...MealPlanHeader_mealPlan\n    }\n  }\n}\n\nfragment MealPlanHeader_mealPlan on MealPlan {\n  rowId\n  nameEn\n  nameFr\n  descriptionEn\n  tags\n  person {\n    fullName\n    rowId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5cd6b760400f768ac3b5454e313a620d";

export default node;
