// src/pages/NotFound.jsx

import { Typography } from "@mui/material";
import InfoPage from "../components/InfoPage";
import RedirectButton from "../components/RedirectButton";
import { useAuth } from '../context/AuthContext'; 

function NotFound() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <InfoPage title="Checking...">
        <Typography variant="body1">Please wait...</Typography>
      </InfoPage>
    );
  }

  return (
    <InfoPage title="404 - Page Not Found" >
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for does not exist.
      </Typography>
      <RedirectButton />
    </InfoPage>
  );
}

export default NotFound;