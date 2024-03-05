import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const removeFavoriteMealGQL = graphql`
mutation RemoveFavoriteMealMutation($mealIdParam: BigInt!) {
    removeFavoriteMeal(input: {mealIdParam: $mealIdParam}) {
            preflight
        }
      }
`;


export const removeFavoriteMeal = ( id:string) => {
    commitMutation(environment, {
      mutation: removeFavoriteMealGQL,
      variables: {
        mealIdParam: id.toString(),
      },
      onCompleted(response, errors) {
        console.log(response);
        console.log(errors);
      
      },
   });
  };

