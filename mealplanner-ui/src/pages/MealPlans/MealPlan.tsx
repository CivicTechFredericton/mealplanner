import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import { Calendar } from "./Calendar";
import { SearchMeal } from "./SearchMeal";
import { MealPlanQuery } from "./__generated__/MealPlanQuery.graphql";

/* Meal plan query */
const mealPlanQuery = graphql`
  query MealPlanQuery($id: BigInt!) {
    ...SearchMeal_data
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
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        {matches ? (
          <Grid
            item
            md={3}
            style={{
              backgroundColor: `${theme.palette.primary.dark}`,
              padding: "1em",
            }}
          >
            <Typography>
              <SearchMeal data={data} />
            </Typography>
          </Grid>
        ) : (
          ""
        )}

        <Grid item xs={12} md={9}>
          <section
            style={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "10px",
              marginBottom: "1rem",
            }}
          >
            <Box display="flex" flexDirection="column" bgcolor="primary.main">
              <Typography
                padding="0.5rem 0"
                marginLeft="1rem"
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
