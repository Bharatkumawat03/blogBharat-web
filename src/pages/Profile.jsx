import { Avatar, Button, Card, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blog);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("about", about);
    if (photoUrl) formData.append("photoUrl", photoUrl);

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, { withCredentials: true });
      if (res.status === 200) {
        toast.success("Profile updated !!");
        dispatch(addUser(res.data.data));
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const myBlogs = blogs?.filter(blog => blog.author._id === user._id);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(addUser(storedUser));
      } else {
        navigate("/login");
      }
    }
  }, [user, navigate]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', boxShadow: 4, borderRadius: 2 }}>
        <Avatar
          src={user?.photoUrl || "https://via.placeholder.com/150"}
          sx={{ width: 120, height: 120, margin: "auto", border: '4px solid #fff' }}
        />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>{user?.firstName} {user?.lastName}</Typography>
        <Typography variant="body2" color="textSecondary">{user?.email}</Typography>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>{user?.about || "No about info available"}</Typography>
        <Button
          variant="outlined"
          color="black"
          sx={{ mt: 3, px: 4, py: 1, '&:hover': { bgcolor: 'black', color: "white"}, fontWeight: 'bold' }}
          onClick={() => setOpenModal(true)}
        >
          Edit Profile
        </Button>
      </Paper>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>My Blogs</Typography>
      <Grid container spacing={3}>
        {myBlogs?.length > 0 ? (
          myBlogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary" sx={{ mt: 2, fontStyle: 'italic' }}>No blogs available</Typography>
        )}
      </Grid>


      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <Avatar
            src={photoUrl ? URL.createObjectURL(photoUrl) : user?.photoUrl}
            sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ width: '100%', py: 1, fontWeight: 'bold' }}
          >
            Upload Profile Picture
            <input type="file" hidden accept="image/*" onChange={(e) => setPhotoUrl(e.target.files[0])} />
          </Button>

          <TextField
            label="First Name"
            fullWidth
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mt: 3 }}
          />
          <TextField
            label="Last Name"
            fullWidth
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="About"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button onClick={() => setOpenModal(false)} color="secondary" sx={{ fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="outlined" color="primary" sx={{ fontWeight: 'bold' }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile