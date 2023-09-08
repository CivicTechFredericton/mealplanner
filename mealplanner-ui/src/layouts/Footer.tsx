//Reference: https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sticky-footer/StickyFooter.tsx
import { Box, Container, Typography } from "@mui/material";
import Logo from "../CivicTechLogo.png";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl">
      <Box display= "flex" alignItems= "center" justifyContent="center">
          <Typography variant="body1" align="center">
            For Greener Village.Developed by
          </Typography>
          <img src={Logo} alt="Logo" style={{width: "10%", height: "auto", marginLeft: 1}} /> 
        </Box>
        <Typography variant="body2" align="center">
          If you run into issues or have any suggestions or questions, please
          feel free to post your{" "}
          <a
            href="https://www.civictechfredericton.com/gmpfeedback.html"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            feedback
          </a>
        </Typography>
      </Container>
    </Box>
  );
}
