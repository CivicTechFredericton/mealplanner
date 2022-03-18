/**
 * @generated SignedSource<<b210633009ccba84a80a5e5f3eb2255e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchMeal_meals$data = {
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly nameEn: string;
      readonly tags: ReadonlyArray<string | null> | null;
    }>;
  } | null;
  readonly " $fragmentType": "SearchMeal_meals";
};
export type SearchMeal_meals$key = {
  readonly " $data"?: SearchMeal_meals$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchMeal_meals">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchMeal_meals",
  "selections": [
    {
      "alias": null,
      "args": null,
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
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
              "name": "tags",
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

(node as any).hash = "68a05907d199bae0eb99a7c43a268a34";

export default node;
