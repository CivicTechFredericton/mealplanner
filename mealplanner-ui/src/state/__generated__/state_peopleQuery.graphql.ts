/**
 * @generated SignedSource<<8702d815871cfa6544c732380c419e59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RoleType = "APP_USER" | "APP_MEAL_DESIGNER" | "APP_ADMIN" | "%future added value";
export type state_peopleQuery$variables = {};
export type state_peopleQuery$data = {
  readonly people: {
    readonly nodes: ReadonlyArray<{
      readonly fullName: string;
      readonly rowId: any;
      readonly slug: string;
      readonly role: RoleType;
    }>;
  } | null;
};
export type state_peopleQuery = {
  variables: state_peopleQuery$variables;
  response: state_peopleQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
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
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_peopleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "state_peopleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "86bb93f2f61bc402dda2493c3a7ed348",
    "id": null,
    "metadata": {},
    "name": "state_peopleQuery",
    "operationKind": "query",
    "text": "query state_peopleQuery {\n  people {\n    nodes {\n      fullName\n      rowId\n      slug\n      role\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "63250dbd475aceeff6106e4cf131f27e";

export default node;
