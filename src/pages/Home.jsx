import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Home = () => {
  const theme = useTheme();

  return (
    <Typography component="p" color={theme.palette.secondary.dark}>
      Home
    </Typography>
  );
};

export default Home;
