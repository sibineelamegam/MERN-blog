import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme'; 
import App from './App.jsx';
import { BlogProvider } from './context/BlogContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BlogProvider>
        <App />
      </BlogProvider>
    </ThemeProvider>
  </StrictMode>
);