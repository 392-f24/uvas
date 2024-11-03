import { useState, useEffect } from "react";
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
import ReminderCard from "../components/BirthdayCard";
import { fetchPeople } from "../utilities/dbFunctions";
import { fetchBirthdays } from "../utilities/birthdayFunction";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const [displayForm, setDisplayForm] = useState(false);
  const [people, setPeople] = useState([]);
  const [reminders, setReminders] = useState([]);

  const navigate = useNavigate();
  const handleNavigate = (personId) => {
    console.log("HERE");
    navigate(`/profile/${personId}`);
  }

  const openForm = () => {
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  useEffect(() => {
    fetchPeople("User1").then((res) => {
      setPeople(res);
    }).catch((err) => (console.log(err)))

    fetchBirthdays("User1").then((res) => {
      setReminders(res);
    }).catch((err) => (console.log(err)))
  }, [])

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
          <Link to={`/profile/${person.id}`} style={{ textDecoration: 'none' }} key={index} >
            <ProfileCard
              name={person.name}
              occupation={person.occupation}
              tags={person.tags}
              >
            </ProfileCard>
          </Link>
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
