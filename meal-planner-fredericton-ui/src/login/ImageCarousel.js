import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Box from '@material-ui/core/Box';
import login1 from "./login1.jpg";
import login2 from "./login2.jpg";
import login3 from "./login3.jpg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const carouselImages = [
    login1, login2, login3
];

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 768,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
  },
  img: {
    // height: 500,
    display: 'block',
    // maxWidth: 768,
    overflow: 'hidden',
    width: '100%',
  },
  dots :{
    position:'relative',
    top: -40,
    background: 'transparent',
    '& .MuiMobileStepper-dots' :{
      width:35,
      margin:'auto'
    }
  }
}));

const ImageCarousel = (props) =>{
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = carouselImages.length;

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <Box>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        interval={5000}
      >
        {carouselImages.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        className={classes.dots}
      />
    </Box>
  );
}

export default ImageCarousel;
