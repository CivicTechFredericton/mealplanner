import React, { useState } from 'react'
import PropTypes from 'prop-types'

import graphql from 'babel-plugin-relay/macro'
import { commitLocalUpdate, commitMutation } from 'react-relay'
import environment from '../relay-environment'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import SaveIcon from '@material-ui/icons/Save'

const createNewPlanMutation = graphql`
mutation NewMealPlanModalMutation(
  $name: String!,
  $description: String
) {
  createMealPlan(input: {
    mealPlan: {
      nameEn: $name,
      descriptionEn: $description
    }
  }) {
  	mealPlan {
      id
      rowId
      nameEn
      descriptionEn
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

function doCreateNewPlan({ name, description }) {
  return new Promise(function doCreateNewPlanPromiseCB(resolve, reject) {
    commitMutation(
      environment,
      {
        mutation: createNewPlanMutation,
        variables: { name, description },
        onCompleted: function onCompleteHandler(resposne, errors) {
          if (errors) {
            reject(errors)
            return
          }
          const { createMealPlan: { mealPlan } } = resposne
          resolve(mealPlan)
        },
        onError: function onErrorHandler(err) {
          reject(err)
        }
      }
    )
  })
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    height: 270,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: 'calc(50% - 200px)',
  },
  input: {
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
      color: 'black',
    }
  }
}));


export default function NewMealPlanModal(props) {
  const [planName, setPlanName] = useState('')
  const [planDescription, setPlanDescription] = useState('')
  const [submitInProgress, setSubmitInProgress] = useState(false)

  async function handleFormSubmit() {
    try {
      setSubmitInProgress(true)
      const mealPlan = await doCreateNewPlan({
        name: planName,
        description: planDescription,
      })

      // make it so meal plan is in relay store
      commitLocalUpdate(environment, store => {
        const mealPlans = store.getRoot().getLinkedRecord('mealPlans')
        const mealPlanRecords = mealPlans.getLinkedRecords('nodes')
        const dataId = mealPlan.id + '_temp'
        const newMealPlanRecord = store.create(dataId, 'MealPlan')
        Object.keys(mealPlan).forEach(key => {
          // TODO comment on why we skipped mealPlanEntries (value is Object), this is hacky
          if (key !== 'mealPlanEntries') {
            newMealPlanRecord.setValue(mealPlan[key], key)
          }
        })
        mealPlans.setLinkedRecords([...mealPlanRecords, newMealPlanRecord], 'nodes')

        // now handle successful new plan create
        setSubmitInProgress(false)
        props.setSelectedPlan(mealPlan)
        props.onClose()
      })
      console.debug('Success create new plan', { mealPlan })
    } catch (e) {
      console.error('error happen creating new plan', e)
      setSubmitInProgress(false)
    }
  }

  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">New Meal Plan</Typography>
          <br />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            className={classes.input}
            value={planName}
            onChange={event => { setPlanName(event.target.value)}}
          />
          <br />
          <br />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            className={classes.input}
            value={planDescription}
            onChange={event => { setPlanDescription(event.target.value)}}
          />
          <br />
          <br />
        </Grid>
        <Grid container item justify="flex-end" >
          <Button color="primary" onClick={handleFormSubmit} disabled={submitInProgress}>
            Save <SaveIcon />
          </Button>
          <Button color="secondary" onClick={props.onClose} disabled={submitInProgress}>
            Cancel <CancelIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      {body}
    </Modal>
  )
}

NewMealPlanModal.defaultProps = {
  open: false,
  onClose: new Function(),
}

NewMealPlanModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedPlan: PropTypes.func,
}