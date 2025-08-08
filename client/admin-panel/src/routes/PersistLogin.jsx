
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const PersistLogin = () => {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading user session...
          </Typography>
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
