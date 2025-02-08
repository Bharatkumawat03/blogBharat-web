import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const user = useSelector((store) => store.user);
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BlogBharat
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Write Blog
          </Button>
        </Box>

          <Typography>{user &&(user.firstName)}here</Typography>
        <Box>
          <Button color="primary" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar