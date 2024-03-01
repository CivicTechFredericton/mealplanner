/**
 * @generated SignedSource<<fd1afa085b409d6e60f2ba71919820e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
  "metadata": null,
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

(node as any).hash = "77d5522adf80567a53a300e40d8e1dcf";

export default node;
