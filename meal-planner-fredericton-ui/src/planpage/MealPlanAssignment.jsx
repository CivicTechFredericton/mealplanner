import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControlLabel, Modal } from '@material-ui/core';

import { useTranslation } from 'react-i18next';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  assignment: {
    padding: "10px 0",
  },
  autocompleteText: {
    color: 'black',
    '& .MuiInputBase-input': {
      color: 'black',
    }
  },
  button: {
    color: 'black',
    minWidth: 0,
    padding: 0,
    fontSize: '8px',
    '& .MuiButton-label': {
      color: 'black',
    }
  },
  paper: {
    position: 'absolute',
    height: 220,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: 'calc(50% - 200px)',
  },
}));

function DuplicateMealPlan(name) {
 console.log("DuplicateMeal Plan name", name);
}
export default function MealPlanAssignment(props) {
  const { t } = useTranslation([
    'common',
    'meal'
  ]);

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  

  const options = props.allPeople?.nodes ?? [];

  useEffect(() => {
    if (props.selectedPlan?.person) {
      const option = options.find(({ rowId }) => rowId === props.selectedPlan?.person.rowId);
      if (option) {
        setCurrentPerson(option);
        props.setAssignedPersonId(option.id);
      }
    }
  }, [
    props.selectedPlan,
    props.allPeople
  ]);

  if (!props.selectedPlan) {
    // no point in rendering anything, cannot show assignment if no meal
    return null;
  }

  return (
    <Fragment>
      <div className={classes.assignment}>
          
        <Typography noWrap>
        {/* <Button className = {classes.button} onClick = {DuplicateMealPlan(props.selectedPlan)}> Duplicate Meal plan
        </Button> */}
        {/* <FormControlLabel 
              control = {<Checkbox checked={duplicate} onChange={()=> {
                setDuplicate(!duplicate);
                }
                } name="DuplicateMealPlan" />}
              label = "Make a copy"
              />      */}
          {/* <b>{t('meal:lblPersonAssignment')}</b>&nbsp; */}
          {/* {props.selectedPlan.person ? props.selectedPlan.person.fullName : t('meal:lblMealPlanUnassigned')}
          &nbsp; */}
          <Autocomplete
                  id="combo-box-demo"
                  options={options}
                  getOptionLabel={(option) => option.fullName}
                  style={{ width: 300 }}
                  renderInput={(params) =>
                    <TextField
                      className={classes.autocompleteText}
                      {...params}
                      variant="outlined"
                    />
                  }
                  renderOption={params => {
                    return <span style={{ color: 'black' }}>{params.fullName}</span>;
                  }}
                  value={currentPerson}
                  onChange={(event, val) => {
                    console.log({ val });
                    props.setAssignedPersonId(val);
                    setCurrentPerson(val);
                  }}
                />
          {/* <Button className={classes.button} onClick={() => setModalOpen(true)}>
            <EditIcon fontSize={'8px'} />
          </Button> */}

        </Typography>
        {console.log(`props assignedPersonId ${props.assignedPersonId} `)}
        
      </div>
    </Fragment>
  );

}

MealPlanAssignment.propTypes = {
  assignedPersonId: PropTypes.string,
  setAssignedPersonId: PropTypes.func,
  selectedPlan: PropTypes.object,
};
