import { graphql } from "babel-plugin-relay/macro";
import { commitMutation } from "relay-runtime";
import environment from "../../relay/environment";

// const createFavoriteMealMutation = graphql`
// mutation CreateFavoriteMealMutation($connections: [ID!]!, $mealId: BigInt!) {
//   createFavoriteMeal(input: { mealId: $mealId }) {
//     favoriteMeal {
//       personId
//       mealId
//     }
//   }
// }
// `;

const favoriteMealPlanQuery = graphql`
  query FavoriteMealsQuery {
      favoriteMeals(orderBy: [CREATED_AT_DESC], first: 1000) {
        nodes {
            id
            rowId
            mealId
            userId
      }
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

