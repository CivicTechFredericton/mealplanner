import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

const MealPlansInner = (props) => {
  return (
    <>
      <h3>Meal Plans</h3>
      <ul>
        {props.mealPlansFragment.mealPlans.nodes.map((mp, i) => (
          <li key={i}>Meal Plan {mp.nameEn}</li>
        ))}
      </ul>
    </>
  );
};

MealPlansInner.propTypes = {
  mealPlansFragment: PropTypes.object,
};

const MealPlans = createFragmentContainer(
  MealPlansInner, {
    mealPlansFragment: graphql`
    fragment MealPlans_mealPlansFragment on Query {
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