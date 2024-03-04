import { graphql } from "babel-plugin-relay/macro";
import { useRefetchableFragment, useFragment } from "react-relay";
import React from "react";
import { Grid } from "@mui/material";
import { MealCard } from "./MealCard";
import { PersonFavoriteMeals_favorites$key } from "./__generated__/PersonFavoriteMeals_favorites.graphql";

export const FavoriteMealsFragment = graphql`
fragment PersonFavoriteMeals_favorites on Query
@argumentDefinitions(slug: { type: "String!" })
@refetchable(queryName: "PersonFavoriteMealsRefetchQuery") {
  gqLocalState {
    selectedFavoriteMeals
  }
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

export const FavoriteMeals = ({ favs }: { favs: PersonFavoriteMeals_favorites$key }) => {
  const PFMeals = useFragment(FavoriteMealsFragment, favs);
  const favMeals = PFMeals.people?.nodes[0].favoriteMeals.nodes;
    favMeals?.map(favMeal => {
      console.log('fav Meals', favMeal.meal);
 })
  const selectedFavs: string[] = favMeals?.map(favMeal => favMeal.meal?.rowId) || [];
  const [_, refetch] = useRefetchableFragment(FavoriteMealsFragment, favs);

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
              return <MealCard node={favMeal.meal} refetch={refetch} selectedFavs={selectedFavs}/>;
          })}
        </Grid>
      ) : (
        "No meals"
      )}
    </React.Fragment>
  )
}
