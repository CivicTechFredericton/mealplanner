import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLocation } from "react-router-dom";

import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';

import NewMealPlanModal from './NewMealPlanModal';
import MealPlanAssignment from './MealPlanAssignment';

import { useTranslation } from 'react-i18next';
import DuplicateMealPlan from './DuplicateMealPlan';

const useStyles = makeStyles(() => ({
  toolbar: {
    margin: '0 20px',
    padding: '10px',
  },
  autocompleteText: {
    color: 'black',
    '& .MuiInputBase-input': {
      color: 'black',
    }
  },
  select: {

  }
}));

/**
 * Toolbar with controls for selecting, creating and saving meal plan
 */
export function MealPlansToolbar(props) {
  const { t } = useTranslation([
    'common',
    'meal'
  ]);

  const location = useLocation();
  const [
    alreadySelectedMealAfterNav,
    setAlreadySelectedMealAfterNav,
  ] = useState(false);

  const classes = useStyles();
  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false);
  
  const options = props.mealPlansToolbarFragment?.mealPlans?.nodes ?? [];

  useEffect(() => {
    if (location.state?.planId !== undefined && !alreadySelectedMealAfterNav) {
      const planToEdit = options.find(mealPlan => mealPlan.id === location.state.planId);
      if (planToEdit !== undefined) {
        props.setSelectedPlan(planToEdit);
        setAlreadySelectedMealAfterNav(false);
      }
    }
  }, [props.mealPlansToolbarFragment]);

  return (
    <Fragment>
      <Grid container >
        <Grid item xs={5} className={classes.toolbar}>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.nameEn + " (" + (option.person ? option.person.fullName : 'Unassigned') + ")"}
            style={{ width: 600 }}
            renderInput={(params) =>
              <TextField
                className={classes.autocompleteText}
                {...params}
                label={props.selectedPlan ? t('meal:lblMealPlan') : t('meal:lblSelectMealPlan')}
                variant="outlined"
              />
            }
            renderOption={params => {
              return (
                <span style={{ color: 'black' }}>
                  {params.nameEn}
                  <span style={{ color: 'darkgray', paddingLeft: '10px' }}>
                    ({params.person?.fullName || 'Unassigned'})
                  </span>
                </span>);
            }}
            value={props.selectedPlan}
            onChange={(event, val) => {
              props.setSelectedPlan(val);
            }}
          />
        </Grid>
        {/* <Grid item xs={2}  justify="flex-end">
          <MealPlanAssignment
            allPeople={props.mealPlansToolbarFragment.people}
            assignedPersonId={props.assignedPersonId}
            setAssignedPersonId={props.setAssignedPersonId}
            selectedPlan={props.selectedPlan}
          />
        </Grid> */}
        <Grid container item xs={6} justify="flex-end">
          <MealPlanAssignment
            allPeople={props.mealPlansToolbarFragment.people}
            assignedPersonId={props.assignedPersonId}
            setAssignedPersonId={props.setAssignedPersonId}
            selectedPlan={props.selectedPlan}
          />
          <DuplicateMealPlan 
          selectedPlan={props.selectedPlan} 
          setSelectedPlan={props.setSelectedPlan}
          assignedPersonId={props.assignedPersonId}
          />
          
          <Button color="primary" onClick={props.onSave}>
            {t('common:btnSave')}
            <SaveIcon />
          </Button>
          <Button
            color="primary"
            onClick={() => setNewPlanModalOpen(true)}
          >
            {t('common:btnNew')}
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <NewMealPlanModal
        open={newPlanModalOpen}
        onClose={() => setNewPlanModalOpen(false)}
        setSelectedPlan={props.setSelectedPlan}
      />

      

    </Fragment>
  );
}

MealPlansToolbar.propTypes = {
  assignedPersonId: PropTypes.string,
  setAssignedPersonId: PropTypes.func,
  mealPlansToolbarFragment: PropTypes.any,
  onSave: PropTypes.func,
  selectedPlan: PropTypes.object,
  setSelectedPlan: PropTypes.func,
};

const MealPlansToolbarWithQuery = createFragmentContainer(
  MealPlansToolbar,
  {
    mealPlansToolbarFragment: graphql`
      fragment MealPlansToolbar_mealPlansToolbarFragment on Query {
        mealPlans {
          nodes {
            id
            personId
            rowId
            nameEn
            nameFr
            descriptionEn
            descriptionFr
            person {
              id
              rowId
	            fullName
            }
            mealPlanEntries {
              nodes {
                id
                rowId
                days
                category
                meal {
                  id
                  rowId
                  nameEn
                  nameFr
                  descriptionEn
                  descriptionFr 
                }
              }
            }
          }
        }
        people {
          nodes {
            id
            rowId
	    fullName
          }
        } 
      }
    `
  }
);

export default MealPlansToolbarWithQuery;
