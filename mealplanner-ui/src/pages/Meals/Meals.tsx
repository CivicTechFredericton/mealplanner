import { Search } from "@mui/icons-material";
import {
  Grid,
  InputBase,
  Paper
} from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
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
  }
`;



export const Meals = () => {
  const [searchMeal, setSearchMeal] = useState<string>("");
  const data = useLazyLoadQuery<MealsQuery>(
    mealsQuery,
    {},
    { fetchPolicy: "store-or-network" }
  );
  return (
    <Grid
      container
      spacing={2}
      columns={2}
      justifyContent="center"
      marginTop="1rem"
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "75%",
          justifyContent: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Meal"
          inputProps={{ "aria-label": "Search Meal" }}
          onChange={(e) => setSearchMeal(e.target.value.toLowerCase())}
        />
        <Search />
      </Paper>
      {data.meals ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          marginTop="1rem"
          columns={4}
        >
          {data.meals?.nodes.map((node) => {
            if (node.nameEn.toLowerCase().includes(searchMeal))
              return <MealCard node={node} />;
          })}
        </Grid>
      ) : (
        "No meals"
      )}
    </Grid>
  );
};
