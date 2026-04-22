import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";

export const Layout = () => {
  const location = useLocation();
  const isTermsPage = location.pathname === '/terms';
  const isLandingPage = location.pathname === '/';
  
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        {!isTermsPage && !isLandingPage && <ResponsiveAppBar />}
        <Outlet />
        {!isLandingPage && <Footer />}
      </Box>
    </React.Fragment>
  );
};
