import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Calendar_mealPlan$data } from "./__generated__/Calendar_mealPlan.graphql";

interface Props {
  mealplan: Calendar_mealPlan$data;
}

export const MobileCalendar: React.FC<Props> = ({ mealplan }) => {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let categories = ["Breakfast", "Lunch", "Dinner", "Snack"];

  let [selectedDay, setSelectedDay] = useState(0);
  let daywiseMeals = mealplan.mealPlanEntries.edges.filter(({ node }) => {
    return node.days === selectedDay;
  });

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="20px"
      >
        <ToggleButtonGroup value={days[selectedDay]} exclusive size="small">
          {days.map((day, idx) => (
            <ToggleButton
              key={idx}
              value={days[idx]}
              sx={{ backgroundColor: "primary.light" }}
              onClick={(e) => setSelectedDay(idx)}
            >
              {day}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {categories.map((c, idx) => (
        <Box key={idx} sx={{ paddingLeft: 5 }}>
          <h4>{c}</h4>
          <Box>
            {daywiseMeals
              .filter(({ node }) => c.toUpperCase() === node.category)
              .map(({ node }) => (
                <Typography key={node.mealId} color="primary.dark">
                  {node.meal?.nameEn}
                </Typography>
              ))}
          </Box>
        </Box>
      ))}
    </React.Fragment>
  );
};
