import { useTheme } from "@mui/material/styles";
import { Typography, Box, Divider } from "@mui/material";
import AddPersonForm from "../components/AddPersonForm";

const Home = () => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" gap="16px">
      <Typography component="p" color={theme.palette.secondary.dark}>
        Home
      </Typography>
      <Divider />
      <AddPersonForm />
    </Box>
  );
};

export default Home;
