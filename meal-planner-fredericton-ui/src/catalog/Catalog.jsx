import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CatalogGridList from "./CatalogGridList";
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    flexDirection: 'column',
    flex: 0
  },
});

const Catalog = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Header />
      <Grid container component="main" className={classes.root} style={{paddingTop: 75}}>
        <Box>
          <CssBaseline />
          <Typography variant="body2" color="textSecondary" align="center">
            <h1>Meal Catalog</h1>
            <CatalogGridList />
          </Typography>
        </Box>  
      </Grid>
      <Grid style={{paddingTop: 10}}>
        <Footer />
      </Grid>
    </Grid>
  );
};
  
export default Catalog;