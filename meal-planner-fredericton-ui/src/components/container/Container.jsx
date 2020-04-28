import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles (theme => ({
    container:{
        margin:'auto',
        backgroundColor: '#fff',
        minHeight:'600px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            maxWidth: '100%',
          }
    }
}));


const Container = (props) => {
    const {children, maxWidth, width} = props;
    
    //const maxWidth = setcontainerWidth();

    let containerWidth = width;
    
   if(!containerWidth){
       containerWidth = maxWidth;
   }

    const classes = useStyles();

    return (
    
           <Box className={classes.container} width={containerWidth} maxWidth={maxWidth}>
               {children}
           </Box>   
        
    )
}
Container.defaultProps = {
    maxWidth: '1280px'
}
export default Container;