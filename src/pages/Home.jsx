import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: 2,
      }}>
      <Typography variant="h5" textAlign="left" color="black">
        People
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ProfileCard name="Charlie Lovett" occupation="Student at Northwestern" tags={["Friend", "Classmate"]}></ProfileCard>
        <ProfileCard name="Charlie Lovett" occupation="Student at Northwestern" tags={["Friend", "Classmate"]}></ProfileCard>
      </Box>
    </Box >
  );
};

export default Home;
