import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeBlog, updateBlog } from '../utils/blogSlice'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = [
  "Technology", "Lifestyle", "Education", "Health", "Business",
  "Entertainment", "Travel", "Food", "Finance", "Sports",
  "Science", "Politics", "Personal Development", "Culture",
  "History", "Automobile", "Gaming", "Fashion", "Photography", "Other"
  ];

const BlogCard = ({blog}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const isAuthor = user && blog.author._id === user._id;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [category, setCategory] = useState(blog.category);


  const handleUpdate = async () => {
    try {
      const updatedBlog = { title, content, category };
      const res = await axios.patch(`${BASE_URL}/blog/edit/${blog._id}`, updatedBlog, { withCredentials: true });

      dispatch(updateBlog(res.data));
      setOpen(false);
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(BASE_URL + "/blog/delete/" + blog._id, {withCredentials: true});
      dispatch(removeBlog(blog._id));

      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Error deleting blog');
    }
   }
  return (


    <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 3, borderRadius: 2 }}>
      {blog.image && (
        <CardMedia
          component="img"
          height="200"
          image={blog.image}
          alt={blog.title}
          sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
        />
      )}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2}}>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} color='secondary'>{blog.category}</Button>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

        {isAuthor && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <EditIcon sx={{ color: 'orchid', cursor: 'pointer', marginRight: 2 }} onClick={() => setOpen(true)} />
            <DeleteIcon sx={{ color: 'royalblue', cursor: 'pointer' }} onClick={handleDelete} />
          </Box>
        )}
        </Box>
        </Box>
        <Typography variant='h6' component="div" sx={{ fontWeight: 'bold' }}>
          {blog.title.substring(0, 45)}...
        </Typography>
        
        <Typography variant='body2' color="text.secondary" sx={{ mb: 1, lineHeight: 1.5 }}>
          {blog.content.substring(0, 100)}...
        </Typography>
        <Typography variant="caption" color="text.secondary">
          By {blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : "Unknown"}
        </Typography>
        <Button
          component={Link}
          to={`/blog/${blog._id}`}
          variant="outlined"
          sx={{ mt: 2, borderColor: "black", color: "black", '&:hover': { bgcolor: 'black', color: "white", } }}
        >
          Read More
        </Button>
      </CardContent>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ my: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default BlogCard