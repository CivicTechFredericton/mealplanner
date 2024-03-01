/**
 * @generated SignedSource<<c634920cfebd8f560eea5e9750914240>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlansTagsRefetchQuery$variables = {};
export type MealPlansTagsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MealPlansTags_tags">;
};
export type MealPlansTagsRefetchQuery = {
  variables: MealPlansTagsRefetchQuery$variables;
  response: MealPlansTagsRefetchQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MealPlansTagsRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MealPlansTags_tags"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MealPlansTagsRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 100
          }
        ],
        "concreteType": "AllMealPlanTagsConnection",
        "kind": "LinkedField",
        "name": "allMealPlanTags",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AllMealPlanTagEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "node",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "allMealPlanTags(first:100)"
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
                "kind": "ScalarField",
                "name": "selectedMealPlanTags",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "17379b146ec46e9b2f502cd8bfe3a545",
    "id": null,
    "metadata": {},
    "name": "MealPlansTagsRefetchQuery",
    "operationKind": "query",
    "text": "query MealPlansTagsRefetchQuery {\n  ...MealPlansTags_tags\n}\n\nfragment MealPlansTags_tags on Query {\n  allMealPlanTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}\n"
  }
};

(node as any).hash = "3511bb24130d79d02ff559004c9b7492";

export default node;
