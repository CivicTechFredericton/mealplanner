import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import {MenuList} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles (theme => ({
  footerContainer: {
    backgroundColor: '#22242b',
  },
  footerInnerContainer: {
    maxWidth: 1176,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 50,
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
        title:"What we do",
        links:[
          {
            name: "Loans",
            links: "https://wwww.google.ca"
          },
          {
            name: "Car Loans",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Debt consolidated Loans",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Home improvement loans",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Wedding loans",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Innovative finance ISA",
            links: "https://www.yahoo.ca"
          }
        ]
      },
      {
        title:"About",
        links:[
          {
            name: "About us",
            links: "https://wwww.google.ca"
          },
          {
            name: "Our Story",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Meet the board",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Meet the leadership team",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Awards",
            links: "https://www.yahoo.ca"
          },{
            name: "Careers",
            links: "https://www.yahoo.ca"
          }
        ]
      },
      {
        title:"Legal",
        links:[
          {
            name: "Privacy policy",
            links: "https://wwww.google.ca"
          },
          {
            name: "Loans2go principles",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Website terms",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Cookie policy",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Conflicts policy",
            links: "https://www.yahoo.ca"
          }
        ]
      },
      {
        title:"Site info",
        links:[
          {
            name: "Support",
            links: "https://wwww.google.ca"
          },
          {
            name: "FAQ",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Sitemap",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Careers",
            links: "https://www.yahoo.ca"
          },
          {
            name: "Contact us",
            links: "https://www.yahoo.ca"
          },
        ]
      }
    ];
    setState({...State, data})
  }, []);

  useEffect(() => {
    if (State.data.length > 0){
      const components = [];
      State.data.forEach(
        result => {
          console.log(result, "This is text");
          const component = outColumn(result);
          components.push(component)
        }
      );
      setState({...State, components})
    }
  }, [State.data]);

  const outColumn = (data) => {
    console.log("Seperate", data);
    return (
      <Grid key={"Column"+data.title} item xs={12} sm={3}>
        <h2>
          {data.title}
        </h2>
        {inColumn(data.links, data)}
      </Grid>
    )
  };

  const inColumn = (links) => {
    console.log("Seperate2", links);
    return(
      <div>
        {links.map((item, id) => (
          <MenuList>
            <MenuItem key={id} component={Link} to={item.name}>
              {item.name}
            </MenuItem>
          </MenuList>
        ))}
      </div>
    )
  };

  return (
    <Grid className={styles.footerContainer}>
      <Grid item className={styles.footerInnerContainer}
        container
        direction="row"
        justify="center"
        alignItems="flex-start">
        {
          State.components
        }
      </Grid>
    </Grid>
  );
};
export default Footer;
