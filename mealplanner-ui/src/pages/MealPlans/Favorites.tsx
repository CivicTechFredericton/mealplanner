import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
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
  // Fetch favorite meals for current person
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

  // Load list of favorite meals and meal tags
  const data = useLazyLoadQuery<FavoritesMealPlanQuery>(
    combinedQuery,
    { slug: slug },
    { fetchPolicy: "store-or-network" }
  );
  const [meals] = useRefetchableFragment(FavoriteMealsFragment, data as any);
  const favMeals = meals.people?.nodes[0].favoriteMeals.nodes || [];
  const favMealTags: string[] = Array.from(
    new Set(
      (favMeals || []).flatMap((f: any) => f?.meal?.tags || [])
    )
  );

  let [searchText, setSearchText] = useState("");
  let [selectedTag, setSelectedTag] = useState("");

  // Modify favorites list based on meal search text and meal tag
  let search = (searchText: string, tag: string) => {
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
    
    if (searchText !== "") {
      sortedMeals = sortedMeals.filter((m: any) =>
        (m.nameEn || "").match(new RegExp(searchText, "i"))
      );
    }
    
    if (tag !== "") {
      sortedMeals = sortedMeals.filter((m: any) =>
        (m.tags || []).includes(tag)
      );
    }
    
    return sortedMeals;
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

            <Box display="flex" gap={2} width="99%">
              <FormControl
                variant="filled"
                sx={{ flex: 2, color: `${theme.palette.primary.contrastText}` }}
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
              
              <FormControl
                variant="filled"
                sx={{ flex: 1, color: `${theme.palette.primary.contrastText}` }}
              >
                <InputLabel sx={{ color: `${theme.palette.primary.contrastText}` }}>
                  Filter by tag
                </InputLabel>
                <Select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: `${theme.palette.primary.contrastText}`,
                  }}
                >
                  <MenuItem value="">
                    <em>All tags</em>
                  </MenuItem>
                  {favMealTags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

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
              {
                search(searchText, selectedTag).map((m: any) => {
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