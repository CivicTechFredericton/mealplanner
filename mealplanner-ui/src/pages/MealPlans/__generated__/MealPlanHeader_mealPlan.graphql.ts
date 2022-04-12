/**
 * @generated SignedSource<<a110ddb7ada917b5febb11a25604ffd9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlanHeader_mealPlan$data = {
  readonly nameEn: string;
  readonly nameFr: string | null;
  readonly descriptionEn: string | null;
  readonly tags: ReadonlyArray<string | null> | null;
  readonly person: {
    readonly fullName: string;
  } | null;
  readonly " $fragmentType": "MealPlanHeader_mealPlan";
};
export type MealPlanHeader_mealPlan$key = {
  readonly " $data"?: MealPlanHeader_mealPlan$data;
  readonly " $fragmentSpreads": FragmentRefs<"MealPlanHeader_mealPlan">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MealPlanHeader_mealPlan",
  "selections": [
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
      "name": "tags",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Person",
      "kind": "LinkedField",
      "name": "person",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MealPlan",
  "abstractKey": null
};

(node as any).hash = "d01429117bc257fcb67af907eaefabf8";

export default node;
