//Reference: https://github.com/mui/material-ui/blob/master/docs/data/material/getting-started/templates/sticky-footer/StickyFooter.tsx
import { Box, Container, Typography } from "@mui/material";

const hide = `
    @media print{
      #hide{
        display: none !important;
      }
    }
  
  `;

  const newStyle = document.createElement('style');
  newStyle.textContent = hide;
  document.head.appendChild(newStyle);

export function Footer() {
  const bottomelement = `
    @media print{
      #bottomelement{
        display: block !important;
      }
    }
  
  `;

  const newStyle = document.createElement('style');
  newStyle.textContent = bottomelement;
  document.head.appendChild(newStyle);
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
      <Container maxWidth="xl" id='hide'>
        <Typography variant="body1" align="center">
          Greener Village Meal Planner
        </Typography>
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
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src="/images/GreenerVillageLogo.png" alt="Greener Village Logo" style={{ width: '12%', height: 'auto', marginTop: '10px' }}/>
        </Box>
      </Container>
      <div id="bottomelement" style={{position:'fixed',
                                    bottom:0,
                                    width:'100%',
                                    textAlign:'center',
                                    padding:'10px',
                                    display:'none'}}> 
            
            <Typography variant="body1" align="center">
            Greener Village Meal Planner
            </Typography>
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
            <Box display="flex" alignItems="center" justifyContent="center">
            <img src="/images/GreenerVillageLogo.png" alt="Greener Village Logo" style={{ width: '12%', height: 'auto', marginTop: '10px' }}/>
            </Box>
            </div>
    </Box>
  );
}
