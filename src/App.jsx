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
      light: purple[100],
      main: purple[300],
      dark: purple[500],
    },
    secondary: {
      main: grey[500],
    },
  },
  typography: {
    fontFamily: ["helvetica", "Arial", "sans-serif"].join(","),
    h3: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
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
