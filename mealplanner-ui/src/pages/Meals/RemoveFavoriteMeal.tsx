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
  return new Promise((res, rej) => {
    commitMutation(environment, {
      mutation: removeFavoriteMealGQL,
      variables: {
        mealIdParam: id.toString(),
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
