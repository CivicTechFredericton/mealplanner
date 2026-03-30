/**
 * @generated SignedSource<<6d485d1d7ae4562e8a6779f2ab40265b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMealsPageQuery$variables = {
  slug: string;
};
export type PersonFavoriteMealsPageQuery$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly fullName: string;
    }>;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};
export type PersonFavoriteMealsPageQuery = {
  response: PersonFavoriteMealsPageQuery$data;
  variables: PersonFavoriteMealsPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "equalTo",
            "variableName": "slug"
          }
        ],
        "kind": "ObjectValue",
        "name": "slug"
      }
    ],
    "kind": "ObjectValue",
    "name": "filter"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PersonFavoriteMealsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PeopleConnection",
        "kind": "LinkedField",
        "name": "people",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "PersonFavoriteMeals_favorites"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PersonFavoriteMealsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PeopleConnection",
        "kind": "LinkedField",
        "name": "people",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "FavoriteMealsConnection",
        "kind": "LinkedField",
        "name": "favoriteMeals",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FavoriteMeal",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "personUuid",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "rowId",
                    "storageKey": null
                  },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "descriptionEn",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "descriptionFr",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "categories",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tags",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "photoUrl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "videoUrl",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e7794740b4d3f31f75cfe474970a63a",
    "id": null,
    "metadata": {},
    "name": "PersonFavoriteMealsPageQuery",
    "operationKind": "query",
    "text": "query PersonFavoriteMealsPageQuery(\n  $slug: String!\n) {\n  people(filter: {slug: {equalTo: $slug}}, first: 1) {\n    nodes {\n      fullName\n      id\n    }\n  }\n  ...PersonFavoriteMeals_favorites\n}\n\nfragment PersonFavoriteMeals_favorites on Query {\n  favoriteMeals {\n    nodes {\n      personUuid\n      meal {\n        rowId\n        nameEn\n        nameFr\n        descriptionEn\n        descriptionFr\n        categories\n        tags\n        code\n        photoUrl\n        videoUrl\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b07b0afa557513b4ad224349b6590023";

export default node;
