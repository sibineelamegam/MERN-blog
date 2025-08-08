

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RedirectButton() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleRedirect = () => {
    if (auth) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Button variant="contained" onClick={handleRedirect}>
      {auth ? 'Go to Dashboard' : 'Go to Login Page'}
    </Button>
  );
}

export default RedirectButton;