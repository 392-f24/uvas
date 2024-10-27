import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, grey } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#D45F95",
      main: "#B2356F",
      dark: "#5A1535",
    },
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[800],
    },
  },
  typography: {
    fontFamily: ["Montserrat", "helvetica", "Arial", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            color={theme.m}
          >
            <Box maxWidth="md" width="100%">
              <NavigationBar />
              <Box sx={{ marginTop: "20px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile/:profileId" element={<Profile />} />
                  <Route path="/timeline" element={<Timeline />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
