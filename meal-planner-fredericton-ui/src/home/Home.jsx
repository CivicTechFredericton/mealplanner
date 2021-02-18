import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import environment from '../relay-environment';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MealPlans from './MealPlans';

import Header from '../core/header/Header'
import { clearCurrentToken } from '../utils/auth';
import { useTranslation } from 'react-i18next';

const query = graphql`
  query HomeQuery {
    currentPerson {
      fullName
    }
    ...MealPlans_mealPlansFragment
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 90)',
    margin: '100px 0 10px 0',
  },
  text: {
    color: 'black',
  }
}));

const HomeContent = props => {
  const { t } = useTranslation([
    'error',
    'authentication'
  ]);

  const classes = useStyles();

  let personMessage, loginLink = null;
  if (props.currentPerson === null) {
    personMessage = t('authentication:msgNotLoggedIn')
    loginLink = <Link to="/login">{t('authentication:lblLogin')}</Link>;
  } else {
    personMessage = t('authentication:msgYouAre') ` ${props.currentPerson.fullName}`;
    loginLink = (
      <button 
        onClick={e => {
          e.preventDefault();
          clearCurrentToken();
          window.location = '/login';
        }}
      >
        Logout
      </button>
    );
  }

  return (
    <Fragment>
      <Header />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.text}>
            {personMessage}
            {' '}
            {loginLink}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MealPlans mealPlansFragment={props} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

HomeContent.propTypes = {
  currentPerson: PropTypes.object,
};

const renderHome = ({ error, props }) => {
  if(error) {
    console.log(error);
    return <div>{t('error:lblSomethingWentWrong')}</div>;
  }
  if(!props) {
    return <div>{t('error:lblLoading')}</div>;
  }
  return <HomeContent {...props} />;
};

renderHome.propTypes = {
  error: PropTypes.bool,
  props: PropTypes.object,
};


const Home = () => (
  <QueryRenderer
    environment={environment}
    query={query}
    variables={{}}
    render = {renderHome}
  />
);

export default Home;
