/**
 * @generated SignedSource<<51c63abb7c226ddc0171801ae0d1fa9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealTagsRefetchQuery$variables = Record<PropertyKey, never>;
export type MealTagsRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MealTags_tags">;
};
export type MealTagsRefetchQuery = {
  response: MealTagsRefetchQuery$data;
  variables: MealTagsRefetchQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MealTagsRefetchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MealTags_tags"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MealTagsRefetchQuery",
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
    ]
  },
  "params": {
    "cacheID": "90fe2e40edfaecc1092afc28bac5a7bf",
    "id": null,
    "metadata": {},
    "name": "MealTagsRefetchQuery",
    "operationKind": "query",
    "text": "query MealTagsRefetchQuery {\n  ...MealTags_tags\n}\n\nfragment MealTags_tags on Query {\n  allMealTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}\n"
  }
};

(node as any).hash = "97df7621ff4ba64d426d7d0c0d4659a2";

export default node;
