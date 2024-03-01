/**
 * @generated SignedSource<<7a58edcf14ed094536bfa2cc0e0a6578>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlansTags_tags$data = {
  readonly gqLocalState: {
    readonly selectedMealPlanTags: ReadonlyArray<string> | null;
  };
  readonly allMealPlanTags: {
    readonly edges: ReadonlyArray<{
      readonly node: string | null;
    }>;
  } | null;
  readonly " $fragmentType": "MealPlansTags_tags";
};
export type MealPlansTags_tags$key = {
  readonly " $data"?: MealPlansTags_tags$data;
  readonly " $fragmentSpreads": FragmentRefs<"MealPlansTags_tags">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./MealPlansTagsRefetchQuery.graphql')
    }
  },
  "name": "MealPlansTags_tags",
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
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "3511bb24130d79d02ff559004c9b7492";

export default node;
