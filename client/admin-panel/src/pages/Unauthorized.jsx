// src/pages/Unauthorized.jsx

import { Typography } from "@mui/material";
import InfoPage from "../components/InfoPage";
import RedirectButton from "../components/RedirectButton";
import { useAuth } from "../context/AuthContext";

function Unauthorized() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <InfoPage title="Checking authentication...">
        <Typography variant="body1">Please wait...</Typography>
      </InfoPage>
    );
  }

  return (
    <InfoPage title="Unauthorized Access">
      <Typography variant="body1" sx={{ mb: 2 }}>
        You do not have permission to view this page.
      </Typography>
      <RedirectButton />
    </InfoPage>
  );
}

export default Unauthorized;
