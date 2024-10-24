import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ProfileCard from "../components/ProfileCard";

const people = [
  {
    name: "Kathryn Murphy",
    occupation: "Student at Northwestern",
    tags: ["Friend", "Roommate"],
  },
  {
    name: "Cameron Williamson",
    occupation: "Student at Northwestern",
    tags: ["Classmate"],
  },
  {
    name: "Marvin McKinney",
    occupation: "Barista",
    tags: ["Acquaintance"],
  },
  {
    name: "Darlene Robertson",
    occupation: "Software Engineer at Figma",
    tags: ["Coworker"],
  },

]

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
      <Typography variant="h5" textAlign="left" color="black" fontWeight="bold">
        Reminders
      </Typography>
      <Typography variant="h5" textAlign="left" color="black" fontWeight="bold">
        People
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {people.map((person, index) => (
          <ProfileCard
            key={index} // CHANGE THIS TO UID WHEN DB IS READY
            name={person.name}
            occupation={person.occupation}
            tags={person.tags}>
          </ProfileCard>
        ))}
      </Box>
    </Box >
  );
};

export default Home;
