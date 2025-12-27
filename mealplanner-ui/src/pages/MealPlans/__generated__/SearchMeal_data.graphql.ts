/**
 * @generated SignedSource<<01c41e2bfebe5f771d3e09514170f25c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchMeal_data$data = {
  readonly gqLocalState: {
    readonly selectedMeal: {
      readonly id: string;
      readonly nameEn: string;
      readonly rowId: any;
    } | null | undefined;
  };
  readonly meals: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly nameEn: string;
      readonly rowId: any;
      readonly tags: ReadonlyArray<string | null | undefined> | null | undefined;
    }>;
  } | null | undefined;
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
