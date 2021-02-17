import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Modal } from '@material-ui/core'

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
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
    height: 180,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '100px',
    left: 'calc(50% - 200px)',
  },
}))

export default function MealPlanAssignment(props) {
  const { t } = useTranslation([
    'common'
  ]);

  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalValue, setModalValue] = useState(null)

  const options = props.allClients?.nodes ?? []

  useEffect(() => {
    if (props.selectedPlan?.clientId) {
      const option = options.find(({ rowId }) => rowId === props.selectedPlan?.clientId)
      if (option) {
        setModalValue(option)
        props.setAssignedClientId(option)
      }
    }
  }, [
    props.selectedPlan,
    props.allClients
  ])

  if (!props.selectedPlan) {
    // no point in rendering anything, cannot show assignment if no meal
    return null;
  }

  return (
    <Fragment>
      <Typography>
        <b>{t('common:lblClientAssignment')}</b>
        <Button className={classes.button} onClick={() => setModalOpen(true)}>
          <EditIcon fontSize={'8px'} />
        </Button>
      </Typography>
      <Typography>
        {props.assignedClientId ? props.assignedClientId.clientId : t('common:lblMealPlanUnassigned')}
      </Typography>
      <Modal open={modalOpen}>
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4">{t('common:lblChangeClientAssignment')}</Typography>
              <br />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option.clientId}
                style={{ width: 300 }}
                renderInput={(params) => 
                  <TextField 
                    className={classes.autocompleteText}
                    {...params} 
                    variant="outlined"
                  />
                }
                renderOption={params =>{
                  return <span style={{color: 'black'}}>{params.clientId}</span>
                }}
                value={modalValue}
                onChange={(event, val) => {
                  console.log({ val })
                  setModalValue(val)
                }}
              />
              <br />
              <br />
            </Grid>
            <Grid container item justify="flex-end" >
              <Button
                color="primary"
                onClick={() => {
                  props.setAssignedClientId(modalValue)
                  setModalOpen(false)
                }}
              >
                {t('common:btnOK')} <CheckIcon />
              </Button>
              <Button
                color="secondary" 
                onClick={() => {
                  setModalOpen(false)
                }}
              >
                {t('common:btnCancel')}
                <CancelIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </Fragment>
  )

}

MealPlanAssignment.propTypes = {
  assignedClientId: PropTypes.string,
  setAssignedClientId: PropTypes.func,
  selectedPlan: PropTypes.object,
}
