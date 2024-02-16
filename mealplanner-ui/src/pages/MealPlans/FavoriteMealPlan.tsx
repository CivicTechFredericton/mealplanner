import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

const favoriteMealPlanQuery = graphql`
query FavoriteMealPlanQuery {
  favoriteMealPlan {
    meal_id
    user_id
  }
}
`;



export const favoriteMealPlan = () => {
//     commitMutation(environment, {
//       mutation: favoriteMealPlanGQL,
//       variables: {
//         connections: [connection],
//         mealPlanId: id.toString(),
//       },
//       onCompleted(response, errors) {
//         console.log(response);
//         console.log(errors);
      
//       },
//    });
console.log("Favorites is called");
  };

