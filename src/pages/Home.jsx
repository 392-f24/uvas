import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddPersonForm from "../components/AddPersonForm";
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
  const [displayForm, setDisplayForm] = useState(false);

  const openForm = () => {
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

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
      
      <Button
        variant="contained"
        color="primary"
        onClick={openForm}
        sx={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 10,
        }}
      >
        Add Person
      </Button>

      <Dialog open={displayForm} onClose={closeForm} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Person</DialogTitle>
        <DialogContent>
          <AddPersonForm />
        </DialogContent>
      </Dialog>
    </Box >
  );
};

export default Home;
