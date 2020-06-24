import React, { Fragment, useEffect, useState } from 'react';

import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer, commitMutation } from 'react-relay';
import environment from '../relay-environment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../core/header/Header'
import Footer from '../core/footer/Footer'

import CreatePlanOptions from './CreatePlanOptions'
import CreatePlanTable from './CreatePlanTable'
import MealOption from './MealOption'
import MealPlansToolbar from './MealPlansToolbar'

import { dayToNumber, numberToDay} from './utils'

import { MEALS_OF_DAY, DAYS_OF_WEEK } from './constants'

/**
 * state for which meals are selected at which tims is a map keyed by day, 
 * and each day is an object keyed by meal time
 * {
 *    Monday: { Breakfast: [] ... }
 *   ...   
 * }
 *
 * this creates an empty version of that
 */ 
const makeDefaultMealsAtTimes = () => {
  const defaultMealsAtTimes = {}
  for (let day of DAYS_OF_WEEK) {
    defaultMealsAtTimes[day] = {}
    for (let meal of MEALS_OF_DAY) {
      defaultMealsAtTimes[day][meal] = []
    }
  }
  return defaultMealsAtTimes
}

const useStyles = makeStyles(() =>( {
  root: {
    height: 'calc(100vh - 90)',
    margin: '100px 0 10px 0',
    padding: '10px',
    '& .MuiTableCell-root': {
      color: 'black',
    },
  },
}))

/**
 * Add a meal to the state
 */
function putMealAtTime({ 
  mealsAtTimes,
  day, 
  mealTime, 
  meal 
}) {
  return {
    ...mealsAtTimes,
    [day]: {
      ...mealsAtTimes[day],
      [mealTime]: [
        ...mealsAtTimes[day][mealTime],
        meal,
      ]
    }
  }
}

/**
 * remove selected meal from the state
 */
function removeMealAtTime({
  mealsAtTimes,
  day,
  mealTime,
  meal,
}) {
  const meals = mealsAtTimes[day]?.[mealTime] ?? null
  if (meals === null) {
    // meals not in there, return
    return mealsAtTimes
  }

  return {
    ...mealsAtTimes,
    [day]: {
      ...mealsAtTimes[day],
      [mealTime]: meals.filter(selectedMeal => meal.id !== selectedMeal.id)
    }
  }

}

/**
 * call graphql mutation to add new selected meal to plan
 */
function doCreateMealPlanEntry({
  mealPlanId,
  mealId,
  days,
  category
}) {
  return new Promise(function createMealPlanEntryPromise(resolve, reject) {
    commitMutation(
      environment,
      {
        variables: {
          mealPlanId,
          mealId,
          days,
          category
        },
        mutation: graphql`
          mutation PlanPageCreateMealPlanEntryMutation(
            $mealPlanId: BigInt!
            $mealId: BigInt!
            $days: Int!
            $category: CategoryT!
          ) {
            createMealPlanEntry(input: {
              mealPlanEntry: {
                mealPlanId: $mealPlanId
                mealId: $mealId
                days: $days
                category: $category
              }
            }) {
              mealPlanEntry {
                id
                rowId
              }
            }
          }
        `,
        onCompleted: function onCompleteHandler(response, errors) {
          if (errors) {
            reject(errors)
            return
          }
          const { createMealPlanEntry: { mealPlanEntry } } = response
          resolve(mealPlanEntry)
        },
        onError: function onErrorHandler(err) {
          reject(err)
        }
      }
    )
  })
}

/**
 * call mutation to remove selected meal from plan
 */
function doDeleteMealPlanEntry({ id }) {
  return new Promise(function deleteMealPlanEntryPromise(resolve, reject) {
    commitMutation(environment, {
      mutation: graphql`
        mutation PlanPageDeleteMealPlanEntryMutation(
          $id: ID!
        ) {
          deleteMealPlanEntryById(input: { id: $id }) {
            deletedMealPlanEntryId
          }
        }
      `,
      variables: { id },
      onCompleted: function onCompleteHandler(response, errors) {
        if (errors) {
          reject(errors)
          return
        }
        resolve()
      },
      onError: function onErrorHandler(err) {
        reject(err)
      }
    })
  })
}

/**
 * check if the meal is alredy in the plan
 */
