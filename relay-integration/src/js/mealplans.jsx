import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

const MealPlansInner = (props) => {
    return (
        <>
            <h3>Meal Plans</h3>
            <ul>
                {props.mealPlansFragment.mealPlans.nodes.map((mp) => (
                    <li>Meal Plan {mp.nameEn}</li>
                ))}
            </ul>
        </>
    );
}

const MealPlans = createFragmentContainer(
    MealPlansInner, {
    mealPlansFragment: graphql`
    fragment mealplans_mealPlansFragment on Query {
        mealPlans {
            nodes {
                id
                rowId
                nameEn
            }
        }
    }`
}
);

export default MealPlans;