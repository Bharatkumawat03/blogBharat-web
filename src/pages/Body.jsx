import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { addBlog } from '../utils/blogSlice'
import Footer from '../components/Footer'

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blog);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {withCredentials: true});
      dispatch(addUser(res.data.data));
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const getBlogs = async () => {
    if( blogs && blogs?.length > 0 ) return;
    try {
      const res = await axios.get(BASE_URL + "/blog/all");
      dispatch(addBlog(res.data.blogs));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  
  useEffect(() => {
    fetchUser();
  },[]);

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
        <NavBar />
        <Box  sx={{ minHeight: "80vh", mt: 2, }}>
            <Outlet />
        </Box>
        <Footer />
    </>
  )
}

export default Body