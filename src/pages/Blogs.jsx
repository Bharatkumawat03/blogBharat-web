import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from '../components/BlogCard'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const Blogs = () => {
  // const blogs = useSelector((state) => state.blog);
  
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/blog/all?page=${page}`);
      // console.log(res);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const hasNextPage = blogs.length > 0 && page < totalPages;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, py: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Latest Blogs
    </Typography>

    <Grid container spacing={3} justifyContent="center">
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <CircularProgress />
        </Box>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <BlogCard blog={blog} />
          </Grid>
        ))
      ) : (
        <Typography variant="body1" align="center" sx={{ width: '100%' }}>
          No blogs available.
        </Typography>
      )}
    </Grid>

    <Box display="flex" justifyContent="center" mt={4}>
      <Button
        variant="outlined"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        sx={{ mx: 2 }}
      >
        Previous
      </Button>
      <Typography sx={{ mt: 'auto', mb: 'auto', mx: 2 }}>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        disabled={!hasNextPage}
        onClick={() => setPage(page + 1)}
        sx={{ mx: 2 }}
      >
        Next
      </Button>
    </Box>
  </Container>
  )
}

export default Blogs;