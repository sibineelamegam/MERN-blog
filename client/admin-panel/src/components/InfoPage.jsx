import { Box, Typography } from '@mui/material';

function InfoPage({ title, children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: {
          xs: 'flex-start', 
          sm: 'center',     
        },
        alignItems: 'center',
        minHeight: {
          xs: 'auto',
          sm: '80vh',
          md: '100vh',
        },
        py: { xs: 6, sm: 4, md: 0 },
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export default InfoPage;
