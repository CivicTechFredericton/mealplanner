import { graphql } from "babel-plugin-relay/macro";
import { commitLocalUpdate, commitMutation, fetchQuery } from "relay-runtime";
import environment from "../relay/environment";
import { SearchedMeal } from "./types";
import {
  CategoryT,
  state_createMealPlanEntryMutation
} from "./__generated__/state_createMealPlanEntryMutation.graphql";
import {
  state_createMealPlanMutation,
  state_createMealPlanMutation$variables
} from "./__generated__/state_createMealPlanMutation.graphql";
import {
  state_CurrentUserQuery,
  state_CurrentUserQuery$data
} from "./__generated__/state_CurrentUserQuery.graphql";
import { state_deleteMealPlanEntryMutation } from "./__generated__/state_deleteMealPlanEntryMutation.graphql";
import { state_loginMutation, state_loginMutation$data } from "./__generated__/state_loginMutation.graphql";
import {
  state_logoutMutation,
  state_logoutMutation$data
} from "./__generated__/state_logoutMutation.graphql";
import {
  state_updateMealPlanMutation,
  state_updateMealPlanMutation$variables
} from "./__generated__/state_updateMealPlanMutation.graphql";
const STATE_ID = `client:GQLLocalState:21`;

// This initializes the local state before the app is getting loaded. Need to call in App.ts
export const initState = () => {
  // commitLocalUpdate makes changes to relay store without sending it to the network
  //Whatever is the object type in GraphQL translates to a record in Relay Store.
  // store updater is the function call that takes in store as the parameter
  // and maps the Linked Relay record to the GraphQL 'type Query'.
  commitLocalUpdate(environment, (store) => {
    const newLocalState = store.create(STATE_ID, "GQLocalState");
    const query = store.getRoot();
    query.setLinkedRecord(newLocalState, "gqLocalState");
  });
};

export const setSelectedMealPlanTags = (mpTags: string[]) => {
  commitLocalUpdate(environment, (store) => {
    const localState = store.get(STATE_ID);
    localState?.setValue(mpTags, "selectedMealPlanTags");
  })
}

export const setSelectedMealTags = (mealTags: string[]) => {
  commitLocalUpdate(environment, (store) => {
    const localState = store.get(STATE_ID);
    localState?.setValue(mealTags, "selectedMealTags");
  })
}

export const setSelectedMeal = (meal: SearchedMeal) => {
  commitLocalUpdate(environment, (store) => {
    const localState = store.get(STATE_ID);
    let mealRecord = store.get(`client:SelectedMeal:${meal.rowId}`);
    if (!mealRecord) {
      mealRecord = store.create(
        `client:SelectedMeal:${meal.rowId}`,
        "SelectedMeal"
      );
      mealRecord.setValue(meal.nameEn, "nameEn");
      mealRecord.setValue(meal.rowId, "rowId");
    }
    localState?.setLinkedRecord(mealRecord, "selectedMeal");
  });
};

export const clearSelectedMeal = () => {
  commitLocalUpdate(environment, (store) => {
    const localState = store.get(STATE_ID);
    localState?.setValue(null, "selectedMeal");
  });
};

//For appending edges referred this https://relay.dev/docs/guided-tour/list-data/updating-connections/#adding-edges
const createMealPlanEntry = graphql`
  mutation state_createMealPlanEntryMutation(
    $connections: [ID!]!
    $category: CategoryT!
    $days: Int!
    $mealPlanId: BigInt!
    $mealId: BigInt!
  ) {
    createMealPlanEntry(
      input: {
        mealPlanEntry: {
          category: $category
          days: $days
          mealPlanId: $mealPlanId
          mealId: $mealId
        }
      }
    ) {
      # We used appendEdge to automatically reload when a change occurs in the underlying relay store.
      mealPlanEntryEdge @appendEdge(connections: $connections) {
        cursor
        node {
          id
          rowId
          days
          category
          mealId
          meal {
            id
            rowId
            nameEn
          }
        }
      }
    }
  }
`;

export const addMealToPlan = (
  connectionID: string,
  mealplanId: number,
  category: CategoryT,
  days: number
) => {
  let source = environment.getStore().getSource();
  let localState: any = source.get(STATE_ID);
  if (!localState.selectedMeal) {
    return;
  }
  let mealId = source.get(localState.selectedMeal.__ref)!["rowId"];
  let vars = {
    mealPlanId: mealplanId.toString(),
    category: category,
    days: days,
    mealId: mealId.toString(),
    connections: [connectionID],
  };

  commitMutation<state_createMealPlanEntryMutation>(environment, {
    mutation: createMealPlanEntry,
    variables: vars,
    onCompleted: (resp) => {
      // clearSelectedMeal();
      console.log(`done with vars`, vars);
    },
  });
};

//delete meal plan entry graphql
const deleteMealPlanEntry = graphql`
  mutation state_deleteMealPlanEntryMutation(
    $connections: [ID!]!
    $mpeId: BigInt!
  ) {
    deleteMealPlanEntry(input: { rowId: $mpeId }) {
      mealPlanEntryEdge {
        cursor
        node {
          id @deleteEdge(connections: $connections)
          rowId
        }
      }
    }
  }
`;

// delete meal plan entry function calls commit mutation
export const deleteMealFromPlan = (connectionID: string, mpeId: number) => {
  //let source = environment.getStore().getSource();
  //let localState: any = source.get(STATE_ID);
  commitMutation<state_deleteMealPlanEntryMutation>(environment, {
    mutation: deleteMealPlanEntry,
    variables: {
      connections: [connectionID],
      mpeId: mpeId.toString(),
    },
    onCompleted: (resp) => {
      console.log(
        `deleted meal plan entry ${resp.deleteMealPlanEntry?.mealPlanEntryEdge?.node.rowId}`
      );
    },
  });
};

