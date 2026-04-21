/**
 * @generated SignedSource<<4bce839d2f05b7e1cb5f13a1d4c53708>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MealPlanHeader_mealPlan$data = {
  readonly descriptionEn: string | null | undefined;
  readonly isTemplate: boolean | null | undefined;
  readonly nameEn: string;
  readonly nameFr: string | null | undefined;
  readonly person: {
    readonly fullName: string;
    readonly rowId: any;
  } | null | undefined;
  readonly personUuid: string | null | undefined;
  readonly rowId: any;
  readonly startDate: any | null | undefined;
  readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
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
      "kind": "ScalarField",
      "name": "personUuid",
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

(node as any).hash = "e07b559ba4b20c87ea5abe1d48464b58";

export default node;
