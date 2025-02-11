import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'

const Home = () => {
  const user = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blog);
  return (
    <>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 4, px: 0 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to BlogBharat
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Read and write blogs on topics that matter to you.
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to="/blogs">
          Explore Blogs
        </Button>
      </Box>


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
          <Box sx={{ mt: 4 , textAlign: 'center' }}>
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

      {user ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
            Want to share your thoughts?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join the community and start writing your own blogs today. It's simple and fun!
          </Typography>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/create" 
            sx={{ 
              borderColor: '#1976d2', 
              color: '#1976d2', 
              '&:hover': { 
                backgroundColor: '#1976d2', 
                color: 'white' 
              }, 
              px: 4, 
              py: 1.5, 
              fontSize: '1rem',
            }}
          >
            Write Your Blog
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', my: 2 }}>
            Please log in to write your own blog!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join the community and start writing your own blogs today. It's simple and fun!
          </Typography>
          <Button 
            variant="outlined" 
            component={Link}
            size='small'
            to="/login" 
            sx={{
              px: 4, 
              py: 1, 
              fontSize: '1rem',
            }}
          >
            Login
          </Button>
        </Box>
      )}


    </>
  )
}

export default Home