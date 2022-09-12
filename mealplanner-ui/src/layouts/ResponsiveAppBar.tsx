//Reference: https://mui.com/components/app-bar/
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getCurrentPerson, logout } from "../state/state";

const settings = ["Logout"];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const buttonStyle = {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#212121" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src="/images/logo.png" alt="MealPlanner" />
          </Typography>
          {getCurrentPerson().personID !== "" ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  data-testid="account-of-current-user"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem>
                    <Link to="mealplans" onClick={handleCloseNavMenu}>
                      <Typography>Meal Plans</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="meals" onClick={handleCloseNavMenu}>
                      <Typography>Meals</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <img src="/images/logo.png" alt="MealPlanner" />
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button color="info">
                  <Link
                    to="mealplans"
                    onClick={handleCloseNavMenu}
                    style={buttonStyle}
                    data-testid="mealplans-menu"
                  >
                    <Typography>Meal Plans</Typography>
                  </Link>
                </Button>
                <Button>
                  <Link
                    to="meals"
                    onClick={handleCloseNavMenu}
                    style={buttonStyle}
                    data-testid="meals-menu"
                  >
                    <Typography>Meals</Typography>
                  </Link>
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Typography sx={{ display: "inline-block", mr: "12px" }}>
                  {getCurrentPerson().personName}
                </Typography>
                <Tooltip title="Logout">
                  <IconButton
                    //  onClick={handleOpenUserMenu}
                    onClick={async () => {
                      await logout();
                      navigate("");
                    }}
                    sx={{ p: 0, color: "#FFFF" }}
                  >
                    <LogoutIcon />
                    {/* <Avatar alt="MealPlan Designer" src="/static/images/avatar/2.jpg" /> */}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
