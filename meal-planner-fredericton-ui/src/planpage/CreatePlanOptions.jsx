import React from 'react';
import PropTypes from 'prop-types';

import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import { makeStyles } from '@material-ui/core/styles';
import MealOption from './MealOption';

const useStyles = makeStyles(() => ({
  container: {
    padding: '8px',
  },
}));

/**
 * List of meals that can be added to the meal plan
 */
export function CreatePlanOptions(props) {
  const styles = useStyles();
  const meals = props.createPlanOptionsFragment?.meals?.edges ?? [];
  return (
    <div className={styles.container}>
      {
        meals
          .map(meal => meal.node)
          .map(meal => 
            <MealOption meal={meal} key={`meals_${meal.nameEn}`} />
          )
      }
    </div>
  );
}

CreatePlanOptions.defaultProps = {
  onSelectMeals: new Function()
};

CreatePlanOptions.propTypes = {
  createPlanOptionsFragment: PropTypes.object,
};


const CreatePlanOptionsWithQeury = createFragmentContainer(
  CreatePlanOptions,
  {
    createPlanOptionsFragment: graphql`
      fragment CreatePlanOptions_createPlanOptionsFragment on Query {
        meals {
          edges {
            node {
              id
              rowId
              nameEn
              descriptionEn
              categories
              photoUrl
            }
          }
        }
      }
    `
  }
);

export default CreatePlanOptionsWithQeury;