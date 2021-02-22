import React, { useState } from 'react';
import PropTypes from 'prop-types';

import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer, createRefetchContainer, commitMutation } from 'react-relay';
import environment from '../relay-environment';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box  from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

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
  },   
  toolbar: {
    color: 'black',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    '& > span': {
      display: 'grid',
      justifyContent: 'right',
    }
  },
  filterMenu: {
    position: 'absolute',
    padding: '16px',
    bottom: '-70%',
    right: 0,
    '& .MuiTypography-root': {
      color: 'black',
      display: 'inline-block',
      marginRight: '10px',
    },
    '& .MuiSelect-root': {
      minWidth: '100px',
      color: 'black'
    },
  },
  filterLisItem: {
    color: 'black'
  }
}));

function doDeleteMeapPlan({ id }) {
  return new Promise(function doDeleteMealPlanPromise(resolve, reject) {
    commitMutation(environment, {
      mutation: graphql`
        mutation DashboardDeleteMealPlanMutation($id: ID!) {
          deleteMealPlanById(input: { id: $id }) {
            deletedMealPlanId
          }
        }
      `,
      variables: { id },
      onCompleted: function onCompleteHandler(response, errors) {
        if (errors) {
          reject(errors);
          return;
        }
        resolve();
      },
      onError: function onErrorHandler(err) {
        reject(err);
      }
    });
  });
}

const Dashboard = props => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [clientsFilter, setClientsFilter] = useState(null);

  const toggleFilterMenuOpen = () => setFilterMenuOpen(!filterMenuOpen);


  const classes = useStyles();
  const rows = (props.mealPlans?.nodes ?? [])
    .filter(meal => {
      if (clientsFilter) {
        return meal.client?.clientId === clientsFilter;
      } else {
        return true;
      }
    })
    .map(meal => ({
      ...meal,
      label: meal.nameEn,
      createdAt: meal.createdAt
    }));



  const filterMenu = filterMenuOpen ? (
    <Paper className={classes.filterMenu}>
      <Typography align="center">
        Client ID:
      </Typography>
      <Select
        value={clientsFilter}
        onChange={e => setClientsFilter(e.target.value)}
      >
        {(props.clients?.nodes ?? []).map(client => (
          <MenuItem
            className={classes.filterLisItem}
            value={client.clientId}
          >
              {client.clientId}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  ) : null;
  



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
            <Paper className={classes.paper} />
            <Typography variant="h6" align="center">
              <Link to='/catalogue-meals' className={classes.link}>Catalogue of Meals</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img} /> 
            </Paper>
            <Typography variant="h6"  align="center">
              <Link to='/catalogue-units' className={classes.link}>Catalogue of Units</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img} />
            </Paper>
            <Typography variant="h6"  align="center">
              <Link to='/catalogue-products' className={classes.link}>Catalogue of Products</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <ButtonBase className={classes.img} />      
            </Paper>
            <Typography variant="h6" align="center">
              <Link to='/clients' className={classes.link}>Clients</Link>
            </Typography>
          </Grid>
        </Grid>

        <Box m={8}>
          <TableContainer component={Paper}>
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">Meal Plans</Typography>
              <span>
                <span>
                  <Tooltip title="Filter list" onClick={toggleFilterMenuOpen}>
                    <IconButton aria-label="filter list">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                </span>
                {filterMenu}
              </span>
            </Toolbar>
            <Table color="primary" className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Meal Plans Created</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell align="center">Date Created</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  {/* <TableCell align="center">Clone</TableCell> */}
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.label}>
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
                    <TableCell>
                      {row.client?.clientId ?? 'Unassigned'}
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
                    {/* <TableCell align="right"><Link to='/copy-plan'><FileCopyIcon /></Link></TableCell> */}
                    <TableCell align="right">
                      <Link onClick={async () => {
                        await doDeleteMeapPlan(row);
                        props.relay.refetch();
                      }}>
                        <DeleteIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

Dashboard.propTypes = {
  mealPlans: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        nameEn: PropTypes.string,
        createdAt: PropTypes.string
      })
    )
  }),
  relay: PropTypes.shape({
    refetch: PropTypes.func.isRequired,
  }).isRequired
};

const query = graphql`
query DashboardQuery	 {
  mealPlans {
    nodes {
      id
      nameEn
      createdAt
      person {
        id
      }
    }
  }
  people {
    nodes {
      id
    }
  }
}
`;


const DashboardRefetchContainer = createRefetchContainer(
  Dashboard,
  {
  },
  query
);

function DashboardWithQuery() {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{}}
      render={({ error, props }) => <DashboardRefetchContainer error={error} {...props} />}
    />
  );
}


export default DashboardWithQuery;