import './App.css'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { purple,grey} from '@mui/material/colors';
import { Typography } from '@mui/material';

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
      <div className="App">
      <Typography variant="h3" align='center' color='primary.light'>🍇 uvas</Typography>
      </div>
     </ThemeProvider>
    </>
  )
}

export default App
