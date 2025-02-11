import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            opacity: 0.8,
            fontWeight: '500',
            fontSize: { xs: '1rem', sm: '1.2rem' },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          We are a passionate team committed to providing an open platform for people to share ideas, stories, and knowledge.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 6, }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to create a platform that allows everyone to express their thoughts, showcase their knowledge, and share valuable insights with a global audience. We aim to make blogging easy and accessible to everyone.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Our vision is to be the go-to platform for people looking to share, learn, and grow through blogs. We want to foster a community where people of all backgrounds can come together, express themselves, and connect with like-minded individuals.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 6, textAlign: 'center', backgroundColor: '' }}>
        <Container>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Have any questions or suggestions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Feel free to reach out to us anytime.
          </Typography>
          <Button
            variant="outlined"
            size='small'
            sx={{
              px: 5,
              py: 2,
              fontSize: '1rem',
              borderRadius: '8px',
            }}
          >
            Contact Us
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default About;
