import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import ReminderCard from "../components/ReminderCard";

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
  }
]

const reminders = [
  {
    title: "Cameron's 23rd Birthday",
    date: "Today",
  },
  {
    title: "Kathryn's 25th Birthday",
    date: "Yesterday",
  }
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {reminders.map((reminder, index) => (
          <ReminderCard
            key={index} // CHANGE THIS TO UID WHEN DB IS READY
            title={reminder.title}
            date={reminder.date}>
          </ReminderCard>
        ))}
      </Box>
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
