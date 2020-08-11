import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useLocation } from "react-router-dom"

import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import Autocomplete from '@material-ui/lab/Autocomplete'

import NewMealPlanModal from './NewMealPlanModal'

const useStyles = makeStyles(() => ({
  autocompleteText: {
    color: 'black',
    '& .MuiInputBase-input': {
      color: 'black',
    }
  },
  select: {

  }
}))

/**
 * Toolbar with controls for selecting, creating and saving meal plan
 */
export function MealPlansToolbar(props) {
  const location = useLocation()
  const [
    alreadySelectedMealAfterNav,
    setAlreadySelectedMealAfterNav,
  ] = useState(false)

  const classes = useStyles();
  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false)

  const options = props.mealPlansToolbarFragment?.mealPlans?.nodes ?? []

  useEffect(() => {
    if (location.state?.planId !== undefined && !alreadySelectedMealAfterNav) {
      const planToEdit = options.find(mealPlan => mealPlan.id === location.state.planId)
      if (planToEdit !== undefined) {
        props.setSelectedPlan(planToEdit)
        setAlreadySelectedMealAfterNav(true)
      }
    }
  }, [props.mealPlansToolbarFragment])

  console.log({ options })

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={10}>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.nameEn}
            style={{ width: 600 }}
            renderInput={(params) => 
              <TextField 
                className={classes.autocompleteText}
                {...params} 
                label={props.selectedPlan ? "Meal Plan" : "Select Meal Plan to Begin"}
                variant="outlined"
              />
            }
            renderOption={params =>{
              return <span style={{color: 'black'}}>{params.nameEn}</span>
            }}
            value={props.selectedPlan}
            onChange={(event, val) => {
              console.log({ val })
              props.setSelectedPlan(val)
            }}
          />
        </Grid>
        <Grid container item xs={2} justify="flex-end">
          <Button color="primary" onClick={props.onSave}>
            Save
            <SaveIcon />
          </Button>
          <Button 
            color="primary" 
            onClick={() => setNewPlanModalOpen(true)}
          >
            New
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
  )
}

MealPlansToolbar.propTypes = {
  mealPlansToolbarFragment: PropTypes.any,
  onSave: PropTypes.func,
  selectedPlan: PropTypes.object,
  setSelectedPlan: PropTypes.func,
}

const MealPlansToolbarWithQuery = createFragmentContainer(
  MealPlansToolbar,
  {
    mealPlansToolbarFragment: graphql`
      fragment MealPlansToolbar_mealPlansToolbarFragment on Query {
        mealPlans {
          nodes {
            id
            rowId
            nameEn
            nameFr
            descriptionEn
            descriptionFr
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
      }
    `
  }
)

export default MealPlansToolbarWithQuery
