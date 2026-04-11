/**
 * @generated SignedSource<<8213d6877a6d2260796b99a8ba686320>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMeals_favorites$data = {
  readonly favoriteMeals: {
    readonly nodes: ReadonlyArray<{
      readonly meal: {
        readonly categories: ReadonlyArray<CategoryT | null | undefined> | null | undefined;
        readonly code: any | null | undefined;
        readonly descriptionEn: string | null | undefined;
        readonly descriptionFr: string | null | undefined;
        readonly nameEn: string;
        readonly nameFr: string | null | undefined;
        readonly photoUrl: string | null | undefined;
        readonly rowId: any;
        readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
        readonly videoUrl: string | null | undefined;
      } | null | undefined;
      readonly personUuid: string | null | undefined;
    }>;
  } | null | undefined;
  readonly " $fragmentType": "PersonFavoriteMeals_favorites";
};
export type PersonFavoriteMeals_favorites$key = {
  readonly " $data"?: PersonFavoriteMeals_favorites$data;
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};

import PersonFavoriteMealsRefetchQuery_graphql from './PersonFavoriteMealsRefetchQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "condition"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": PersonFavoriteMealsRefetchQuery_graphql
    }
  },
  "name": "PersonFavoriteMeals_favorites",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "condition",
          "variableName": "condition"
        }
      ],
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "b5a9e73d1fb21ff4573452234cc9d73a";

export default node;
