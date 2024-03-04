/**
 * @generated SignedSource<<2402e5bbc5b7cd8ee62da53fa5263e56>>
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
  readonly allMealTags: {
    readonly edges: ReadonlyArray<{
      readonly node: string | null;
    }>;
  } | null;
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
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 10
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
  "storageKey": "allMealTags(first:10)"
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
      (v11/*: any*/)
    ]
  },
  "params": {
    "cacheID": "d671063f5586b491ffcd3913b199e9c1",
    "id": null,
    "metadata": {},
    "name": "MealsQuery",
    "operationKind": "query",
    "text": "query MealsQuery {\n  meals(orderBy: [ID_DESC], first: 1000) {\n    nodes {\n      rowId\n      nameEn\n      nameFr\n      descriptionEn\n      descriptionFr\n      categories\n      tags\n      code\n      photoUrl\n      videoUrl\n      id\n    }\n  }\n  allMealTags(first: 10) {\n    edges {\n      node\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c614abe3034413feeb361f859e1e3557";

export default node;
