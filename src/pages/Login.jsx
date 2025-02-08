import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(BASE_URL + "/login", {email, password}, {withCredentials: true});
        dispatch(addUser(res.data));
        // console.log(res.data);
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        console.error(error);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLoginForm ? "Login" : "Signup"}
        </Typography>
        <form onSubmit={handleLogin}>
          {!isLoginForm && (
            <>
              <TextField
                label="FirstName"
                fullWidth
                variant="outlined"
                type="text"
                sx={{mb: 3, mt: 2 }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="LastName"
                fullWidth
                variant="outlined"
                type="text"
                sx={{mb: 1}}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        {!isLoginForm && (
            <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isLoginForm ? "Login" : "Signup"}
          </Button>
        </form>
        <Typography sx={{mt: 1}}>
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            onClick={() => setIsLoginForm(!isLoginForm)}
            sx={{ textDecoration: "underline" }}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
