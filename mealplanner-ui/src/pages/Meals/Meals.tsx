import {
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useRefetchableFragment } from "react-relay";
import { useNavigate } from "react-router-dom";
import { getCurrentPerson } from "../../state/state";
import { fetchAllCognitoUsers } from "../../api/cognitoUsers";
import { MealCard } from "./MealCard";
import { MealTags } from "./MealTags";
import { useMealsData } from "./MealsData";
import { FavoriteMeals, FavoriteMealsFragment } from "./PersonFavoriteMeals";

type FavoriteMeals = {
  favoriteMeals: {
    nodes: {
      personUuid: string | null | undefined;
      meal: {
        rowId: string;
        name_en: string;
      };
    }[];
  };
};

export const Meals = () => {
  const [searchMeal, setSearchMeal] = useState<string>("");
  const [searchType, setSearchType] = useState("name");

  const [cognitoUsers, setCognitoUsers] = useState<{ uuid: string; displayName: string; slug: string }[]>([]);
  const navigate = useNavigate();
  const data = useMealsData();

  useEffect(() => {
    fetchAllCognitoUsers().then(setCognitoUsers);
  }, []);

  const handleMenuItemClick = (user: { uuid: string; displayName: string; slug: string }) => {
    navigate(`/meals/${user.slug}/favorites`, { state: { personName: user.displayName, personUuid: user.uuid } });
  };

  const [_, refetch] = useRefetchableFragment(FavoriteMealsFragment, data);

  const PFMeals = useRefetchableFragment(
    FavoriteMealsFragment,
    data
  )[0] as FavoriteMeals;
  const currentPersonRole = getCurrentPerson().personRole;
  const currentPersonUuid = getCurrentPerson().personUuid;
  const needsUuidFilter = currentPersonRole === "app_meal_designer" || currentPersonRole === "app_admin";
  const selectedFavs: string[] =
    PFMeals.favoriteMeals?.nodes.flatMap(
      (favMeal: { personUuid?: string | null; meal?: { rowId: string } }) => {
        if (needsUuidFilter && favMeal.personUuid !== currentPersonUuid) return [];
        return favMeal.meal?.rowId ? [favMeal.meal.rowId] : [];
      }
    ) || [];

  const selectedTags = data.gqLocalState.selectedMealTags || [];

  return (
    <>
      <Grid
        container
        margin="1rem 2rem"
        width="95%"
        justifyContent="space-between"
      >
        <Grid item xs={12}>
          <FormControl style={{ display: "flex" }} component="fieldset">
            <RadioGroup
              row
              aria-label="searchType"
              name="searchType"
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            >
              <FormControlLabel
                value="name"
                control={<Radio checked={searchType === "name"} />}
                label={
                  <InputBase
                    placeholder="Search Meal"
                    inputProps={{ "aria-label": "Search Meal" }}
                    readOnly={searchType !== "name"}
                    value={searchMeal}
                    onChange={(e) => {
                      if (searchType === "name") {
                        setSearchMeal(e.target.value.toLowerCase());
                      }
                    }}
                    style={{
                      cursor: "text",
                      borderBottom: "1px solid black",
                      width: "40vw",
                    }}
                  />
                }
              />
              <FormControlLabel
                value="tags"
                control={<Radio />}
                label="Tags"
                checked={searchType === "tags"}
                style={{ marginLeft: "0px" }}
              />
              <FormControlLabel
                value="favorites"
                control={<Radio />}
                label="My Favorites"
                checked={searchType === "favorites"}
              />

              {(getCurrentPerson().personRole === "app_admin" ||
                getCurrentPerson().personRole === "app_meal_designer") && (
                <FormControl style={{ width: "30%" }}>
                  <InputLabel>Select the favorites of another User</InputLabel>
                  <Select label="Select the favorites of another User">
                    {cognitoUsers.map((user) => (
                      <MenuItem
                        key={user.uuid}
                        value={user.uuid}
                        onClick={() => handleMenuItemClick(user)}
                      >
                        {user.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {searchType === "tags" && (
        <Suspense fallback={"loading tags..."}>
          <MealTags tags={data} />
        </Suspense>
      )}

      {searchType === "favorites" && (
        <Suspense fallback={"loading favorites..."}>
          <FavoriteMeals favs={data} />
        </Suspense>
      )}
      {data.meals ? (
        <Grid container spacing={2} margin="1rem" columns={4}>
          {data.meals?.nodes.map((node) => {
            if (
              (searchType === "name" &&
                node.nameEn.toLowerCase().includes(searchMeal)) ||
              (searchType === "tags" &&
                selectedTags.every((tag) => node.tags?.includes(tag)))
            ) {
              return (
                <MealCard
                  node={node}
                  refetch={refetch}
                  selectedFavs={selectedFavs}
                />
              );
            }
          })}
        </Grid>
      ) : (
        "No meals"
      )}
    </>
  );
};
