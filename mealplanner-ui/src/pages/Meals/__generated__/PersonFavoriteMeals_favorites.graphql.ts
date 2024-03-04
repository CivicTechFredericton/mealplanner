/**
 * @generated SignedSource<<f8cd75068c6ad5148afc2199cb16b3b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type CategoryT = "BREAKFAST" | "DINNER" | "LUNCH" | "SNACK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PersonFavoriteMeals_favorites$data = {
  readonly gqLocalState: {
    readonly selectedFavoriteMeals: ReadonlyArray<string> | null | undefined;
  };
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly favoriteMeals: {
        readonly nodes: ReadonlyArray<{
          readonly meal: {
            readonly categories: ReadonlyArray<CategoryT | null | undefined> | null | undefined;
            readonly code: string | null | undefined;
            readonly descriptionEn: string | null | undefined;
            readonly descriptionFr: string | null | undefined;
            readonly nameEn: string;
            readonly nameFr: string | null | undefined;
            readonly photoUrl: string | null | undefined;
            readonly rowId: any;
            readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
            readonly videoUrl: string | null | undefined;
          } | null | undefined;
        }>;
      };
    }>;
  } | null | undefined;
  readonly " $fragmentType": "PersonFavoriteMeals_favorites";
};
export type PersonFavoriteMeals_favorites$key = {
  readonly " $data"?: PersonFavoriteMeals_favorites$data;
  readonly " $fragmentSpreads": FragmentRefs<"PersonFavoriteMeals_favorites">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "slug"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./PersonFavoriteMealsRefetchQuery.graphql')
    }
  },
  "name": "PersonFavoriteMeals_favorites",
  "selections": [
    {
      "alias": null,
      "args": [
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
          "storageKey": null
        }
      ],
      "storageKey": null
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
              "name": "selectedFavoriteMeals",
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

(node as any).hash = "ed7cd897fa668b44d236208f6198e3ff";

export default node;
