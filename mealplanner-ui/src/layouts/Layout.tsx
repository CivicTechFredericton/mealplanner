import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";

export const Layout = () => {
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
        <ResponsiveAppBar />
        <Outlet />
        <Footer />
      </Box>
    </React.Fragment>
  );
};
