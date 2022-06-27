import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { addMealToPlan, deleteMealFromPlan } from "../../state/state";
import { CategoryT } from "../../state/__generated__/state_createMealPlanEntryMutation.graphql";
import { Calendar_mealPlan$data } from "./__generated__/Calendar_mealPlan.graphql";

interface DataProps {
  mealplan: Calendar_mealPlan$data;
}

type MealPlanEntry = Exclude<
  Exclude<Calendar_mealPlan$data["mealPlanEntries"], null>["edges"],
  null
>[number]["node"];

type CellType = {
  days: number;
  category: CategoryT;
  items: MealPlanEntry[];
};

const mealsArr = (mealplan: Calendar_mealPlan$data) => {
  let table: CellType[][] = [];

  const categories: CategoryT[] = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
  for (let cat of categories) {
    let colarr: CellType[] = [];
    for (let j = 0; j < 7; j++) {
      colarr.push({ days: j, category: cat, items: [] });
    }
    table.push(colarr);
  }

  mealplan.mealPlanEntries.edges.forEach((m) => {
    let row = categories.indexOf(m.node.category);
    let col = m.node.days;
    table[row][col].items.push(m.node);
  });

  return table;
};

export const DesktopCalendar: React.FC<DataProps> = ({ mealplan }) => {
  const connectionID = mealplan.mealPlanEntries.__id;
  const theme = useTheme();
  let arr = mealsArr(mealplan);

  let cellStyle = {
    verticalAlign: "top",
    borderRight: `1px solid ${theme.palette.grey[800]}`,
    padding: "0.5rem",
    backgroundColor: `${theme.palette.primary.contrastText}`,
  };

  let [displayDelete, setDisplayDelete] = useState("");

  return (
    <React.Fragment>
      <div
        style={{
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "10px",
          padding: 0,
        }}
      >
        <table
          style={{
            tableLayout: "fixed",
            width: "100%",
            borderCollapse: "collapse",
            borderStyle: "hidden",
          }}
        >
          <thead>
            <tr
              style={{ borderBottom: `1px solid ${theme.palette.grey[800]}` }}
            >
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((colarr: CellType[], idx) => (
              <tr key={idx} style={{ margin: 0 }}>
                {colarr.map((cell, idx) => (
                  <td key={idx}
                    onMouseOver={(e) => {
                      e.currentTarget.style.cursor = "pointer";
                      e.currentTarget.style.backgroundColor = `${theme.palette.primary.light}`;
                    }}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = `${theme.palette.primary.contrastText}`)
                    }
                    style={cellStyle}
                    onClick={(e) => {
                      // get mealPlanId, cateogory and days
                      addMealToPlan(
                        connectionID,
                        mealplan.rowId,
                        cell.category,
                        cell.days
                      );
                    }}
                  >
                    <h6
                      style={{
                        margin: "0.5rem 0",
                        backgroundColor: theme.palette.grey[300],
                        padding: "0.2rem",
                      }}
                    >
                      {cell.category}
                    </h6>
                    {cell.items.map((mpe) => (
                      <Box
                        key={mpe.rowId}
                        sx={{ display: "inline-flex" }}
                        onMouseOver={(e) => setDisplayDelete(mpe.id)}
                        onMouseLeave={(e) => setDisplayDelete("")}
                      >
                        <Typography
                          style={{ lineHeight: "1.1em", margin: "5px 0" }}
                        >
                          {mpe.meal?.nameEn}
                        </Typography>
                        {displayDelete === mpe.id ? (
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMealFromPlan(connectionID, mpe.rowId);
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: "1em" }} />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                      </Box>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
