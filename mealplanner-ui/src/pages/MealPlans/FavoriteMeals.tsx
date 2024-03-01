import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { FavoriteMealsQuery, FavoriteMealsQuery$data } from "./__generated__/FavoriteMealsQuery.graphql";
import React from "react";
import { Grid } from "@mui/material";
import { MealCard } from "../Meals/Meals";

const favoriteMealsQuery = graphql`
  query FavoriteMealsQuery($currentUserId: BigInt) {
      favoriteMeals(orderBy: [CREATED_AT_DESC], 
                    first: 1000, 
                    filter: { personId: {equalTo: $currentUserId} } ) {
        nodes {
            id
            rowId
            meal {
              rowId
              nameEn
              nameFr
              descriptionEn
              descriptionFr
              categories
              tags
              code
              photoUrl
              videoUrl
            }
      }
      }
  }
`;

export const FavoriteMeals = () => {
  
  let favMealsData = useLazyLoadQuery<FavoriteMealsQuery>(
    favoriteMealsQuery,
    {currentUserId: "1"},
    {fetchPolicy: "store-and-network"}
    )
 const favMeals = favMealsData.favoriteMeals?.nodes;
  
  return (
    <React.Fragment>
      { favMeals ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          marginTop="1rem"
          columns={4}
        >
          {favMeals.map((favMeal) => {
            if (favMeal.meal?.nameEn.toLowerCase())
              return <MealCard node={favMeal.meal} />;
          })}
        </Grid>
      ) : (
        "No meals"
      )}
    </React.Fragment>
  )
}
