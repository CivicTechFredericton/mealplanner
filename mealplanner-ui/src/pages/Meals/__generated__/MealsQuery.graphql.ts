/**
 * @generated SignedSource<<cfb8ec032e2e32784428e0a0387e651b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CategoryT = "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK" | "%future added value";
export type MealsQuery$variables = Record<PropertyKey, never>;
export type MealsQuery$data = {
  readonly gqLocalState: {
    readonly selectedMealTags: ReadonlyArray<string> | null | undefined;
  };
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly categories: ReadonlyArray<CategoryT | null | undefined> | null | undefined;
      readonly code: string;
      readonly descriptionEn: string | null | undefined;
      readonly descriptionFr: string | null | undefined;
      readonly nameEn: string;
      readonly nameFr: string | null | undefined;
      readonly photoUrl: string | null | undefined;
      readonly rowId: any;
      readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
      readonly videoUrl: string | null | undefined;
    }>;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"MealTags_tags">;
};
export type MealsQuery = {
  response: MealsQuery$data;
  variables: MealsQuery$variables;
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
  "name": "code",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoUrl",
  "storageKey": null
},
v11 = {
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
              (v9/*: any*/),
              (v10/*: any*/)
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
      (v11/*: any*/)
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
              (v10/*: any*/),
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
      (v11/*: any*/)
    ]
  },
  "params": {
    "cacheID": "b149ff8b3d1086e08138a1a3d52387d5",
    "id": null,
    "metadata": {},
    "name": "MealsQuery",
    "operationKind": "query",
    "text": "query MealsQuery {\n  meals(orderBy: [ID_DESC], first: 1000) {\n    nodes {\n      rowId\n      nameEn\n      nameFr\n      descriptionEn\n      descriptionFr\n      categories\n      tags\n      code\n      photoUrl\n      videoUrl\n      id\n    }\n  }\n  ...MealTags_tags\n}\n\nfragment MealTags_tags on Query {\n  allMealTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "53d8f93b61dc92a420009b86c5baff5a";

export default node;
