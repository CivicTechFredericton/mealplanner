import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const deleteMealPlanGQL = graphql`
  mutation DeleteMealPlanMutation($connections: [ID!]!, $mealPlanId: BigInt!) {
    deleteMealPlan(input: { rowId: $mealPlanId }) {
      mealPlanEdge {
        cursor
        node {
          id @deleteEdge(connections: $connections)
          rowId
          nameEn
        }
      }
    }
  }
`;

export const deleteMealPlan = (connection: string, id: string) => {
  return new Promise((res, rej) => {
    commitMutation(environment, {
      mutation: deleteMealPlanGQL,
      variables: {
        connections: [connection],
        mealPlanId: id.toString(),
      },
      onCompleted(response, errors) {
        if (!errors) {
          res(response);
          return;
        }
        rej(errors);
      },
    });
  });
  
};
