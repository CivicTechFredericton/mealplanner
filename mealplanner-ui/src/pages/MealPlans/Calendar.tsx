import { useMediaQuery, useTheme } from "@mui/material";
import { graphql } from "babel-plugin-relay/macro";
import React from "react";
import { useFragment } from "react-relay";
import { DesktopCalendar } from "./DesktopCalendar";
import { MobileCalendar } from "./MobileCalendar";
import { Calendar_mealPlan$key } from "./__generated__/Calendar_mealPlan.graphql";

// Referred https://relay.dev/docs/guided-tour/list-data/updating-connections/ documentation for @connection, __id
// The example does not work exactly. It threw errors that first or last should be included
// The second error was edges was missing
// Complained Calendar_mealPlan_mealPlanEntries_connection should be Calendar_mealPlan_mealPlanEntries
const fragment = graphql`
  fragment Calendar_mealPlan on MealPlan {
    rowId
    id
    __id
    mealPlanEntries(orderBy: [CATEGORY_ASC, DAYS_ASC], first: 1000)
      @connection(key: "Calendar_mealPlan_mealPlanEntries") {
      __id
      edges {
        cursor
        node {
          id
          rowId
          category
          mealId
          days
          meal {
            id
            nameEn
            nameFr
          }
        }
      }
    }
  }
`;

interface MealPlanProps {
  mealPlan: Calendar_mealPlan$key;
}

export const Calendar: React.FC<MealPlanProps> = ({ mealPlan }) => {
  let data = useFragment<Calendar_mealPlan$key>(fragment, mealPlan);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <React.Fragment>
      {
        // Check for width
        // if mobile
        // render day picker
        // render meal calendar based on the day picked
        // else
        // render calendar for all days as a data grid.
      }
      {!matches ? (
        <MobileCalendar mealplan={data} />
      ) : (
        <DesktopCalendar mealplan={data} />
      )}
    </React.Fragment>
  );
};
