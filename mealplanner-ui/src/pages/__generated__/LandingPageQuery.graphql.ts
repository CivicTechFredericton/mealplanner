/**
 * @generated SignedSource<<71d6635e2d5ab3caa739746a0d45dd90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LandingPageQuery$variables = Record<PropertyKey, never>;
export type LandingPageQuery$data = {
  readonly currentPerson: {
    readonly fullName: string | null | undefined;
  } | null | undefined;
  readonly gqLocalState: {
    readonly currentUser: {
      readonly personID: any;
    } | null | undefined;
  };
};
export type LandingPageQuery = {
  response: LandingPageQuery$data;
  variables: LandingPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrentUser",
    "kind": "LinkedField",
    "name": "currentPerson",
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
            "concreteType": "CurrentLoggedInUser",
            "kind": "LinkedField",
            "name": "currentUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "personID",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LandingPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LandingPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "33d81730496514f28ad2f68ac88d790a",
    "id": null,
    "metadata": {},
    "name": "LandingPageQuery",
    "operationKind": "query",
    "text": "query LandingPageQuery {\n  currentPerson {\n    fullName\n  }\n}\n"
  }
};
})();

(node as any).hash = "b81b37ab532d53c522ad26be8a2e206c";

export default node;
