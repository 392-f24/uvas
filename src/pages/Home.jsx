import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddPersonForm from "../components/AddPersonForm";
import ProfileCard from "../components/ProfileCard";
import { fetchPeople } from "../utilities/dbFunctions";
import { useNavigate, Link } from "react-router-dom";

const Home = ({ userId }) => {
  const theme = useTheme();
  const [displayForm, setDisplayForm] = useState(false);
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();
  const handleNavigate = (personId) => {
    navigate(`/profile/${personId}`);
  };

  const openForm = () => {
    setDisplayForm(true);
  };

  const closeForm = () => {
    setDisplayForm(false);
  };

  useEffect(() => {
    if (userId) {
      fetchPeople(userId)
        .then((res) => {
          const sortedPeople = res.sort((a, b) => {
            const lastNameComparison = a.lastName.localeCompare(b.lastName);
            return lastNameComparison !== 0
              ? lastNameComparison
              : a.firstName.localeCompare(b.firstName);
          });
          setPeople(sortedPeople);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: 2,
      }}
    >
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
        {people.length > 0 ? (
          people.map((person, index) => (
            <Link
              to={`/profile/${person.id}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <ProfileCard
                firstName={person.firstName}
                lastName={person.lastName}
                occupation={person.occupation}
                tags={person.relationshipTags}
                avatar={person.avatar}
              ></ProfileCard>
            </Link>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            You don't have any people added yet. Click{" "}
            <strong>Add Person</strong> to get started!
          </Typography>
        )}
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
          <AddPersonForm userId={userId} onClose={closeForm} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Home;
