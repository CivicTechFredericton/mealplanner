/**
 * @generated SignedSource<<ae601404c477c72696b45a8f27ce3fab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchMeal_data$data = {
  readonly gqLocalState: {
    readonly selectedMeal: {
      readonly nameEn: string;
      readonly rowId: any;
      readonly id: string;
    } | null;
  };
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
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
};
return {
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
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
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
              "concreteType": "SelectedMeal",
              "kind": "LinkedField",
              "name": "selectedMeal",
              "plural": false,
              "selections": [
                (v2/*: any*/),
                (v1/*: any*/),
                (v0/*: any*/)
              ],
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
})();

(node as any).hash = "ccaba5f8465bcaa6876a1ff37abae17a";

export default node;
