import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { MealPlanQuery } from "./__generated__/MealPlanQuery.graphql";
import { Calendar } from "./Calendar";

/* Meal plan query */
const mealPlanQuery = graphql`
  query MealPlanQuery($id: BigInt!) {
    mealPlan(rowId: $id) {
      nameEn
      nameFr
      descriptionEn
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
      <Grid container spacing={2}>
        {matches ? (
          <Grid item md={3}>
            <Typography>Meal catalog</Typography>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={12} md={9}>
          <section>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              bgcolor="primary.dark"
            >
              <Typography
                padding="10px 0"
                color="primary.contrastText"
                variant={"h5"}
              >
                {data.mealPlan?.nameEn}
              </Typography>
            </Box>
          </section>
          <section>
            <Calendar mealPlan={data.mealPlan!} />
          </section>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
