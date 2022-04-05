/**
 * @generated SignedSource<<baa4e49e63bdc19315b91b071a8602a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlanQuery$variables = {
  id: any;
};
export type MealPlanQuery$data = {
  readonly mealPlan: {
    readonly nameEn: string;
    readonly nameFr: string | null;
    readonly descriptionEn: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"Calendar_mealPlan">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SearchMeal_data">;
};
export type MealPlanQuery = {
  variables: MealPlanQuery$variables;
  response: MealPlanQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "rowId",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameEn",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nameFr",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "descriptionEn",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      "CATEGORY_ASC",
      "DAYS_ASC"
    ]
  }
],
v8 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MealPlanQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SearchMeal_data"
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Calendar_mealPlan"
          }
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
    "name": "MealPlanQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MealsConnection",
        "kind": "LinkedField",
        "name": "meals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Meal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tags",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQLocalState",
            "kind": "LinkedField",
            "name": "gqLocalState",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SelectedMeal",
                "kind": "LinkedField",
                "name": "selectedMeal",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MealPlan",
        "kind": "LinkedField",
        "name": "mealPlan",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "MealPlanEntriesConnection",
            "kind": "LinkedField",
            "name": "mealPlanEntries",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MealPlanEntriesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MealPlanEntry",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "category",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mealId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "days",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Meal",
                        "kind": "LinkedField",
                        "name": "meal",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "mealPlanEntries(first:1000,orderBy:[\"CATEGORY_ASC\",\"DAYS_ASC\"])"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "orderBy"
            ],
            "handle": "connection",
            "key": "Calendar_mealPlan_mealPlanEntries",
            "kind": "LinkedHandle",
            "name": "mealPlanEntries"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a2bf3ec490c5c7a95bf17a1c210e086a",
    "id": null,
    "metadata": {},
    "name": "MealPlanQuery",
    "operationKind": "query",
    "text": "query MealPlanQuery(\n  $id: BigInt!\n) {\n  ...SearchMeal_data\n  mealPlan(rowId: $id) {\n    nameEn\n    nameFr\n    descriptionEn\n    ...Calendar_mealPlan\n    id\n  }\n}\n\nfragment Calendar_mealPlan on MealPlan {\n  rowId\n  id\n  mealPlanEntries(orderBy: [CATEGORY_ASC, DAYS_ASC], first: 1000) {\n    edges {\n      cursor\n      node {\n        id\n        rowId\n        category\n        mealId\n        days\n        meal {\n          id\n          nameEn\n          nameFr\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SearchMeal_data on Query {\n  meals {\n    nodes {\n      id\n      rowId\n      nameEn\n      tags\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae847118fd5fd50d078a67901aabbf37";

export default node;
