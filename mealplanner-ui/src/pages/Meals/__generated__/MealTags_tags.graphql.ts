/**
 * @generated SignedSource<<72218c9242b191257a80348b3e262521>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealTags_tags$data = {
  readonly allMealTags: {
    readonly edges: ReadonlyArray<{
      readonly node: string | null | undefined;
    }>;
  } | null | undefined;
  readonly gqLocalState: {
    readonly selectedMealTags: ReadonlyArray<string> | null | undefined;
  };
  readonly " $fragmentType": "MealTags_tags";
};
export type MealTags_tags$key = {
  readonly " $data"?: MealTags_tags$data;
  readonly " $fragmentSpreads": FragmentRefs<"MealTags_tags">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./MealTagsRefetchQuery.graphql')
    }
  },
  "name": "MealTags_tags",
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
      "concreteType": "AllMealTagsConnection",
      "kind": "LinkedField",
      "name": "allMealTags",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AllMealTagEdge",
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
      "storageKey": "allMealTags(first:100)"
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
              "name": "selectedMealTags",
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

(node as any).hash = "97df7621ff4ba64d426d7d0c0d4659a2";

export default node;
