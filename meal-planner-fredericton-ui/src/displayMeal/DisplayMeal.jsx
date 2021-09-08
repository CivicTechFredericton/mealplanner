import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import Grid from '@material-ui/core/Grid';
//import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Header from '../core/header/Header';
import Footer from '../core/footer/Footer';
import { useParams } from "react-router-dom";
import { QueryRenderer} from 'react-relay';
import environment from '../relay-environment';
import StarRating from '../components/starRating/StarRating';
import IframeResizer from 'iframe-resizer-react';

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
      <Grid container component="main" style={{fontFamily: 'Open Sans'}} xs={12}>
        <Grid justify="center" item xs={12}>    
            <Image cover={true} src={props.mealById.photoUrl}/>
        </Grid>
        <Grid xs={12} component="body" color="textSecondary" >
          <Box paddingLeft="2%" paddingRight="2%">
            <div style={{fontSize: 60 }}><ArrowBackIosIcon fontSize="large"/>{props.mealById.nameEn}
            &nbsp;
            <Button style={{backgroundColor: '#6aa64a', color: 'white', float: 'right', marginTop: '2em'}} variant="contained"><AddIcon/>Add Meal</Button>
            </div>  
          </Box>                                                                                                     
        </Grid>
        <Grid container xs={12}>
          <Grid xs={6}>
            <Box mt={2} ml={10} mr={4}>
              <IframeResizer width="100%" height={400}
                src={props.mealById.videoUrl} 
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
                              picture-in-picture; fullscreen" allowFullScreen>
              </IframeResizer>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box mt={2} mr={10}>
              <p>{props.mealById.descriptionEn}</p>
            </Box>
          </Grid> 
        </Grid>  
        <Grid container item xs={12}>
          <Grid xs={6}>
            <Box mt={2} ml={10} mr={10}>
              <h2>Nutrition Score: <StarRating halfStars={props.mealById.nutritionRating}></StarRating></h2>
            </Box>
          </Grid> 
          <Grid xs={6}>
            <Box mt={2} mr={10}>
              <div>
                <p><b>Ready in:</b>&nbsp;{props.mealById.cookingDuration} minutes<br/></p>
                <p><b>Serves:</b>&nbsp; {props.mealById.serves}</p>
              </div>  
            </Box>  
          </Grid> 
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Box mt={2} ml={10} mr={10}>
              <h1>Ingredients</h1>
              <p style={{fontSize: 20}}>
                <dl>
                  {props.mealById.measures.nodes.map(measure => (
			          <div>
                    <p>
                      {measure.product.nameEn}&nbsp;-&nbsp;               
                      {measure.quantity}&nbsp;
                      {measure.unit}&nbsp;                    
                    </p>             
			          </div>
                  ))}
                </dl>
              </p>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={2} mr={10}>
              <h1>Directions</h1>
              <p style={{fontSize: 20}}>
                {props.mealById.method}
              </p>
            </Box>
          </Grid>
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
