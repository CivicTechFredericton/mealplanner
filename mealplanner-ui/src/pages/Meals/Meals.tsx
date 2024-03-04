import {
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import {Suspense, useState } from "react";
import { useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { MealTags, MealTagsFragment } from "./MealTags";
import { MealsQuery } from "./__generated__/MealsQuery.graphql";
import { MealCard } from "./MealCard";

const mealsQuery = graphql`
  query MealsQuery {
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
  }
`;

export const Meals = () => {
  const [searchMeal, setSearchMeal] = useState<string>("");
  const [searchType, setSearchType] = useState('name');

  const data = useLazyLoadQuery<MealsQuery>(
    mealsQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );

  const selectedTags = data.gqLocalState.selectedMealTags || [];

  return (
    <div>
    <Grid
      container
      spacing={2}
      columns={2}
      gap="2rem"
      margin="1rem 2rem"
      width="95%"
      justifyContent="space-between"
    >
      <FormControl component="fieldset">
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
        <FormControlLabel
          value="tags"
          control={<Radio />}
          label="Tags"
          checked={searchType === 'tags'}
        /> 
      </RadioGroup>
    </FormControl>
    </Grid>
      {searchType === 'tags' &&
        <Suspense fallback={"loading tags..."}>
        <MealTags tags={data}/>
      </Suspense>
    }
   
    {data.meals ? (
      <Grid container spacing={2} margin="1rem" columns={4}>
        {data.meals?.nodes.map((node) => {
      if ((searchType === 'name' && node.nameEn.toLowerCase().includes(searchMeal)) || (searchType === 'tags' && selectedTags.every(tag => node.tags?.includes(tag)))) {
        return <MealCard node={node} />
    }})}
  </Grid>
      ) : (
        "No meals"
      )}
    </div>
  );
};