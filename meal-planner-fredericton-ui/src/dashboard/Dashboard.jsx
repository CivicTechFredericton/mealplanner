import React from 'react';
import PropTypes from 'prop-types'

import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer, commitMutation } from 'react-relay';
import environment from '../relay-environment';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Box  from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';

import Header from '../core/header/Header';
import Footer from "../core/footer/Footer";
import Container from "../components/container/Container";

const useStyles = makeStyles(theme => ({
  header:{
    position:"relative"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width:'150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor:'#eee',
    flexGrow:'unset',

    [theme.breakpoints.down('sm')]: {
      width:'120px',
      height: '120px',
    }
  },
  papercontainer: {
    minHeight:"180px",
    [theme.breakpoints.down('sm')]: {
      minHeight:"150px",
    }
  },
  link:{
    color: '#7ac073',
    textDecoration: 'none'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '50%',

    '& img':{
      width: '100%',
      height: '100%'
    }
  },
  table: {
    color: theme.palette.text.secondary,
    width: '100%',
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    '& th':{
      color: theme.palette.text.secondary,
      textAlign: 'center'
    },
    '& td':{
      color: theme.palette.text.secondary,
      textAlign: 'center',

      '& a':{
        color: theme.palette.text.secondary,
      }
    }
  }    
}));

const Dashboard = props => {
  const classes = useStyles();
  const rows = (props.mealPlans?.nodes ?? []).map(meal => ({
    ...meal,
    label: meal.nameEn,
    createdAt: meal.createdAt
  }))

  return (
    <>
      <Header className={classes.header} />
      <Container maxWidth="100%">
        <Grid container
          direction="row"
          justify="space-evenly"
          alignItems="center" spacing={6}
          className={classes.papercontainer}
        />
        <Grid container
          direction="row"
          justify="space-evenly"
          alignItems="center" spacing={3}
                
        >
          <Grid item>
            <Paper className={classes.paper}>
                   
            </Paper>
            <Typography variant="h6" align="center">
              <Link to='/catalogue-meals' className={classes.link}>Catalogue of Meals</Link>
            </Typography>
                    
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img}>
              
              </ButtonBase>        
            </Paper>
            <Typography variant="h6"  align="center">
              <Link to='/catalogue-units' className={classes.link}>Catalogue of Units</Link>
            </Typography>
                    
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img}>
              
              </ButtonBase>      
            </Paper>
            <Typography variant="h6"  align="center">
              <Link to='/catalogue-products' className={classes.link}>Catalogue of Products</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img}>
              
              </ButtonBase>      
            </Paper>
            <Typography variant="h6" align="center">
              <Link to='/clients' className={classes.link}>Clients</Link>
            </Typography>
          </Grid>
        </Grid>

        <Box m={8}>
          <TableContainer component={Paper}>
            <Table color="primary" className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Meal Plans Created</TableCell>
                  <TableCell align="center">Date Created</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Clone</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.label}>
                    <TableCell><Checkbox/></TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={{
                        pathname: '/meal-designer',
                        state: {
                          planId: row.id,
                          fromDashboard: true,
                        }
                      }}
                      >
                        {row.label}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {row.createdAt}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={{
                        pathname: '/meal-designer',
                        state: {
                          planId: row.id,
                          fromDashboard: true,
                        }
                      }}
                      >
                        <EditIcon />
                      </Link>
                    </TableCell>
                    <TableCell align="right"><Link to='/copy-plan'><FileCopyIcon /></Link></TableCell>
                    <TableCell align="right"><Link to='/delete-plan'><DeleteIcon /></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer/>
    </>
  )
}

Dashboard.propTypes = {
  mealPlans: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        nameEn: PropTypes.string,
        createdAt: PropTypes.string
      })
    )
  })
}

const query = graphql`
query DashboardQuery	 {
  mealPlans {
    nodes {
      id
      nameEn
      createdAt
    }
  }
}
`

function DashboardWithQuery() {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{}}
      render={({ error, props }) => <Dashboard error={error} {...props} />}
    />
  )
}

export default DashboardWithQuery