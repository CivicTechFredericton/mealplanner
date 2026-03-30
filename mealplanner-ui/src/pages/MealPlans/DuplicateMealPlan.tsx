import { graphql } from "relay-runtime";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const duplicateMealPlanGQL = graphql`
mutation DuplicateMealPlanMutation($connections: [ID!]!, $mealPlanId: BigInt!) {
    duplicateMealPlanUuid(input: {mealplanId: $mealPlanId}) {
        mealPlanEdge @prependEdge(connections: $connections) {
            cursor
            node {
              id
              rowId
              nameEn
              nameFr
              personId
              personUuid
              descriptionEn
              descriptionFr
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
            }
          }
        }
      }
`;


export const duplicateMealPlan = (connection: string, id: string) => {
    commitMutation(environment, {
      mutation: duplicateMealPlanGQL,
      variables: {
        connections: [connection],
        mealPlanId: id.toString(),
      },
      onCompleted(response, errors) {
        console.log(response);
        console.log(errors);

      },
   });
  };
