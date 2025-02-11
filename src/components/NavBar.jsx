import { AppBar, Avatar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography, useMediaQuery, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      handleCloseMenu();
      navigate("/");
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error("error logging out")
    }
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Container>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 0, borderBottom: 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: "#1e1e1e" }}>
            <strong>BlogBharat</strong>
          </Typography>

          {isMobile ? (
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
              <Button color="inherit" component={Link} to="/create">Write Blog</Button>
              <Button color="inherit" component={Link} to="/about">About</Button>
            </Box>
          )}

          {user ? (
            <Box display="flex" alignItems="center">
              {!isMobile && <Typography>Welcome, {user.firstName}</Typography>}
              <Avatar onClick={handleProfileClick} alt="Profile pic" src={user.photoUrl} sx={{ width: 40, height: 40, ml: 2 }} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} sx={{ mt: 1 }}>
                <MenuItem component={Link} to={"/profile"} onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="primary" component={Link} to="/login">Login</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <Button fullWidth color="inherit" component={Link} to="/" onClick={handleDrawerToggle}>Home</Button>
          <Button fullWidth color="inherit" component={Link} to="/blogs" onClick={handleDrawerToggle}>Blogs</Button>
          <Button fullWidth color="inherit" component={Link} to="/create" onClick={handleDrawerToggle}>Write Blog</Button>
          <Button fullWidth color="inherit" component={Link} to="/about" onClick={handleDrawerToggle}>About</Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default NavBar;
