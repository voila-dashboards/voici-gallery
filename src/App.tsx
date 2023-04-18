import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Gallery } from "./Gallery";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box className={"vg-main"}>
        <Box className={"vg-top"}>
          <Box className={"vg-container"}>
            <Typography
              sx={{
                textAlign: "center",
                marginBottom: 2,
                fontFamily: "Chilanka",
              }}
              variant="h2"
            >
              A gallery of Voici dashboards
            </Typography>
            <Typography
              sx={{ textAlign: "center", maxWidth: 800, margin: "auto" }}
              variant="body1"
            >
              Voici turns Jupyter notebooks into standalone applications. Use
              these examples for inspiration when creating your own dashboard
              applications.
            </Typography>
          </Box>
        </Box>
        <Gallery />
      </Box>
    </ThemeProvider>
  );
}

export default App;
