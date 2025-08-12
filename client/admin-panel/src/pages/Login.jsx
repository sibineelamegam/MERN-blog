// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { forgotPassword } from '../api/authApi';

function Login() {
  const { login, auth, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  // Common state for UI elements
  const [uiState, setUiState] = useState({
    error: '',
    isSubmitting: false,
    showForgotPasswordForm: false,
    forgotPasswordMessage: '',
    forgotPasswordEmail: '',
  });

  // Helper function to update the uiState object
  const updateUiState = (key, value) => {
    setUiState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForgotPasswordChange = (e) => {
    updateUiState('forgotPasswordEmail', e.target.value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    updateUiState('isSubmitting', true);
    updateUiState('error', '');
    updateUiState('forgotPasswordMessage', '');

    try {
      const response = await forgotPassword(uiState.forgotPasswordEmail);
      updateUiState('forgotPasswordMessage', response.message);
      updateUiState('forgotPasswordEmail', ''); // Clear email field on success
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send reset link.';
      updateUiState('error', errorMessage);
    } finally {
      updateUiState('isSubmitting', false);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUiState('error', '');
    updateUiState('isSubmitting', true);

    try {
      // FIX: Destructure the formData object when calling the login function
      await login(formData); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      updateUiState('error', errorMessage);
    } finally {
      updateUiState('isSubmitting', false);
    }
  };

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
        {!uiState.showForgotPasswordForm ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            {uiState.error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {uiState.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
              disabled={uiState.isSubmitting}
            >
              {uiState.isSubmitting ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            <Typography
              variant="body2"
              sx={{ mt: 2, cursor: 'pointer', color: 'primary.main' }}
              onClick={() => updateUiState('showForgotPasswordForm', true)}
            >
              Forgot Password?
            </Typography>
          </form>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit}>
            <Typography variant="h6" gutterBottom>
              Forgot Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your email to receive a password reset link.
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              name="email"
              value={uiState.forgotPasswordEmail}
              onChange={handleForgotPasswordChange}
              required
              autoComplete="email"
            />
            {uiState.error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {uiState.error}
              </Typography>
            )}
            {uiState.forgotPasswordMessage && (
              <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
                {uiState.forgotPasswordMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
              disabled={uiState.isSubmitting}
            >
              {uiState.isSubmitting ? <CircularProgress size={24} /> : 'Send Reset Link'}
            </Button>
            <Button
              variant="text"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => updateUiState('showForgotPasswordForm', false)}
            >
              Back to Login
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
