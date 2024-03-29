/**
 * @generated SignedSource<<208f3976f6f752a50c6e64951a270980>>
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

(node as any).hash = "905eb7d4c1b3507a2867696429816eff";

export default node;
