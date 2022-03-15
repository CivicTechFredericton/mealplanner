import { useMediaQuery, useTheme } from '@mui/material';
import { graphql } from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';
import { DesktopCalendar } from './DesktopCalendar';
import { MobileCalendar } from './MobileCalendar';
import { Calendar_mealPlan$key } from './__generated__/Calendar_mealPlan.graphql';


const fragment = graphql`
fragment Calendar_mealPlan on MealPlan {
  mealPlanEntries(orderBy:[CATEGORY_ASC, DAYS_ASC]) {
      nodes {
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
`
interface Props {
    mealPlan: Calendar_mealPlan$key
}
export const Calendar: React.FC<Props> = ({mealPlan}) => {
    let data = useFragment<Calendar_mealPlan$key>(fragment, mealPlan);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
            {!matches ? <MobileCalendar mealplan={data}/>:<DesktopCalendar mealplan={data}/>}
        </React.Fragment>
    )
}