const currentUserQuery = graphql`
  query state_CurrentUserQuery {
    currentPerson {
      rowId
      email
      fullName
      role
      slug
    }
  }
`;

export const fetchCurrentPerson = async () => {
  let data = await fetchQuery<state_CurrentUserQuery>(
    environment,
    currentUserQuery,
    {}
  ).toPromise();
  setCurrentUser(data);
  return data;
};

function setCurrentUser(data: state_CurrentUserQuery$data | undefined) {
  if (data?.currentPerson) {
    commitLocalUpdate(environment, (store) => {
      let localState = store.get(STATE_ID);
      store.delete("client:currentUser");
      let record = store.create("client:currentUser", "CurrentLoggedInUser");
      record.setValue(data?.currentPerson?.rowId, "personID");
      record.setValue(data?.currentPerson?.fullName, "personName");
      record.setValue(data?.currentPerson?.role, "personRole");
      record.setValue(data.currentPerson?.slug, "personSlug");
      localState?.setLinkedRecord(record, "currentUser");
    });
  }
}

const loginMutation = graphql`
  mutation state_loginMutation($userEmail: String!, $password: String!) {
    authenticate(input: { userEmail: $userEmail, password: $password }) {
      jwtToken {
        role
        personId
      }
    }
  }
`;

export const login = async (username: string, password: string) => {
  return new Promise<state_loginMutation$data>((res, rej) => {
    commitMutation<state_loginMutation>(environment, {
      mutation: loginMutation,
      variables: {
        userEmail: username,
        password: password,
      },
      onCompleted: (resp) => {
        if (resp.authenticate != null && resp.authenticate.jwtToken != null) {
          fetchCurrentPerson();
          res(resp);
        }
        else {
          console.log('resp:', resp);
          rej('invalid user credentials');
        }
      },
    });
  })
};

const logoutMutation = graphql`
  mutation state_logoutMutation {
    logout {
      status
    }
  }
`;

export const logout = async () => {
  return new Promise<state_logoutMutation$data>((res, rej) => {
    commitMutation<state_logoutMutation>(environment, {
      mutation: logoutMutation,
      variables: {},
      onCompleted: (resp) => {
        if (resp.logout != null && resp.logout.status != null) {
          commitLocalUpdate(environment, (store) => {
            store.delete("client:currentUser");
            res(resp);
          });
        } else {
          rej("unable to logout");
        }
      },
    });
  });
};

export const getCurrentPerson = (): {
  personID: string;
  personName: string;
  personRole: string;
  personSlug: string;
} => {
  const store = environment.getStore();
  let record = store.getSource().get("client:currentUser");
  if (record === null || record === undefined) {
    return { personID: "", personName: "",personRole: "", personSlug: "" };
  }
  return {
    personID: record["personID"].toString(),
    personName: record["personName"].toString(),
    personRole: record["personRole"].toString(),
    personSlug: record["personSlug"].toString(),
  };
};

const updateMealPlan = graphql`
  mutation state_updateMealPlanMutation(
    $mealPlanId: BigInt!
    $mealPlanName: String
    $descriptionEn: String
    $personId: BigInt
    $tags: [String]
  ) {
    updateMealPlan(
      input: {
        patch: {
          nameEn: $mealPlanName
          descriptionEn: $descriptionEn
          personId: $personId
          tags: $tags
        }
        rowId: $mealPlanId
      }
    ) {
      mealPlan {
        id
        rowId
        nameEn
        descriptionEn
        personId
        tags
        ...MealPlanHeader_mealPlan
      }
    }
  }
`;

type updateMealPlanInput = state_updateMealPlanMutation$variables;

export const updateMealPlanName = (
  mpId: number,
  input: updateMealPlanInput
) => {
  commitMutation<state_updateMealPlanMutation>(environment, {
    mutation: updateMealPlan,
    variables: input,
    onCompleted: (resp) => {
      console.log(
        `edit meal plan details ${resp.updateMealPlan?.mealPlan?.nameEn}`
      );
    },
  });
};

const createMealPlanGQL = graphql`
  mutation state_createMealPlanMutation(
    $nameEn: String!
    $nameFr: String
    $descEn: String
    $descFr: String
    $personId: BigInt
    $tags: [String]
    $startdate: String
    $connections: [ID!]!
    $isTemplate: Boolean
  ) {
    createMealPlan(
      input: {
        mealPlan: {
          nameEn: $nameEn
          nameFr: $nameFr
          descriptionEn: $descEn
          descriptionFr: $descFr
          personId: $personId
          tags: $tags
          startdate: $startdate
          isTemplate: $isTemplate
        }
      }
    ) {
      mealPlanEdge @prependEdge(connections: $connections) {
        cursor
        node {
          id
          rowId
          nameEn
          nameFr
          descriptionEn
          descriptionFr
          isTemplate
          person {
            fullName
          }
          tags
          mealPlanEntries {
            nodes {
              meal {
                id
                photoUrl
              }
            }
          }
          startdate
        }
      }
    }
  }
`;

type createMealPlanInput = state_createMealPlanMutation$variables;

export const createMealPlan = (input: createMealPlanInput) => {
  return new Promise((res, rej) => {
    commitMutation<state_createMealPlanMutation>(environment, {
      mutation: createMealPlanGQL,
      variables: input,
      onCompleted: (response) => {
        console.log(
          JSON.stringify(response.createMealPlan?.mealPlanEdge?.node)
        );
        res(response.createMealPlan?.mealPlanEdge?.node);
      },
      onError: (error) => {
        console.log(error);
        rej(error);
      },
    });
  });
};
