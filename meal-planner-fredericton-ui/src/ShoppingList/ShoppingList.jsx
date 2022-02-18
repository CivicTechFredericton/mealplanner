import Header from '../core/header/Header';
import Footer from "../core/footer/Footer";
import Container from "../components/container/Container";

import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useParams} from 'react-router-dom';
import { QueryRenderer } from 'react-relay';
import environment from '../relay-environment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, useTheme } from '@material-ui/core';
import moment from 'moment';
import PrintIcon from '@material-ui/icons/Print';
import {Button} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    header: {
        position: 'relative',
    },
    spacer: {
        minHeight: 180,
        [theme.breakpoints.down('sm')]: {
            minHeight: "150px",
        }
    },
    fontStyle: {
        fontFamily: "Raleway, \"Helvetica Neue\", sans-serif",
    },
    ul: {
        listStyleType: "none",
    },
    ['@media print']: {
        headerWrapper: {
            display: "none"
        },
        spacer: {
            display: "none"
        },
        footerWrapper: {
            display: "none"
        },
        printButton: {
            display: "none"
        }
    }

})
);

const RenderQuery = ({ error, props }) => {
    // const classes = useStyles();
    console.log('Insider renderquery');
    if (error || (props === undefined))
        return (
            <div>
                Error: Meal ID not found
            </div>
        );
    else if (props === null)
        return (
            <div>Loading...</div>
        );
    else
        return (
            <ShoppingListDisplay mealPlan={props.mealPlan} />
        );
};

const ShoppingListDisplay = ({ mealPlan }) => {
    const classes = useStyles();
    let totalPrice = 0;
    mealPlan.shoppingList.nodes.forEach(item => {
        totalPrice += Number(item.product.price);
    });
    totalPrice = parseFloat(totalPrice).toFixed(2);
    return (
        <div>
            <Grid container fluid>
                <Grid container spacing="5">
                    <Grid item>
                        <Typography variant="caption">
                            {mealPlan.person &&  `Prepared for ${mealPlan.person.fullName}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">
                            Week {moment().startOf('week').format("MMMM DD")} - {moment().endOf('week').format("MMMM DD")}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs="8">
                    <Typography variant="h4">{mealPlan.nameEn} <br />Shopping List &nbsp;
                    <Button className={classes.printButton} to="#" onClick={()=>{window.print();}}>
                    <PrintIcon></PrintIcon>
                    </Button>
                    </Typography>
                </Grid>
                <Grid item xs="4">
                    <Typography>Estimate<Typography variant="h2">${totalPrice}</Typography></Typography>

                </Grid>

                <Grid item xs="12">
                    <Typography variant="caption">{mealPlan.descriptionEn}</Typography>
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "#000" }}>Bought?</TableCell>
                            <TableCell style={{ color: "#000" }}>Item/Description</TableCell>
                            <TableCell style={{ color: "#000" }}>Quantity/Unit</TableCell>
                            <TableCell style={{ color: "#000" }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <ul className={classes.ul}> */}
                    {mealPlan.shoppingList.nodes.map(function (item) {
                        return (
                            <TableRow key={item.productId}>
                                <TableCell><Checkbox checked={false} /></TableCell>
                                <TableCell>{item.productName}
                                    <p>{item.quantity} {item.unit}</p>
                                </TableCell>
                                <TableCell>{item.product.quantity} {item.product.unit}</TableCell>

                                <TableCell>{item.product.price}</TableCell>
                            </TableRow>
                        );

                        {/* return (
          <li key={item.productId}> {item.productName} </li>
      ); */}
                    })}

                    {/* </ul> */}

                </Table>
            </TableContainer>

        </div>
    );
};

const ShoppingList = (props) => {
    const classes = useStyles();
    let { rowId } = useParams();
    return (
        <div>
            <Grid className = {classes.headerWrapper}>
                <Header className={classes.header}></Header>
            </Grid>
            <Container>
                <Grid container
                    className={classes.spacer}
                    direction="row"
                    justify="space-evenly"
                    alignItems="center" spacing={6} />
                <QueryRenderer
                    environment={environment}
                    query={graphql`
                query ShoppingListQuery ($rowId: BigInt!) {
                        # mealPlan (id:"WyJtZWFscyIsMV0="){
                        mealPlan(rowId: $rowId) {
                        nameEn
                        descriptionEn
                        person {
                            fullName
                        }
                        shoppingList {
                        nodes {
                                 unit
                                 quantity
                                 productId
                                 productName
                                 product {
                                     price
                                     quantity
                                     unit
                                 }
                        }
                        }
                    }
                }
                `
                    }
                    render={RenderQuery}
                    variables={{ rowId: rowId }}
                >
                </QueryRenderer>
                {/* </Grid> */}
            </Container>
            <Grid className={classes.footerWrapper}>
                <Footer></Footer>
            </Grid>
        </div>
    );
};

export default ShoppingList;