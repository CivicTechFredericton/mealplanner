import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Calendar_mealPlan$data } from './__generated__/Calendar_mealPlan.graphql';

interface Props {
    mealplan: Calendar_mealPlan$data;
  }
type categoryType = {
    [key: string] : number;
}


const mealsArr = (mealplan: Calendar_mealPlan$data) => {
    let table : any = [];
    
   
    const categories: categoryType = {'BREAKFAST': 0, "LUNCH": 1, "DINNER": 2, "SNACK": 3};
    const iterator = Object.keys(categories);
    for(let cat of iterator) {
        let colarr = [];
        for (let j=0; j < 7; j++) {
          colarr.push({category: cat, items:[]});
        }
        table.push(colarr);
    }
    
   mealplan.mealPlanEntries.nodes.forEach((m) =>{
       let row = categories[m.category];
        let col = m.days;
        table[row][col].items.push(m);
   })

   return table;
}

export const DesktopCalendar: React.FC<Props> = ({mealplan}) => {
    const theme = useTheme();
    let arr = mealsArr(mealplan);
    console.log(mealplan.mealPlanEntries.nodes)
    return (
        <React.Fragment>
            
            <div style={{border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: '10px', padding: 0} }>
                <table style={{tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse', borderStyle: 'hidden'}}>
                    <thead>
                        <tr style={{borderBottom: `1px solid ${theme.palette.grey[800]}`}}>
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
                        {arr.map((colarr: any[]) => 
                        <tr style={{margin: 0}}>
                              {colarr.map((m: any) => 
                                <td style={{verticalAlign: 'top', borderRight: `1px solid ${theme.palette.grey[800]}`, padding: '0.5rem'}}>
                                    <h6 style={{margin: '0.5rem 0', backgroundColor: theme.palette.grey[300], padding: '0.2rem'}}>
                                    {m.category}
                                    </h6>
                                    {m.items.map((mpe:any) => <div>{mpe.meal.nameEn}</div>)}
                                </td>
                                )
                              } 
                        </tr>
                         )}
                        
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}