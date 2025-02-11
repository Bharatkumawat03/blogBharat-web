import { Avatar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  "Technology", "Lifestyle", "Education", "Health", "Business",
  "Entertainment", "Travel", "Food", "Finance", "Sports",
  "Science", "Politics", "Personal Development", "Culture",
  "History", "Automobile", "Gaming", "Fashion", "Photography", "Other"
  ];

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      toast.warning("Please provide a title, content and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post(BASE_URL + "/blog/add", formData, {withCredentials: true});
      if (res.status === 201) {
        console.log(res);
        toast.success('Blog posted successfully');
        navigate("/blogs");
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error("Error creating blog");
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="md" sx={{ mt: 1, padding: 4 }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
      Write a Blog
    </Typography>

    <Paper sx={{ padding: 3, boxShadow: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Blog Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
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
          label="Blog Content"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 3 }}
        />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Button variant="outlined" color="secondary" component="label" sx={{  }}>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>

            {image && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flex: 2,
                }}
              >
                <img
                  alt="Blog Image"
                  src={URL.createObjectURL(image)}
                  style={{
                    width: 'auto',
                    height: '100px',
                    objectFit: 'cover',
                    margin: 'auto',
                  }}
                />
              </Box>
            )}

            <Button
              variant="outlined"
              color="black"
              type="submit"
              sx={{ textAlign: 'right' }}
            >
              Submit Blog
            </Button>
          </Box>
      </Box>
    </Paper>
  </Container>
  );
};

export default WriteBlog;