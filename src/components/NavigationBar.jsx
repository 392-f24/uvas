import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { logOut } from "../utilities/auth";
import { getAuth } from "firebase/auth";

const pages = ["Home", "Birthdays"];

const Logo = ({ small, onClick }) => (
  <Box
    component="a"
    onClick={onClick}
    sx={{
      display: { xs: small ? "flex" : "none", md: small ? "none" : "flex" },
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
    <Typography
      component="p"
      sx={{
        fontSize: "20px",
        fontWeight: 700,
        letterSpacing: "0.3rem",
        textAlign: "center",
        lineHeight: "1",
      }}
    >
      🍇uvas
    </Typography>
  </Box>
);

const NavigationMenu = ({ anchorEl, handleCloseMenu, handleNavigate }) => (
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    open={Boolean(anchorEl)}
    onClose={handleCloseMenu}
    sx={{ display: { xs: "block", md: "none" } }}
  >
    {pages.map((page) => (
      <MenuItem key={page} onClick={() => handleNavigate(page)}>
        <Typography textAlign="center" color="primary">
          {page}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
);

function ResponsiveAppBar({ setUser }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page) => {
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "Birthdays":
        navigate("/birthdays");
        break;
      default:
        break;
    }
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    try {
      setAnchorElUser(null);
      setUser(null);
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error with sign out: ", error.message);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ background: theme.palette.primary.dark, borderRadius: "6px" }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px 0px",
          }}
        >
          <Logo small={false} onClick={() => navigate("/")} />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavigationMenu
              anchorEl={anchorElNav}
              handleCloseMenu={handleCloseNavMenu}
              handleNavigate={handleNavigate}
            />
          </Box>

          <Logo small={true} onClick={() => navigate("/")} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User Avatar"
                  src={user?.photoURL || "/static/images/avatar/2.jpg"}
                />
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
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center" color="primary">
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
