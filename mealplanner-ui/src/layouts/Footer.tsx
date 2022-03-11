//Reference: https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sticky-footer/StickyFooter.tsx
import { Box, Container, Typography } from "@mui/material";

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
        <Typography variant="body1" align="center">
          For Greener Village. By Civic Tech Fredericton.
        </Typography>
      </Container>
    </Box>
  );
}
