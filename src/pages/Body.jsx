import React from 'react'
import NavBar from '../components/NavBar'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <>
        <NavBar />
        <Container maxWidth="lg" sx={{ minHeight: "80vh", mt: 2 }}>
            <Outlet />
        </Container>
    </>
  )
}

export default Body