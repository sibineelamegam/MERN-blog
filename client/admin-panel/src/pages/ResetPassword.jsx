// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { resetPassword } from '../api/authApi';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [state, setState] = useState({
    error: '',
    message: '',
    isSubmitting: false,
  });

  const updateState = (key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!token) {
      updateState('error', 'Invalid or missing password reset token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateState('error', '');
    updateState('message', '');
    updateState('isSubmitting', true);

    if (formData.password !== formData.confirmPassword) {
      updateState('error', 'Passwords do not match.');
      updateState('isSubmitting', false);
      return;
    }

    if (!token) {
      updateState('error', 'Invalid or missing password reset token.');
      updateState('isSubmitting', false);
      return;
    }

    try {
      const response = await resetPassword(token, formData.password);
      updateState('message', response.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password.';
      updateState('error', errorMessage);
    } finally {
      updateState('isSubmitting', false);
    }
  };

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
        <Typography variant="h5" component="h1" gutterBottom>
          Reset Password
        </Typography>
        {state.message ? (
          <Box>
            <Typography color="success.main" variant="body1" sx={{ mt: 2 }}>
              {state.message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {state.error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {state.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5 }}
              disabled={state.isSubmitting || !token}
            >
              {state.isSubmitting ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}

export default ResetPassword;
