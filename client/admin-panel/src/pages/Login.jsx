// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is still available
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';


function Login() {
  const { login, auth, loading } = useAuth(); // Get login function, auth state, and loading from context
  const navigate = useNavigate();

  // Refactored: Use a single state object for form data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for the formData object
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (auth) {
      navigate('/dashboard', { replace: true }); // Assuming '/dashboard' is the target after login
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsSubmitting(true); // Disable button during submission

    try {
      // Pass the formData object directly to the login function
      await login(formData);
      // Redirection handled by useEffect
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // If AuthContext is still loading, show a loading indicator
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Initializing...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            name="email" // Added name attribute
            value={formData.email}
            onChange={handleChange} // Updated onChange handler
            required
            autoComplete="email"
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            name="username" // Added name attribute
            value={formData.username}
            onChange={handleChange} // Updated onChange handler
            required
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password" // Added name attribute
            value={formData.password}
            onChange={handleChange} // Updated onChange handler
            required
            autoComplete="current-password"
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
