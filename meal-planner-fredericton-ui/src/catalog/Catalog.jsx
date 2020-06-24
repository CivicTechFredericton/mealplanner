import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CatalogGridList from "./CatalogGridList";
import Header from '../core/header/Header'
import Footer from '../core/footer/Footer'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
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

const Catalog = (props) => {
    const classes = useStyles();
    return (
        <div>
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
            <Grid style={{paddingTop: 100}}>
                <Footer />
            </Grid>
        </div>
    );
}
  
export default Catalog;