import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import React from "react";
import { Grid } from "@mui/material";
import { MealCard } from "./MealCard";
import { useParams } from "react-router-dom";
import { PersonFavoriteMealsQuery } from "./__generated__/PersonFavoriteMealsQuery.graphql";

const favoriteMealsQuery = graphql`
  query PersonFavoriteMealsQuery($slug: String!){
  people (
    filter: {slug: {equalTo: $slug}}, 
    first: 1
  ) 
  {
    nodes {
      favoriteMeals {
        nodes {
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
  }
}
`;

export const FavoriteMeals = () => {
  const params = useParams();
  let favMealsData = useLazyLoadQuery<PersonFavoriteMealsQuery>(
    favoriteMealsQuery,
    {slug: params.slug as string},
    {fetchPolicy: "store-and-network"}
    )
    console.log("favorites",favMealsData);
    const favMeals = favMealsData.people?.nodes[0].favoriteMeals.nodes;
    favMeals?.map(favMeal => {
      console.log('fav Meals', favMeal.meal);
 })

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
