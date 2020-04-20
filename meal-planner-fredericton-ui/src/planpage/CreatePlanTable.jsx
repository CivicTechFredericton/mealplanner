import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcom from '@material-ui/icons/Close'

import { MEALS_OF_DAY, DAYS_OF_WEEK } from './constants'

import MealTime from './MealTime'

const useStyles = makeStyles(() =>( {
  tableCell: {
    padding: '4px',
    border: '1px solid #dedede',
    borderLeft: 'none',
    borderBottom: 'none',
    width: '100px',
  },
  removeButton: {
    padding: 0,
    color: 'black',
    minWidth: 0,
    '& .MuiButton-label': {
      minWidth: 0,
      '& .MuiSvgIcon-root': {
        fontSize: '12px',
      }
    },

  }
}))

/**
 * component for one of the times a meal could be had during the week
 */
function MealTableCell(props) {
  const classes = useStyles()
  const { mealTime, day, onMealDropped } = props
  return (
    <TableCell key={`meal_${mealTime}_${day}`} align="right" className={classes.tableCell}>
      <MealTime onMealDropped={onMealDropped}>
        <div>{mealTime}</div>
        {props.mealsAtTimes[day][mealTime].map((selectedMeal, i) => {
          return (
            <div key={`selectedMeal_${day}_${mealTime}_${i}`}>
              {selectedMeal.nameEn}
              <Button className={classes.removeButton}>
                <CloseIcom onClick={() => props.onMealUnselect(selectedMeal)}/>
              </Button>
            </div>
          )
        })}
      </MealTime>
    </TableCell>
  )
}

MealTableCell.propTypes = {
  day: PropTypes.string.isRequired,
  mealTime: PropTypes.string.isRequired,
  onMealDropped: PropTypes.func.isRequired,
  onMealUnselect: PropTypes.func.isRequired,
  mealsAtTimes: PropTypes.object.isRequired,
}

/**
 * main weekly calendar component for meal plan
 */
export class CreatePlanTable extends Component {
  render() {
    return (
      <TableContainer component={Paper}>
        <Table stickyHeader  aria-label="sticky table">
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map(day =>
                <TableCell align="right" key={`tableheader_${day}`}>{day}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {MEALS_OF_DAY.map(mealTime => {
              return (
                <TableRow key={`mealds_${mealTime}`}>
                  {DAYS_OF_WEEK.map(day => {
                    const onMealDropped = meal => {
                      this.props.onNewMealSelect({ mealTime, day, meal })
                    }
                    const onMealUnselect = meal => {
                      this.props.onMealUnselect({ mealTime, day, meal})
                    }
                    return (
                      <MealTableCell 
                        key={`mealcell_${mealTime}_${day}`} 
                        onMealDropped={onMealDropped} 
                        onMealUnselect={onMealUnselect}
                        mealTime={mealTime} 
                        day={day} 
                        mealsAtTimes={this.props.mealsAtTimes}/>
                    )
                  })}
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

CreatePlanTable.propTypes = {
  mealsAtTimes: PropTypes.object,
  onNewMealSelect: PropTypes.func,
  onMealUnselect: PropTypes.func,
}

export default CreatePlanTable