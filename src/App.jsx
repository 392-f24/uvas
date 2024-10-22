import './App.css'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { purple,grey} from '@mui/material/colors';
import { Typography } from '@mui/material';
import NavigationBar from './components/NavigationBar'

const theme = createTheme({
  palette: {
    primary: {
      light: purple[100],
      main: purple[300],
      dark: purple[500],
    },
    secondary: {
      main: grey[500],  
    },
  },
  typography: {
    fontFamily: [
      'helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
  },
});

function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
      <NavigationBar />
     </ThemeProvider>
    </>
  )
}

export default App
