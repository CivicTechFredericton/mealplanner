/**
 * @generated SignedSource<<c4d26ca683518dcc4dbacee1a37810fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryT = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "%future added value";
export type MealsQuery$variables = {};
export type MealsQuery$data = {
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly rowId: any;
      readonly nameEn: string;
      readonly nameFr: string | null;
      readonly descriptionEn: string | null;
      readonly descriptionFr: string | null;
      readonly categories: ReadonlyArray<CategoryT | null> | null;
      readonly tags: ReadonlyArray<string | null> | null;
      readonly photoUrl: string | null;
      readonly videoUrl: string | null;
    }>;
  } | null;
  readonly gqLocalState: {
    readonly selectedMealTags: ReadonlyArray<string> | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MealTags_tags">;
};
export type MealsQuery = {
  variables: MealsQuery$variables;
  response: MealsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      "ID_DESC"
    ]
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
},
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
  "name": "descriptionFr",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categories",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tags",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoUrl",
  "storageKey": null
},
v10 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "meals(first:1000,orderBy:[\"ID_DESC\"])"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MealTags_tags"
      },
      (v10/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MealsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "meals(first:1000,orderBy:[\"ID_DESC\"])"
      },
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
      (v10/*: any*/)
    ]
  },
  "params": {
    "cacheID": "231f5758b2be7731d819ff6bcc627c6b",
    "id": null,
    "metadata": {},
    "name": "MealsQuery",
    "operationKind": "query",
    "text": "query MealsQuery {\n  meals(orderBy: [ID_DESC], first: 1000) {\n    nodes {\n      rowId\n      nameEn\n      nameFr\n      descriptionEn\n      descriptionFr\n      categories\n      tags\n      photoUrl\n      videoUrl\n      id\n    }\n  }\n  ...MealTags_tags\n}\n\nfragment MealTags_tags on Query {\n  allMealTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b25ff9b9842828d3b3e0193ff20195d";

export default node;
