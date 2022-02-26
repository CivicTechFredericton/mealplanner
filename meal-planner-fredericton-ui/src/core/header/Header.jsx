import React from "react";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../../Logo.png";
import NewLogo from "../../NewLogo.png";
import StarIcon from "@material-ui/icons/Star";
import SettingIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { useTranslation } from "react-i18next";
import { isAuthenticated, logout } from "../../utils/auth";

import graphql from 'babel-plugin-relay/macro';
import { createRefetchContainer, QueryRenderer } from "react-relay";
import environment from "../../relay-environment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  alignItemsFlexStart: {
    justifyContent: "flex-end",
  },
  appBar: {
    // position: 'relative',
    height: 74,
    boxShadow: "none",
    backgroundColor: "rgba(0 ,0 ,0 ,0.7)",
    paddingTop: 0,
    paddingBottom: 0,
  },
  tBar: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  flex: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  },
  link: {
    textDecoration: "none",
    color: "#ffffff",
  },
  productLogo: {
    // display: 'inline-block',
    // marginLeft: 25,
    marginLeft: 24,
    marginTop: 8,
    [theme.breakpoints.up("md")]: {
      // paddingTop: 8,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      paddingLeft: 0,
    },
  },
  menu: {
    display: "flex",
    "& li:hover": {
      backgroundColor: "#7ac073",
    },
    "& a": {
      display: "block",
      fontSize: 16,
      color: "#ffffff",
      padding: "18px 5px",
      textDecoration: "none",
      fontFamily: "Open Sans",
      fontWeight: 600,
    },
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",

      "& button": {
        color: "#fff",
      },
    },
  },
  menuContainer: {
    marginLeft: 32,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  contact: {
    opacity: 1,
    color: "#ffffff",
    fontSize: "16px",
    textTransform: "capitalize",
    paddingLeft: 15,
    paddingRight: 30,
    "& span": {
      flexDirection: "row",
    },
    "& :hover": {
      opacity: "0.7",
    },
  },
  phone: {
    backgroundColor: "#7ac073",
    borderRadius: "50%",
    padding: 5,
    marginRight: 16,
  },
  contact2: {
    backgroundColor: "#7ac073",
    color: "#ffffff",
    opacity: 1,
  },
  rightnav: {
    marginLeft: "auto",
    order: 3,
    display: "flex",
    alignItems: "center",
    marginRight: 24,
  },
  selectedPath: {
    textDecoration: "underline",
    "& a": {
      color: theme.palette.secondary.main,
    },
    "& :hover": {
      color: theme.palette.secondary.contrastText,
    },
  },
  username: {
    textDecoration: "none",
    fontFamily: "Open Sans",
    fontWeight: 500,
    fontSize: 16,
    width: "100px",
  },
}));

const Header = (props) => {
  const { t } = useTranslation(["common", "authentication", "meal"]);

  const styles = useStyles();
  const location = useLocation();
  let scrollBar = false;
  if (window.innerWidth > document.body.clientWidth) {
    scrollBar = true;
  }

  const navMenu = [];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  // only add link to protected page if user authenticated
  navMenu.push({
    label: t("meal:lblCatalogueofMeals"),
    pathname: "/catalogue-meals",
  });
  if (isAuthenticated()) {
    navMenu.push({
      label: t("meal:lblMealDesigner"),
      pathname: "/meal-designer",
    });
  }
  if (false) {
    // gone until shopping list is implemented
    navMenu.push({
      label: t("meal:lblShoppingList"),
      pathname: "/shopping-list",
    });
  }

  return (
    <AppBar className={styles.appBar}>
      <Toolbar elevation={0} spacing={0} padding={0} className={styles.tBar}>
        <Grid
          container
          spacing={2}
          alignItems="baseline"
          className={styles.flex}
        >
          <Grid item xs={2}>
            <Link to="/" className={styles.link}>
              <img
                width={154}
                height={40}
                src={NewLogo}
                alt=""
                className={styles.productLogo}
              />
            </Link>
          </Grid>
          <Grid item md={10} xs={1}>
            <>
              <div className={styles.iconContainer}>
                <IconButton aria-controls="menu" aria-haspopup="true">
                  <MenuIcon />
                </IconButton>
              </div>

              <nav className={styles.menuContainer}>
                <MenuList id="menu" className={styles.menu}>
                  {navMenu.map((item) => {
                    const className =
                      item.pathname === location.pathname
                        ? styles.selectedPath
                        : "";
                    return (
                      <MenuItem className={className} key={item.label}>
                        <Link to={item.pathname}>
                          <span>{item.label}</span>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </MenuList>
                <div className={styles.rightnav}>
                  {true ? (
                    <></> // temporarily removed
                  ) : (
                    <Tab
                      label={t("common:lblFavorites")}
                      className={styles.contact}
                      component={Link}
                      icon={<StarIcon className={styles.phone} />}
                      to="/favorites"
                    />
                  )}
                  {true ? (
                    <></> // temporarily removed
                  ) : (
                    <Tab
                      label={t("common:lblSettings")}
                      className={styles.contact}
                      component={Link}
                      icon={<SettingIcon className={styles.phone} />}
                      to="/settings"
                    />
                  )}
                  {!isAuthenticated() ? (
                    <Tab
                      label={t("authentication:lblLogin")}
                      className={styles.contact}
                      onClick={logout}
                      component={Link}
                      icon={<PersonIcon className={styles.phone} />}
                      to="/profile"
                    />
                  ) : (
                    <>
                      <div
                        // style={{
                        //   height: 30,
                        //   paddingTop: 7,
                        //   boxSizing: "revert",
                        //   // width: 80,
                        // }}
                      >
                        {" "}
                        <span className={styles.username}>{props.currentPerson && props.currentPerson.fullName}</span>
                      </div>

                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={menuClick}
                        // style={{
                        //   height: 20,
                        //   width: 20,
                        //   verticalAlign: "middle",
                        // }}
                      >
                        <AccountCircle
                          style={{ color: "white", height: 30, width: 30 }}
                        />
                      </IconButton>

                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={menuClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        style={
                          scrollBar
                            ? { left: -30, top: -5 }
                            : { left: -12, top: -5 }
                        }
                      >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>
                    </>
                  )}
                </div>
              </nav>
            </>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const query = graphql`
  query HeaderQuery {
    currentPerson {
      fullName
    }
  }
`;

const CurrentUserContainer = createRefetchContainer(
  withRouter(Header),
  {},
  query
);

export default function CurrentUserQuery() {
  return (
    <QueryRenderer
      environment={environment}
      query={query}
      variables={{}}
      render={({error, props})=><CurrentUserContainer error={error} {...props} />}
    />
  );
}
