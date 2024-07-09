import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const duplicateMealPlanGQL = graphql`
mutation DuplicateMealPlanMutation($connections: [ID!]!, $mealPlanId: BigInt!, $personId:BigInt!, $duplicateNameEn:String!) {
    duplicateMealPlan(input: {mealplanId: $mealPlanId, pId: $personId, dupNameEn: $duplicateNameEn}) {
        mealPlanEdge @prependEdge(connections: $connections) {
            cursor
            node {
              id
              rowId
              nameEn
              nameFr
              personId
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


export const duplicateMealPlan = (connection: string, id:string, pId:string, dupNameEn:string) => {
    commitMutation(environment, {
      mutation: duplicateMealPlanGQL,
      variables: {
        connections: [connection],
        mealPlanId: id.toString(),
        personId: pId.toString(),
        duplicateNameEn: dupNameEn.toString(),
      },
      onCompleted(response, errors) {
        console.log(response);
        console.log(errors);
      
      },
   });
  };

