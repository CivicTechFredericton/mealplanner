import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import { useParams } from "react-router-dom";
import { QueryRenderer} from 'react-relay';
import environment from '../relay-environment';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    margin: "5px"
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
  form: {
    margin: theme.spacing(4),
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NutritionTable = withStyles(theme => ({
  root: {
    "& td, th": {
      color: theme.palette.text.secondary,
      fontSize: 20
    }
  },
}))(Table);

const DisplayMeal = (props) => {
  let { id } = useParams();
  console.log(id);
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
                query DisplayMealQuery($mealID: ID!) {
                    mealById(id: $mealID) {
                        nameEn
                        photoUrl
                        videoUrl
                        method
                        descriptionEn
                        cookingDuration
                        serves
                        products {
                            nodes {
                              nameEn
                              unit
                              quantity
                            }
                        }
                        nutrition {
                          calcium
                          calories
                          carbohydrate
                          carbohydratePercent
                          carbohydrateUnit
                          cholesterol
                          cholesterolPercent
                          cholesterolUnit
                          dietaryFiber
                          dietaryFiberPercent
                          dietaryFiberUnit
                          iron
                          potassium
                          protein
                          proteinPercent
                          proteinUnit
                          saturatedFat
                          saturatedFatPercent
                          saturatedFatUnit
                          servingSize
                          servingSizeText
                          servingSizeUnit
                          servingsPerContainer
                          sodium
                          sodiumPercent
                          sodiumUnit
                          totalFat
                          totalFatPercent
                          totalFatUnit
                          totalSugar
                          totalSugarPercent
                          totalSugarUnit
                          transFat
                          transFatPercent
                          transFatUnit
                          vitA
                          vitB12
                          vitB6
                          vitC
                          vitD
                          vitE
                          vitK
                        }
                    }
                }
        `}
      render={renderQuery}
      variables={{
        mealID: id,
      }}
    />
  );
}

const renderQuery = ({error, props}) => {
  console.log(props);
  if (error || props === undefined) {
    return (
      <Grid container component="main" style={{paddingTop: 75}} xs={12}>
        <Header />
        <h2>Error: Meal Not Found</h2>
        <Grid style={{marginTop: 175}}>
          <Footer />
        </Grid>
      </Grid>
    );
  } else if (props) return (
    <div>
      <Header />
      <Grid container component="main" style={{paddingTop: 75, fontFamily: 'Open Sans'}} xs={12}>
        <Grid item xs={12}>
          <Typography variant="body" color="textSecondary" align="center">
            <h1>{props.mealById.nameEn}</h1>
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Typography align="center">
              <img src={props.mealById.photoUrl} width="400" height="400"/>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box mt={10} ml={3} mr={5}>
              <h2 style={{whiteSpace: 'pre-wrap'}}>
                {props.mealById.descriptionEn}{"\n"}
                            Ready in: {props.mealById.cookingDuration} minutes{"\n"}
                            Serves: {props.mealById.serves}
              </h2>
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6} m={10}>
            <Box m={10}>
              <h2>Ingredients: </h2>
              <p style={{fontSize: 20}}>
                <dl>
                  {props.mealById.products.nodes.map(product => (
                    <dt key={product}>
                      {product.quantity}&nbsp;
                      {product.unit} of&nbsp;
                      {product.nameEn}
                    </dt>
                  ))}
                </dl>
              </p>
            </Box>
          </Grid>
          {props.mealById.nutrition &&
          <Grid item xs={6} m={10}>
            <Box m={10}>
              <h2>Nutritional Information: </h2>
              <div style={{fontSize: 20}}>
                <p>Serving Size: {props.mealById.nutrition.servingSize} {props.mealById.nutrition.servingSizeText}</p>
                {props.mealById.nutrition.servingsPerContainer && 
                  <p>Servings per Container: {props.mealById.nutrition.servingsPerContainer}</p>
                }
                <p>Calories: {props.mealById.nutrition.calories}</p>
                <NutritionTable>
                  <TableHead>
                    <TableRow>
                      <TableCell>Amount</TableCell><TableCell align="right">% Daily Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Fat</strong>&nbsp; {props.mealById.nutrition.totalFat} {props.mealById.nutrition.totalFatUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.totalFatPercent && props.mealById.nutrition.totalFatPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>&nbsp;&nbsp;Saturated&nbsp; {props.mealById.nutrition.saturatedFat} {props.mealById.nutrition.saturatedFatUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.saturatedFatPercent && props.mealById.nutrition.saturatedFatPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>&nbsp;&nbsp;+ Trans&nbsp; {props.mealById.nutrition.transFat} {props.mealById.nutrition.transFatUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.transFatPercent && props.mealById.nutrition.transFatPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Cholesterol</strong>&nbsp; {props.mealById.nutrition.cholesterol} {props.mealById.nutrition.cholesterolUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.cholesterolPercent && props.mealById.nutrition.cholesterolPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Sodium</strong>&nbsp; {props.mealById.nutrition.sodium} {props.mealById.nutrition.sodiumUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.sodiumPercent && props.mealById.nutrition.sodiumPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Carbohydrate</strong>&nbsp; {props.mealById.nutrition.carbohydrate} {props.mealById.nutrition.carbohydrateUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.carbohydratePercent && props.mealById.nutrition.carbohydratePercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>&nbsp;&nbsp;Fibre&nbsp; {props.mealById.nutrition.dietaryFiber} {props.mealById.nutrition.dietaryFiberUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.dietaryFiberPercent && props.mealById.nutrition.dietaryFiberPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>&nbsp;&nbsp;Sugar&nbsp; {props.mealById.nutrition.totalSugar} {props.mealById.nutrition.totalSugarUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.totalSugarPercent && props.mealById.nutrition.totalSugarPercent + "%"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Protein</strong>&nbsp; {props.mealById.nutrition.protein} {props.mealById.nutrition.proteinUnit}</TableCell>
                      <TableCell align="right">{props.mealById.nutrition.proteinPercent && props.mealById.nutrition.proteinPercent + "%"}</TableCell>
                    </TableRow>
                    {props.mealById.nutrition.vitA && 
                    <TableRow>
                      <TableCell>Vitamin A</TableCell><TableCell align="right">{props.mealById.nutrition.vitA} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitB6 && 
                    <TableRow>
                      <TableCell>Vitamin B6</TableCell><TableCell align="right">{props.mealById.nutrition.vitB6} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitB12 && 
                    <TableRow>
                      <TableCell>Vitamin B12</TableCell><TableCell align="right">{props.mealById.nutrition.vitB12} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitC && 
                    <TableRow>
                      <TableCell>Vitamin C</TableCell><TableCell align="right">{props.mealById.nutrition.vitC} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitD && 
                    <TableRow>
                      <TableCell>Vitamin D</TableCell><TableCell align="right">{props.mealById.nutrition.vitD} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitE && 
                    <TableRow>
                      <TableCell>Vitamin E</TableCell><TableCell align="right">{props.mealById.nutrition.vitE} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.vitK && 
                    <TableRow>
                      <TableCell>Vitamin K</TableCell><TableCell align="right">{props.mealById.nutrition.vitK} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.calcium && 
                    <TableRow>
                      <TableCell>Calcium</TableCell><TableCell align="right">{props.mealById.nutrition.calcium} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.iron && 
                    <TableRow>
                      <TableCell>Iron</TableCell><TableCell align="right">{props.mealById.nutrition.iron} %</TableCell>
                    </TableRow>
                    }
                    {props.mealById.nutrition.potassium && 
                    <TableRow>
                      <TableCell>Potassium</TableCell><TableCell align="right">{props.mealById.nutrition.potassium} %</TableCell>
                    </TableRow>
                    }
                  </TableBody>
                </NutritionTable>
              </div>
            </Box>
          </Grid>
          }
          <Grid item xs={6}>
            <Box m={10}>
              <h2>Direction: </h2>
              <p style={{fontSize: 20, whiteSpace: 'pre-wrap'}}>
                {props.mealById.method}
              </p>
            </Box>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Box ml ={10} mr={10}>
            <iframe width="840" height="480" 
              src={props.mealById.videoUrl} 
              frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
                            picture-in-picture; fullscreen" allowFullScreen>
            </iframe>
          </Box>
        </Grid>  
      </Grid>
      <Grid style={{marginTop: 100}}>
        <Footer />
      </Grid>
    </div>
  )
  return <div>Loading</div>;
}
  
export default DisplayMeal;