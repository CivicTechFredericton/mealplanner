import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import Grid from '@material-ui/core/Grid';
//import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import { useParams } from "react-router-dom";
import { QueryRenderer} from 'react-relay';
import environment from '../relay-environment';
import StarRating from '../components/starRating/StarRating';

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100vh',
//     margin: "5px"
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     width:'150px',
//     height: '150px',
//     borderRadius: '50%',
//     backgroundColor:'#eee',
//     flexGrow:'unset',

//     [theme.breakpoints.down('sm')]: {
//       width:'120px',
//       height: '120px',
//     }
//   },
//   form: {
//     margin: theme.spacing(4),
//     alignItems: 'center',
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

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
                        nutritionRating
			measures {
			      nodes {
			        quantity
			        unit
			        product {
			          nameEn
			          quantity
			          unit
			        }
			      }
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
};

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
              <h2>Nutrition Score: <StarRating halfStars={props.mealById.nutritionRating}></StarRating></h2>
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
                  {props.mealById.measures.nodes.map(measure => (
			  <div>
                    <dt key={measure} style={{float: 'left', width: '15%', textAlign: 'right', paddingRight: '2%'}}>
                      {measure.quantity}&nbsp;
                      {measure.unit}&nbsp;
                    </dt>
                    <dd>
                      {measure.product.nameEn}
                    </dd>
			  </div>
                  ))}
                </dl>
              </p>
            </Box>
          </Grid>
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
  );
  return <div>Loading</div>;
};
  
export default DisplayMeal;
