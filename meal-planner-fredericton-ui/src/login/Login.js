import React, { useState } from 'react';

import graphql from 'babel-plugin-relay/macro';
import { commitMutation } from 'react-relay';
import environment from '../relay-environment'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ImageCarousel from "./ImageCarousel";

import { setCurrentToken } from '../utils/auth'

const authMutation = graphql`
mutation LoginMutation(
  $userEmail: String,
  $password: String
) {
  authenticate(input: {
    userEmail: $userEmail
    password: $password
  }) {
    jwtToken
  }
}
`;

const authenticate = ({ userEmail, password }) => {
  return new Promise((resolve, reject) => {
    commitMutation(
      environment,
      {
        mutation: authMutation,
        variables: { userEmail, password },
        onCompleted: (response, errors) => {
          if (errors) {
            reject(errors)
          }
          const { authenticate: { jwtToken } } = response
          resolve(jwtToken)
        },
        onError: err => {
          reject(err)
        }
      }
    )
  })
};

const Explanation = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    '& .MuiOutlinedInput-root': {
      color: 'black',
    }
  },
  paper: {
    margin: theme.spacing(8, 4),
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    margin: theme.spacing(4),
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FindOutMore = (props) => {
  const classes = useStyles();
  return(
    <Box m={12} position="absolute" left={0} top={50} right={600}>
      <Typography variant="body2" color="textPrimary" align="center">
        <h1 style={{fontSize: 50}}>Looking for a healthier diet?</h1>
        <p>Donec eget efficitur ex. Donec eget dolor vitae eros feugiat tristique id vitae massa. Proin vulputate congue rutrum. Fusce lobortis a enim eget tempus. Class aptent taciti sociosqu ad litora torquent per conubia.</p>
      </Typography> 
      <Button
        type="submit"
        fullWidth={false}
        variant="contained"
        color="primary"
        size="large"
        className={classes.submit}
      >
        FIND OUT MORE
      </Button>
    </Box>
  );
};

const LoginForm = (props) => {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCreds, setInvalidCreds] = useState(false);
  const [submitError, setSubmitError] =  useState(null);

  const handleSubmit = async () => {
    try {
      setInvalidCreds(false)
      const jwtToken = await authenticate({ userEmail, password })
      if (jwtToken === null) {
        setInvalidCreds(true)
      }
      setCurrentToken(jwtToken)
      window.location = "/"
    } catch (e) {
      setSubmitError(e);
    }
  }

  return(
    <Box  component={Paper} elevation={12} square
      position="absolute"
      left={600}
      top={15}
      m={12}
      // bgcolor="primary.main"
    >
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => setUserEmail(e.target.value)}
          value={userEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Box mt={5}>
          {invalidCreds 
            ? (<div style={{ color: "red" }}>CREDS INVALID TODO BETTER ERROR</div>) 
            : <Explanation />
          }
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          className={classes.submit}
          onClick={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  )
}

const Login = (props) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container zIndex="modal" positions="relative" >
        <ImageCarousel/>
      </Grid>
      <Grid container spacing ={3}  zIndex="tooltip">
        {/* <Grid sm = {12} zIndex="modal">
          <ImageCarousel />
        </Grid> */}
        <Grid sm = {6}>
          <FindOutMore/>
        </Grid>
        <Grid sm = {6}>
          <LoginForm/>
        </Grid>
      </Grid>  
    </Grid>   
  );
}

export default Login;