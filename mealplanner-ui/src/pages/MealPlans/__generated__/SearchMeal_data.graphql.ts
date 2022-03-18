/**
 * @generated SignedSource<<94a2e454e6c936033b76e1b32e1fa458>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchMeal_data$data = {
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly rowId: any;
      readonly nameEn: string;
      readonly tags: ReadonlyArray<string | null> | null;
    }>;
  } | null;
  readonly " $fragmentType": "SearchMeal_data";
};
export type SearchMeal_data$key = {
  readonly " $data"?: SearchMeal_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchMeal_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchMeal_data",
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

(node as any).hash = "ceecf2fc689b2c5e5f1172c7bc3a82c3";

export default node;
