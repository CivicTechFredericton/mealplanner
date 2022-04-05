import { useTheme } from "@mui/material/styles";
import React from "react";
import { addMealToPlan } from "../../state/state";
import { CategoryT } from "../../state/__generated__/state_createMealPlanEntryMutation.graphql";
import { Calendar_mealPlan$data } from "./__generated__/Calendar_mealPlan.graphql";

interface Props {
  mealplan: Calendar_mealPlan$data;
}

// type MealPlanEntry = Exclude<Exclude<Calendar_mealPlan$data["mealPlanEntries"], null>["nodes"], null>[number];
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

export const DesktopCalendar: React.FC<Props> = ({ mealplan }) => {
  const connectionID = mealplan.mealPlanEntries.__id;
  const theme = useTheme();
  let arr = mealsArr(mealplan);
  let cellStyle = {
    verticalAlign: "top",
    borderRight: `1px solid ${theme.palette.grey[800]}`,
    padding: "0.5rem",
  };

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
            {arr.map((colarr: CellType[]) => (
              <tr style={{ margin: 0 }}>
                {colarr.map((cell) => (
                  <td
                    style={cellStyle}
                    onClick={(e) => {
                      // get mealPlanId, cateogry and days
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
                      <div>{mpe.meal?.nameEn}</div>
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
