/**
 * @generated SignedSource<<97d22d9de81e840f35e45f8ddb56d1b0>>
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
  startdate?: string | null;
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
        readonly startdate: string | null;
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
  "name": "startdate"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tags"
},
v8 = [
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
            "name": "startdate",
            "variableName": "startdate"
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionFr",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "Meal",
  "kind": "LinkedField",
  "name": "meal",
  "plural": false,
  "selections": [
    (v10/*: any*/),
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
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startdate",
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
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_createMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
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
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlan",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v17/*: any*/),
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
                          (v18/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/)
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
      (v5/*: any*/),
      (v7/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "state_createMealPlanMutation",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
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
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlan",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Person",
                    "kind": "LinkedField",
                    "name": "person",
                    "plural": false,
                    "selections": [
                      (v16/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v17/*: any*/),
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
                          (v18/*: any*/),
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/)
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
    "cacheID": "1bc1f6cae71c4b84aa69a4e261221c96",
    "id": null,
    "metadata": {},
    "name": "state_createMealPlanMutation",
    "operationKind": "mutation",
    "text": "mutation state_createMealPlanMutation(\n  $nameEn: String!\n  $nameFr: String\n  $descEn: String\n  $descFr: String\n  $personId: BigInt\n  $tags: [String]\n  $startdate: String\n) {\n  createMealPlan(input: {mealPlan: {nameEn: $nameEn, nameFr: $nameFr, descriptionEn: $descEn, descriptionFr: $descFr, personId: $personId, tags: $tags, startdate: $startdate}}) {\n    mealPlanEdge {\n      cursor\n      node {\n        id\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        person {\n          fullName\n          id\n        }\n        tags\n        mealPlanEntries {\n          nodes {\n            meal {\n              id\n              photoUrl\n            }\n            id\n          }\n        }\n        startdate\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1bf7a882304700e4b3f5029f4f93ed1e";

export default node;
