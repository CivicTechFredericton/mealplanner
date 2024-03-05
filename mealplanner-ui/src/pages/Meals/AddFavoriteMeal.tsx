import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const addFavoriteMealGQL = graphql`
mutation AddFavoriteMealMutation($mealIdParam: BigInt!) {
    addFavoriteMeal(input: {mealIdParam: $mealIdParam}) {
          preflight
        }
      }
`;


export const addFavoriteMeal = (id:string) => {
    commitMutation(environment, {
      mutation: addFavoriteMealGQL,
      variables: {
        mealIdParam: id.toString(),
      },
      onCompleted(response, errors) {
        console.log(response);
        console.log(errors);
      
      },
   });
  };

