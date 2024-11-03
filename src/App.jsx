import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import uploadDataToFirestore from "./utilities/uploadData";
import { auth } from "./utilities/firebase";
import { onAuthStateChanged } from "firebase/auth";

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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/profile/:profileId"
                    element={user ? <Profile /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/timeline"
                    element={user ? <Timeline /> : <Navigate to="/login" />}
                  />
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
