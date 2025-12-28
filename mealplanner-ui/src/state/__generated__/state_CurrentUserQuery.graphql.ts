/**
 * @generated SignedSource<<298bf71dc1b4d59c61412e4ea9640f0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type state_CurrentUserQuery$variables = Record<PropertyKey, never>;
export type state_CurrentUserQuery$data = {
  readonly currentPerson: {
    readonly email: string | null | undefined;
    readonly fullName: string | null | undefined;
    readonly role: string | null | undefined;
    readonly rowId: any | null | undefined;
    readonly slug: string | null | undefined;
    readonly termsAndConditions: boolean | null | undefined;
  } | null | undefined;
};
export type state_CurrentUserQuery = {
  response: state_CurrentUserQuery$data;
  variables: state_CurrentUserQuery$variables;
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
        "name": "rowId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fullName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "role",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "termsAndConditions",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "state_CurrentUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "state_CurrentUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b8b7a697457d129d3def38ffbcafb2b7",
    "id": null,
    "metadata": {},
    "name": "state_CurrentUserQuery",
    "operationKind": "query",
    "text": "query state_CurrentUserQuery {\n  currentPerson {\n    rowId\n    email\n    fullName\n    role\n    slug\n    termsAndConditions\n  }\n}\n"
  }
};
})();

(node as any).hash = "157c1caae85531b49b3453906b429cad";

export default node;
