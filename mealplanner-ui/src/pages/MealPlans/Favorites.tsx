import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useRefetchableFragment, useLazyLoadQuery } from "react-relay";
import { getCurrentPerson, clearSelectedMeal, setSelectedMeal } from "../../state/state";
import { FavoriteMealsFragment } from "../Meals/PersonFavoriteMeals";
import { graphql } from "babel-plugin-relay/macro";
import { FavoritesMealPlanQuery } from "./__generated__/FavoritesMealPlanQuery.graphql";

export const Favorites: React.FC = () => {  
  const theme = useTheme();
  const slug = getCurrentPerson().personSlug;
  const combinedQuery = graphql`
    query FavoritesMealPlanQuery($slug: String!) {
      gqLocalState {
        selectedMeal {
          nameEn
          rowId
          id
        }
      }
      ...PersonFavoriteMeals_favorites @arguments(slug: $slug)
    }
  `;

  const data = useLazyLoadQuery<FavoritesMealPlanQuery>(
    combinedQuery,
    { slug: slug },
    { fetchPolicy: "store-or-network" }
  );
  const [meals] = useRefetchableFragment(FavoriteMealsFragment, data as any);
  const favMeals = meals.people?.nodes[0].favoriteMeals.nodes;
  const sortedFavMeals = (favMeals || []).slice().sort((a: any, b: any) => {
    const aName = (a?.meal?.nameEn || "").toLowerCase();
    const bName = (b?.meal?.nameEn || "").toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  });

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "10px"
        }}
      >
          <Box
            display="flex"
            flexDirection="column"
            alignItems={"flex-start"}
            bgcolor="primary.dark"
            displayPrint={"none"}
            mt={"10px"}
            borderRadius={"10px"}
            padding={"0.5rem"}
          >
            <Typography
              overflow="hidden"
              color="primary.contrastText"
              variant={"h5"}
            >
              Favorites
            </Typography>

            {data.gqLocalState?.selectedMeal?.nameEn ? (
              <Typography sx={{ color: `${theme.palette.primary.contrastText}` }}>
                {data.gqLocalState.selectedMeal.nameEn}

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ margin: "0 1em", padding: "0 0", minWidth: "2em" }}
                  onClick={(e) => {
                    e.preventDefault();
                    clearSelectedMeal();
                  }}
                >
                  x
                </Button>
              </Typography>
            ) : null}

            <Box mt={1} width="100%">
              {sortedFavMeals.map((fav: any) => {
                const meal = fav.meal;
                return (
                  <Button
                    sx={{ 
                      textTransform: "capitalize", 
                      width: "49%",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      margin: "0.2em"
                    }}
                    variant="contained"
                    color="primary"
                    key={meal.id}
                    onClick={() => {
                      setSelectedMeal(meal);
                    }}
                  >
                    <Typography fontWeight="500">{meal?.nameEn ?? 'Unnamed'}</Typography>
                    <Typography fontSize="0.8em">{meal?.tags?.join(', ')}</Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>
      </div>
    </React.Fragment>
 );
};