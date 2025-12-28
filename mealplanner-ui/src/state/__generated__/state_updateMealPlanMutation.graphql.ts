/**
 * @generated SignedSource<<2769ae4ad6cafcc50297d7ff77845338>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type state_updateMealPlanMutation$variables = {
  descriptionEn?: string | null | undefined;
  mealPlanId: any;
  mealPlanName?: string | null | undefined;
  personId?: any | null | undefined;
  startDate?: any | null | undefined;
  tags?: ReadonlyArray<string | null | undefined> | null | undefined;
};
export type state_updateMealPlanMutation$data = {
  readonly updateMealPlan: {
    readonly mealPlan: {
      readonly descriptionEn: string | null | undefined;
      readonly id: string;
      readonly nameEn: string;
      readonly personId: any | null | undefined;
      readonly rowId: any;
      readonly startDate: any | null | undefined;
      readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"MealPlanHeader_mealPlan">;
    } | null | undefined;
  } | null | undefined;
};
export type state_updateMealPlanMutation = {
  response: state_updateMealPlanMutation$data;
  variables: state_updateMealPlanMutation$variables;
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
  "name": "startDate"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tags"
},
v6 = [
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
            "name": "startDate",
            "variableName": "startDate"
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "personId",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_updateMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
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
      (v5/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_updateMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
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
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
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
                "kind": "ScalarField",
                "name": "isTemplate",
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
                  (v8/*: any*/),
                  (v7/*: any*/)
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
    "cacheID": "349b100f3db04fe58bc8aa30411dcc0f",
    "id": null,
    "metadata": {},
    "name": "state_updateMealPlanMutation",
    "operationKind": "mutation",
    "text": "mutation state_updateMealPlanMutation(\n  $mealPlanId: BigInt!\n  $mealPlanName: String\n  $descriptionEn: String\n  $personId: BigInt\n  $tags: [String]\n  $startDate: Date\n) {\n  updateMealPlan(input: {patch: {nameEn: $mealPlanName, descriptionEn: $descriptionEn, personId: $personId, tags: $tags, startDate: $startDate}, rowId: $mealPlanId}) {\n    mealPlan {\n      id\n      rowId\n      nameEn\n      descriptionEn\n      personId\n      tags\n      startDate\n      ...MealPlanHeader_mealPlan\n    }\n  }\n}\n\nfragment MealPlanHeader_mealPlan on MealPlan {\n  rowId\n  nameEn\n  nameFr\n  descriptionEn\n  tags\n  isTemplate\n  startDate\n  person {\n    fullName\n    rowId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9961ca77d864607d952cf9035d49180";

export default node;
