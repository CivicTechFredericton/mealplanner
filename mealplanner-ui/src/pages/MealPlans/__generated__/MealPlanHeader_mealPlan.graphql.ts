/**
 * @generated SignedSource<<08268e2dd9edf6efc63f00f860e5634e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlanHeader_mealPlan$data = {
  readonly rowId: any;
  readonly nameEn: string;
  readonly nameFr: string | null;
  readonly descriptionEn: string | null;
  readonly tags: ReadonlyArray<string | null> | null;
  readonly isTemplate: boolean | null;
  readonly startDate: any | null;
  readonly person: {
    readonly fullName: string;
    readonly rowId: any;
  } | null;
  readonly " $fragmentType": "MealPlanHeader_mealPlan";
};
export type MealPlanHeader_mealPlan$key = {
  readonly " $data"?: MealPlanHeader_mealPlan$data;
  readonly " $fragmentSpreads": FragmentRefs<"MealPlanHeader_mealPlan">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rowId",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MealPlanHeader_mealPlan",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "isTemplate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDate",
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
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "MealPlan",
  "abstractKey": null
};
})();

(node as any).hash = "b0cbb22caadc72394d86e5b66de33ece";

export default node;
