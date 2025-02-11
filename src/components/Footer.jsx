import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#2c2c2c', color: 'white', py: 4, mt: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section: BlogBharat Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>BlogBharat</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              A vibrant platform for discovering and sharing insightful blogs across various categories. Join our community of writers and readers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="text" color="inherit" href="https://facebook.com" target="_blank" sx={{ padding: 0 }}>
                <Facebook />
              </Button>
              <Button variant="text" color="inherit" href="https://instagram.com" target="_blank" sx={{ padding: 0 }}>
                <Instagram />
              </Button>
              <Button variant="text" color="inherit" href="https://twitter.com" target="_blank" sx={{ padding: 0 }}>
                <Twitter />
              </Button>
              <Button variant="text" color="inherit" href="https://linkedin.com" target="_blank" sx={{ padding: 0 }}>
                <LinkedIn />
              </Button>
            </Box>
          </Grid>

          {/* Middle Section: Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: '#f1f1f1' } }}>
                  Home
                </Typography>
              </Link>
              <Link to="/blogs" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: '#f1f1f1' } }}>
                  Blogs
                </Typography>
              </Link>
              <Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: '#f1f1f1' } }}>
                  Write Blog
                </Typography>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: '#f1f1f1' } }}>
                  About Us
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> support@blogbharat.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Phone:</strong> +91 9876543210
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> Udaipur, Rajasthan, India
            </Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4} sx={{ borderTop: '1px solid #555', pt: 2 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} BlogBharat. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
