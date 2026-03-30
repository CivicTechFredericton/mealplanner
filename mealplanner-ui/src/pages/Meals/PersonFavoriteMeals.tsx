import { Button, Grid, Stack, Typography } from "@mui/material";
import { graphql } from "relay-runtime";
import React from "react";
import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { useNavigate, useParams } from "react-router-dom";
import { MealCard } from "./MealCard";
import { PersonFavoriteMealsPageQuery } from "./__generated__/PersonFavoriteMealsPageQuery.graphql";
import { PersonFavoriteMeals_favorites$key } from "./__generated__/PersonFavoriteMeals_favorites.graphql";

export const FavoriteMealsFragment = graphql`
  fragment PersonFavoriteMeals_favorites on Query
  @refetchable(queryName: "PersonFavoriteMealsRefetchQuery") {
    favoriteMeals {
      nodes {
        personUuid
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

const personFavoriteMealsPageQuery = graphql`
  query PersonFavoriteMealsPageQuery($slug: String!) {
    people(filter: { slug: { equalTo: $slug } }, first: 1) {
      nodes {
        fullName
      }
    }
    ...PersonFavoriteMeals_favorites
  }
`;

export const FavoriteMealPage = () => {
  const params = useParams();
  const slug = params.slug!;
  const navigate = useNavigate();
  const data = useLazyLoadQuery<PersonFavoriteMealsPageQuery>(
    personFavoriteMealsPageQuery,
    { slug: slug },
    { fetchPolicy: "store-or-network" }
  );
  if (data && data.people?.nodes.length === 0) {
    return <h3>Person not found</h3>;
  }
  return (
    <>
      <Stack
        direction={"row"}
        margin="2em 5em"
        justifyContent={"space-between"}
      >
        <Typography variant="h4">
          Favorite meals of {data.people?.nodes[0].fullName}{" "}
        </Typography>
        <Button
          variant="outlined"
          sx={{ marginRight: "3em" }}
          onClick={() => {
            navigate("/meals");
          }}
        >
          Back to Meals
        </Button>
      </Stack>

      <FavoriteMeals favs={data} />
    </>
  );
};

export const FavoriteMeals = ({
  favs,
}: {
  favs: PersonFavoriteMeals_favorites$key;
}) => {
  const [meals, refetch] = useRefetchableFragment(FavoriteMealsFragment, favs);

  const favMeals = meals.favoriteMeals?.nodes;
  const selectedFavs: string[] =
    favMeals?.map((favMeal) => favMeal.meal?.rowId) || [];

  return (
    <React.Fragment>
      {favMeals && favMeals.length > 0 ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          marginTop="1rem"
          columns={4}
        >
          {favMeals.map((favMeal) => {
            if (favMeal.meal?.nameEn.toLowerCase())
              return (
                <MealCard
                  node={favMeal.meal}
                  refetch={refetch}
                  selectedFavs={selectedFavs}
                />
              );
          })}
        </Grid>
      ) : (
        <h3 style={{ textAlign: "center" }}>There are no favorite meals </h3>
      )}
    </React.Fragment>
  );
};
