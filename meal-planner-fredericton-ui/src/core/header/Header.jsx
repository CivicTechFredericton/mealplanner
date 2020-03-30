import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
//import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneIcon from '@material-ui/icons/Phone';

const logo = require('../../Logo.png');


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  alignItemsFlexStart: {
    justifyContent: 'flex-end'
  },
  appBar: {
    //   position: 'relative',
    boxShadow: 'none',
    backgroundColor: 'rgba(0 ,0 ,0 ,0.7)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  },
  productLogo: {
    // display: 'inline-block',
    marginLeft: 25,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: 33
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft:0,
      paddingLeft:0,
    }
  },
  menu: {
    display:'flex',
        
    '& a' : {
      display: 'block',
      fontSize: 16,
      color:'#ffffff',
      padding: '18px 5px',
      marginRight: 55,
      textDecoration: 'none',
      fontFamily: 'Open Sans',
      fontWeight:600
    },
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
          
      '& button' :{
        color: '#fff',
      },
    },
  },
  menuContainer: {
    marginLeft: 32,
    display:'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },

  contact: {
    backgroundColor: '#313038',
    opacity:1,
    color: '#ffffff',
    fontSize:'16px',
    textTransform:'capitalize',
    paddingLeft:15,
    paddingRight:30,
    '& span': {
      flexDirection: 'row'
    }
  },
  phone: {
    backgroundColor: '#7ac073',
    borderRadius: '50%',
    padding: 5,
    marginRight: 16
  },
  contact2: {
    backgroundColor: '#7ac073',
    color: '#ffffff',
    opacity:1
  }
 
}));



const Header = (props) => {
  const styles = useStyles(props);
    
  const navMenu = [
    {
      id: 1,
      label: 'Home',
      pathname: '/'
    },
    {
      id: 2,
      label: 'About Us',
      pathname: '/about',
      subitems: [
        {
          id: 1,
          label: 'Subitem 1',
          pathname: '/',
        },
        {
          id: 2,
          label: 'Subitem 2',
          pathname: '/',
        },
        {
          id: 3,
          label: 'Subitem 3',
          pathname: '/',
        }
      ]
    },
    {
      id: 3,
      label: 'Pages',
      pathname: '/pages',
    },
    {
      id: 4,
      label: 'News',
      pathname: '/news'
    },
    {
      id: 5,
      label: 'Contact',
      pathname: '/contact'
    }
  ];
   
   
  const [, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);
  
  const handleClick = onItemClick => {
    onItemClick();
    handleClose();
  };

  return (<div className={styles.root} ><AppBar position="absolute" className={styles.appBar}>
    <Toolbar elevation={0} spacing={0}>
      <Grid container spacing={24} alignItems="baseline">
        <Grid item xs={12} className={styles.flex}>
          <div className={styles.inline}>
            <Link to='/' className={styles.link}>
              <img width={159} src={logo} alt="" className={styles.productLogo}/>
            </Link>
                    
          </div>
                  
          <>
                    
            <div className={styles.iconContainer}>
                  
              <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
                    
                    
            </div>
            <nav className={styles.menuContainer}>
                    
              <MenuList id="menu" className={styles.menu}>
                {navMenu.map( item => (
                  <MenuItem key={item.id} >
                    <Link to={item.pathname}>{item.label}</Link>
                  </MenuItem>
                ))}
              </MenuList>
                      
              <Tab label="Call Us Now!" className={styles.contact} component={Link} icon={<PhoneIcon className={styles.phone}/>} to="/contact" />
              <Tab label="+1 (506) 123-4567" className={styles.contact2} />
                    
            </nav>
                    
                    
          </>
                  
        </Grid>
      </Grid>

    </Toolbar>
  </AppBar>
  </div>
  );
};

export default withRouter(Header);