function mealEntryAlreadyExists({
  selectedPlan,
  newMealEntry,
}) {
  const existingEntries = selectedPlan.mealPlanEntries.nodes
  const existingEntry = existingEntries.find(existingEntry => {
    if (existingEntry.days !== newMealEntry.days) {
      return false
    }
    if (existingEntry.category !== newMealEntry.category) {
      return false
    }
    if (existingEntry.meal.rowId !== newMealEntry.mealId) {
      return false
    }
    return true
  })
  return existingEntry !== undefined
}

/**
 * check if the meal has been removed from the plan
 */
function mealEntryHasBeenRemoved({
  mealsAtTimes,
  existingEntry
}) {
  const mealsAtTime = mealsAtTimes[numberToDay(existingEntry.days)][existingEntry.category]
  for (var meal of mealsAtTime) {
    if (meal.rowId === existingEntry.rowId) {
      return false
    }
  }
  return true
}

/**
 * handle when user clicks to save meal plan
 */
async function handleSave({
  selectedPlan,
  mealsAtTimes
}) {
  const promises = []

  // save all the meals that don't already exist
  Object.keys(mealsAtTimes).forEach(day => {
    Object.keys(mealsAtTimes[day]).forEach(mealTime => {
      const listOfMeals = mealsAtTimes[day][mealTime]
      listOfMeals.forEach(meal => {
        const newMealEntry = {
          days: dayToNumber(day),
          category: mealTime,
          mealId: meal.rowId,
          mealPlanId: selectedPlan.rowId
        }
        if (!mealEntryAlreadyExists({ newMealEntry, selectedPlan })) {
          promises.push(doCreateMealPlanEntry(newMealEntry))
        }
      })
    })
  })

  const existingEntries = selectedPlan.mealPlanEntries.nodes
  existingEntries.forEach(existingEntry => {
    if (mealEntryHasBeenRemoved({ mealsAtTimes, existingEntry })) {
      promises.push(doDeleteMealPlanEntry(existingEntry))
    }
  })

  try {
    await Promise.all(promises) // wait for all mutations to complete
  } catch(e) {
    console.error('Error happen creating meal plan entries', e)
  }
}

export function PlanPage(props) {
  const classes = useStyles()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [mealsAtTimes, setMealsAtTimes] = useState(makeDefaultMealsAtTimes())

  useEffect(() => {
    if (selectedPlan !== null) {
      let mealsAtTimes = makeDefaultMealsAtTimes()
      const mealPlanEntries = selectedPlan.mealPlanEntries.nodes
      for (var mealPlanEntry of mealPlanEntries) {
        mealsAtTimes = putMealAtTime({
          mealsAtTimes,
          day: numberToDay(mealPlanEntry.days),
          mealTime: mealPlanEntry.category,
          meal: mealPlanEntry.meal,
        })
      }
      setMealsAtTimes(mealsAtTimes)
    }
  }, [selectedPlan])

  const onNewMealSelect = ({
    day,
    meal,
    mealTime,
  }) => {
    setMealsAtTimes(
      putMealAtTime({ day, meal, mealTime, mealsAtTimes })
    )
  }

  const onMealUnselect = ({
    day, 
    meal,
    mealTime,
  }) => {
    setMealsAtTimes(
      removeMealAtTime({ day, meal, mealTime, mealsAtTimes })
    )
  }

  const onSave = () => {
    handleSave({
      selectedPlan,
      mealsAtTimes
    })
  }

  return (
    <Fragment>
      <Header />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <MealPlansToolbar
            mealPlansToolbarFragment={props}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            onSave={onSave}
          />
          <br />
          <br />
        </Grid>
        {selectedPlan === null && (
          <Grid container component="div">
            <Grid item xs={4}>
              <div style={{ minHeight: `calc(100vh - 90px - 300px)`}} />
            </Grid>
          </Grid>
        )}
        {selectedPlan !== null && (
          <Fragment>
            <Grid item xs={4}>
              <CreatePlanOptions
                createPlanOptionsFragment={props}
              />
            </Grid>
            <Grid item xs={8}>
              <CreatePlanTable
                mealsAtTimes={mealsAtTimes}
                onNewMealSelect={onNewMealSelect}
                onMealUnselect={onMealUnselect}
              />
            </Grid>
          </Fragment>
        )}
      </Grid>
      <Footer />
    </Fragment>
  )
}

const query = graphql`
  query PlanPageQuery {
    ...CreatePlanOptions_createPlanOptionsFragment
    ...MealPlansToolbar_mealPlansToolbarFragment
  }
`;

function PlanPageWithQuery() {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{}}
      render={({ error, props }) => <PlanPage error={error} {...props} />}
    />
  )
}

export default PlanPageWithQuery