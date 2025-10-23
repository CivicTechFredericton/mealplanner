import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
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
  const favMeals = meals.people?.nodes[0].favoriteMeals.nodes || [];

  let [searchText, setSearchText] = useState("");
  let search = (searchText: string) => {
    const mapped = favMeals
      .map((f: any) => f.meal)
      .filter((m: any) => m != null);

    let sortedMeals = mapped.slice().sort((a: any, b: any) => {
      const aName = (a?.nameEn || "").toLowerCase();
      const bName = (b?.nameEn || "").toLowerCase();
      if (aName < bName) return -1;
      if (aName > bName) return 1;
      return 0;
    });

    if (searchText === "") {
      return sortedMeals;
    }
    return sortedMeals.filter((m: any) =>
      (m.nameEn || "").match(new RegExp(searchText, "i"))
    );
  };

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

            <FormControl
              variant="filled"
              sx={{ width: "99%", color: `${theme.palette.primary.contrastText}` }}
            >
              <InputLabel sx={{ color: `${theme.palette.primary.contrastText}` }}>
                Search for meals
              </InputLabel>
              <OutlinedInput
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: `${theme.palette.primary.contrastText}`,
                }}
                notched={false}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon htmlColor={theme.palette.primary.contrastText} />
                  </InputAdornment>
                }
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </FormControl>

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
              {/* {sortedFavMeals.map((fav: any) => {
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
              })} */}
              {
                search(searchText).map((m: any) => {
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
                    key={m.id ?? m.rowId}
                    onClick={() => {
                      setSelectedMeal(m);
                    }}
                  >
                    <Typography fontWeight={"500"}>{m.nameEn ?? "Unnamed"} </Typography>
                    <Typography fontSize={"0.8em"}>{m.tags?.join(", ")}</Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>
      </div>
    </React.Fragment>
 );
};