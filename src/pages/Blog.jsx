import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import BlogCard from '../components/BlogCard';

const Blog = () => {
    const {blogid} = useParams();
    const blogs = useSelector((store) => store.blog);

    const blog = blogs?.find((blog) => blog._id === blogid.toString());
    // console.log("here blog " , blog);

    if (!blog) {
        return (
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h6" color="error">Blog not found</Typography>
          </Container>
        );
      }
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 , boxShadow: 0}}>
        <Typography variant="h4" gutterBottom >{blog.title}</Typography>
        {blog.image && (
          <img src={blog.image} alt={blog.title} style={{ width: '50%', height: 'auto', marginBottom: '20px' }} />
        )}
        <Typography variant="body1" paragraph>{blog.content}</Typography>
        <Typography variant="caption" color="textSecondary">By {blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : "Unknown"}</Typography>
      </Paper>

      <Box sx={{ mt: 6, p: 6, backgroundColor: '#eee'}}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Latest Blogs
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {blogs?.length > 0 ? (
            blogs
            .slice(0, 3) // Show only the latest 3 blogs
            .map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))
            ) : (
              <Typography>No blogs available.</Typography>
            )}
        </Grid>

        {blogs?.length > 3 && (
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              to="/blogs"
              variant="contained"
              color="secondary"
              size="large"
              >
              Explore All Blogs
            </Button>
          </Box>
        )}
        </Container>
      </Box>
    </Container>
  )
}

export default Blog