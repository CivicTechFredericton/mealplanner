import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { Calendar } from "./Calendar";
import { MealPlanHeader } from "./MealPlanHeader";
import { SearchMeal } from "./SearchMeal";
import { MealPlanQuery } from "./__generated__/MealPlanQuery.graphql";

/* Meal plan query */
const mealPlanQuery = graphql`
  query MealPlanQuery($id: BigInt!) {
    ...SearchMeal_data
    mealPlan(rowId: $id) {
      ...MealPlanHeader_mealPlan
      ...Calendar_mealPlan
    }
  }
`;

export const MealPlan = () => {
  let params = useParams();
  let data = useLazyLoadQuery<MealPlanQuery>(
    mealPlanQuery,
    { id: params.id },
    { fetchPolicy: "store-or-network" }
  );
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <React.Fragment>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        {matches ? (
          <Grid
            item
            md={3}
            style={{
              backgroundColor: `${theme.palette.primary.dark}`,
              padding: "1em",
            }}
            sx={{displayPrint: 'none'}}
          >
            <Typography>
              <SearchMeal data={data} />
            </Typography>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={12} md={9}>
          <MealPlanHeader mealPlan={data.mealPlan!} />
          <section>
            <Calendar mealPlan={data.mealPlan!} />
          </section>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
