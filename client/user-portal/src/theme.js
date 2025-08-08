import { createTheme } from '@mui/material/styles';
import { amber } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: amber[300],
    },
    background: {
      default: '#121212', 
      paper: '#1e1e1e', 
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

export default darkTheme;
