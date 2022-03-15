import React from 'react';
import { Calendar_mealPlan$data } from './__generated__/Calendar_mealPlan.graphql';

interface Props {
    mealplan: Calendar_mealPlan$data;
  }
type categoryType = {
    [key: string] : number;
}


const mealsArr = (mealplan: Calendar_mealPlan$data) => {
    let rowarr : any = [];
    
   
    const categories: categoryType = {'BREAKFAST': 0, "LUNCH": 1, "DINNER": 2, "SNACK": 3};

    for (let i=0; i < 4; i++) {
        let colarr = [];
        for (let j=0; j < 7; j++) {
          colarr.push([]);
        }
        rowarr.push(colarr);
    }
   mealplan.mealPlanEntries.nodes.forEach((m) =>{
        rowarr[categories[m.category]][m.days].push(m)
   })
   return rowarr;
}

export const DesktopCalendar: React.FC<Props> = ({mealplan}) => {
    let arr = mealsArr(mealplan);
    // console.log(arr[0][1]);
    console.log(mealplan.mealPlanEntries.nodes)
    return (
        <React.Fragment>
            
            <div>
                <table>
                    <thead>
                        <tr>
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
                        <tr>
                              {colarr.map((m: any[]) => 
                                <td>
                                    <h6>
                                    {m[0]?.category}
                                    </h6>
                                    {m.map((mpe:any) => <p>{mpe.meal.nameEn}</p>)}
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