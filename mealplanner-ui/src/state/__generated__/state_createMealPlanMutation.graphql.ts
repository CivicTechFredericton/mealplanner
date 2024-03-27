/**
 * @generated SignedSource<<ebc64b28a3d7ddb4aed38dee581c6a99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type state_createMealPlanMutation$variables = {
  nameEn: string;
  nameFr?: string | null;
  descEn?: string | null;
  descFr?: string | null;
  personId?: any | null;
  tags?: ReadonlyArray<string | null> | null;
  startDate?: any | null;
  connections: ReadonlyArray<string>;
  isTemplate?: boolean | null;
};
export type state_createMealPlanMutation$data = {
  readonly createMealPlan: {
    readonly mealPlanEdge: {
      readonly cursor: any | null;
      readonly node: {
        readonly id: string;
        readonly rowId: any;
        readonly nameEn: string;
        readonly nameFr: string | null;
        readonly descriptionEn: string | null;
        readonly descriptionFr: string | null;
        readonly isTemplate: boolean | null;
        readonly person: {
          readonly fullName: string;
        } | null;
        readonly tags: ReadonlyArray<string | null> | null;
        readonly mealPlanEntries: {
          readonly nodes: ReadonlyArray<{
            readonly meal: {
              readonly id: string;
              readonly photoUrl: string | null;
            } | null;
          }>;
        };
        readonly startDate: any | null;
      };
    } | null;
  } | null;
};
export type state_createMealPlanMutation = {
  variables: state_createMealPlanMutation$variables;
  response: state_createMealPlanMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descEn"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descFr"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isTemplate"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nameEn"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nameFr"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "personId"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tags"
},
v9 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "descriptionEn",
            "variableName": "descEn"
          },
          {
            "kind": "Variable",
            "name": "descriptionFr",
            "variableName": "descFr"
          },
          {
            "kind": "Variable",
            "name": "isTemplate",
            "variableName": "isTemplate"
          },
          {
            "kind": "Variable",
            "name": "nameEn",
            "variableName": "nameEn"
          },
          {
            "kind": "Variable",
            "name": "nameFr",
            "variableName": "nameFr"
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
        "name": "mealPlan"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionFr",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isTemplate",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Meal",
  "kind": "LinkedField",
  "name": "meal",
  "plural": false,
  "selections": [
    (v11/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "photoUrl",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v21 = {
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
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_createMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "CreateMealPlanPayload",
        "kind": "LinkedField",
        "name": "createMealPlan",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlansEdge",
            "kind": "LinkedField",
            "name": "mealPlanEdge",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlan",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MealPlanEntriesConnection",
                    "kind": "LinkedField",
                    "name": "mealPlanEntries",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MealPlanEntry",
                        "kind": "LinkedField",
                        "name": "nodes",
                        "plural": true,
                        "selections": [
                          (v20/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v21/*: any*/)
                ],
                "storageKey": null
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
      (v4/*: any*/),
      (v5/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v6/*: any*/),
      (v8/*: any*/),
      (v7/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_createMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "CreateMealPlanPayload",
        "kind": "LinkedField",
        "name": "createMealPlan",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MealPlansEdge",
            "kind": "LinkedField",
            "name": "mealPlanEdge",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlan",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MealPlanEntriesConnection",
                    "kind": "LinkedField",
                    "name": "mealPlanEntries",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MealPlanEntry",
                        "kind": "LinkedField",
                        "name": "nodes",
                        "plural": true,
                        "selections": [
                          (v20/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v21/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "mealPlanEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d99967e510846d89f8a0b10af5fb044",
    "id": null,
    "metadata": {},
    "name": "state_createMealPlanMutation",
    "operationKind": "mutation",
    "text": "mutation state_createMealPlanMutation(\n  $nameEn: String!\n  $nameFr: String\n  $descEn: String\n  $descFr: String\n  $personId: BigInt\n  $tags: [String]\n  $startDate: Date\n  $isTemplate: Boolean\n) {\n  createMealPlan(input: {mealPlan: {nameEn: $nameEn, nameFr: $nameFr, descriptionEn: $descEn, descriptionFr: $descFr, personId: $personId, tags: $tags, startDate: $startDate, isTemplate: $isTemplate}}) {\n    mealPlanEdge {\n      cursor\n      node {\n        id\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        isTemplate\n        person {\n          fullName\n          id\n        }\n        tags\n        mealPlanEntries {\n          nodes {\n            meal {\n              id\n              photoUrl\n            }\n            id\n          }\n        }\n        startDate\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73ba6fdcfb29ab3cdb913454c35dff6a";

export default node;
