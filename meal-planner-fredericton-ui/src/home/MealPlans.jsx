import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { useTranslation } from 'react-i18next';


const MealPlansInner = (props) => {
  const { t } = useTranslation([
    'common'
  ]);

  return (
    <>
      <h3>{t('common:lblMealPlans')}</h3>
      <ul>
        {props.mealPlansFragment.mealPlans.nodes.map((mp, i) => (
          <li key={i}>{t('common:lblMealPlan')} {mp.nameEn}</li>
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