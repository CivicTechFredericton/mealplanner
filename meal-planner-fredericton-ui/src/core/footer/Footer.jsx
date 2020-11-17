import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import {MenuList} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (() => ({
  footerContainer: {
    backgroundColor: '#22242b',
  },
  footerInnerContainer: {
    maxWidth: 1176,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 0,
    color: 'white',
    '& a' : {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Open Sans',
      padding: 0,
      lineHeight: 1.5
    },
    '& h2': {
      fontSize: 18,
      fontWeight: 700,
      fontFamily: 'Open Sans',
    },
    footerText: {
      fontStyle: 'italic',
      marginBottom: 40,
      color: 'white'
    }
  },
}));
const Footer = (props) => {
  const styles = useStyles(props);
  const [State, setState] = useState({data:[], components:[]});
  useEffect( () => {
    const data = [
      {
        links:[
          {
            name: 'Powered by CivicTechFredericton'
          }
        ]
      },
      {
        links:[
          {
            name: 'About Us'
          },
          {
            name: 'Contact Us'
          }
        ]
      },
      {
        links:[
          {
            name: 'Greener Village',
            links: 'https://www.greenervillage.ca'
          },
          {
            name: 'Privacy Policy',
            links: 'https://www.yahoo.ca'
          }
        ]
      }
    ];
    setState({...State, data});
  }, []);

  useEffect(() => {
    if (State.data.length > 0){
      const components = [];
      State.data.forEach(
        result => {
          console.log(result, 'This is text');
          const component = outColumn(result);
          components.push(component);
        }
      );
      setState({...State, components});
    }
  }, [State.data]);

  const outColumn = (data) => {
    console.log('Seperate', data);
    return (
      <Grid key={'Column'+data.title} item xs={12} sm={3}>
        <h2>
          {data.title}
        </h2>
        {inColumn(data.links, data)}
      </Grid>
    );
  };

  const inColumn = (links) => {
    console.log('Seperate2', links);
    return(
      <div>
        {links.map((item, id) => (
          <MenuList key={id}>
            <MenuItem key={id} component={Link} to={item.name}>
              {item.name}
            </MenuItem>
          </MenuList>
        ))}
      </div>
    );
  };

  return (
    <Grid className={styles.footerContainer}>
      <Grid item className={styles.footerInnerContainer}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start">
        {
          State.components
        }
      </Grid>
    </Grid>
  );
};
export default Footer;
