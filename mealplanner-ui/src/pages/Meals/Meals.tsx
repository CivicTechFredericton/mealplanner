import {
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import {Suspense, useState } from "react";
import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { MealTags } from "./MealTags";
import { MealsQuery } from "./__generated__/MealsQuery.graphql";
import { MealCard } from "./MealCard";
import { getCurrentPerson } from "../../state/state";
import { GetAllPeopleInfo } from "../../state/state";
import { FavoriteMeals, FavoriteMealsFragment } from "./PersonFavoriteMeals";

const mealsQuery = graphql`
  query MealsQuery($slug: String!)  {
    meals(orderBy: [ID_DESC], first: 1000) {
      nodes {
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
    # fragment name from MealTags
    ...MealTags_tags
    gqLocalState {
      selectedMealTags
    }
    # fragment name from PersonFavoriteMeals
    ...PersonFavoriteMeals_favorites @arguments(slug: $slug)
    gqLocalState {
      selectedFavoriteMeals
    }
  }
`;

type MealNode = {
  meal: {
  rowId: string;
  name_en: string;
  }
};

type FavoriteMeals = {
  people: {
    nodes: {
      favoriteMeals: {
        nodes: {
          meal: {
            rowId: string;
            name_en: string;
          }
        }[];
      }
    }[];
  }
  gqLocalState: {
    selectedFavoriteMeals: any; 
  };
}

export const Meals = () => {
  const [searchMeal, setSearchMeal] = useState<string>("");
  const [searchType, setSearchType] = useState('name');
  const slug = getCurrentPerson().personSlug;

  let peopleData = GetAllPeopleInfo();
  const data = useLazyLoadQuery<MealsQuery>(
    mealsQuery,
    {slug: slug as string},
    { fetchPolicy: "store-or-network" }
  );
  const [_, refetch] = useRefetchableFragment(FavoriteMealsFragment, data);

  const PFMeals =  useRefetchableFragment(FavoriteMealsFragment, data)[0] as FavoriteMeals;
  const selectedFavs = PFMeals.people?.nodes[0].favoriteMeals.nodes.map((favMeal:MealNode) => favMeal.meal?.rowId) || [];

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
      <FormControl style={{display:"flex"}} component="fieldset">
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
          control={
            <Radio 
              checked={searchType === 'name'}
            />
          }
          label={
            <InputBase
              placeholder="Search Meal"
              inputProps={{ "aria-label": "Search Meal" }}
              readOnly={searchType !== 'name'}
              value={searchMeal}
              onChange={(e) => {
                if (searchType === 'name') {
                  setSearchMeal(e.target.value.toLowerCase());
                }
              }}
              style={{ cursor: 'text',
                      borderBottom: '1px solid black', width: '40vw' }}
              />
          }
        />
        <FormControlLabel
          value="favorites"
          control={<Radio />}
          label="Favorites"
          checked={searchType === 'favorites'}
        />
        {searchType === 'favorites' && (getCurrentPerson().personRole === 'app_admin' || getCurrentPerson().personRole === 'app_meal_designer') && (
            <FormControl style={{ width: '20%' }}>
            <InputLabel>Select any User</InputLabel>
            <Select>
            {peopleData?.people?.nodes.map(person => (
               <MenuItem key={person.rowId} value={person.role}>{person.fullName}</MenuItem> 
            ))} 
            </Select>
          </FormControl>
        )}
        <FormControlLabel
          value="tags"
          control={<Radio />}
          label="Tags"
          checked={searchType === 'tags'}
          style={{ marginLeft: '0px' }}
        /> 
      </RadioGroup>
    </FormControl>
    </Grid>
    </Grid>
      {searchType === 'tags' &&
        <Suspense fallback={"loading tags..."}>
        <MealTags tags={data}/>
      </Suspense>
    }
   
    {searchType === 'favorites' &&
        <Suspense fallback={"loading favorites..."}>
        <FavoriteMeals favs={data}/>
      </Suspense>
    }
    {data.meals ? (
      <Grid container spacing={2} margin="1rem" columns={4}>
        {data.meals?.nodes.map((node) => {
      if ((searchType === 'name' && node.nameEn.toLowerCase().includes(searchMeal)) || (searchType === 'tags' && selectedTags.every(tag => node.tags?.includes(tag)))) {
        return <MealCard node={node} refetch={refetch} selectedFavs={selectedFavs} />
    }})}
  </Grid>
      ) : (
        "No meals"
      )}
    </>
  );
};