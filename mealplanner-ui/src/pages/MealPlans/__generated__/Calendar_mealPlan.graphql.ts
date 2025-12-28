/**
 * @generated SignedSource<<42cbc5df151fd07ce8aa0c1728ef816c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Calendar_mealPlan$data = {
  readonly __id: string;
  readonly id: string;
  readonly mealPlanEntries: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly cursor: any | null | undefined;
      readonly node: {
        readonly category: CategoryT;
        readonly days: number;
        readonly id: string;
        readonly meal: {
          readonly id: string;
          readonly nameEn: string;
          readonly nameFr: string | null | undefined;
        } | null | undefined;
        readonly mealId: any;
        readonly rowId: any;
      };
    }>;
  };
  readonly rowId: any;
  readonly " $fragmentType": "Calendar_mealPlan";
};
export type Calendar_mealPlan$key = {
  readonly " $data"?: Calendar_mealPlan$data;
  readonly " $fragmentSpreads": FragmentRefs<"Calendar_mealPlan">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "mealPlanEntries"
        ]
      }
    ]
  },
  "name": "Calendar_mealPlan",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": "mealPlanEntries",
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            "CATEGORY_ASC",
            "DAYS_ASC"
          ]
        }
      ],
      "concreteType": "MealPlanEntriesConnection",
      "kind": "LinkedField",
      "name": "__Calendar_mealPlan_mealPlanEntries_connection",
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
                (v1/*: any*/),
                (v0/*: any*/),
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
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "nameEn",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "nameFr",
                      "storageKey": null
                    }
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
        (v2/*: any*/)
      ],
      "storageKey": "__Calendar_mealPlan_mealPlanEntries_connection(orderBy:[\"CATEGORY_ASC\",\"DAYS_ASC\"])"
    },
    (v2/*: any*/)
  ],
  "type": "MealPlan",
  "abstractKey": null
};
})();

(node as any).hash = "0732da0c6648f2f2352925491b12ce8f";

export default node;
