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
    <Box display="flex" flexDirection="column" gap="16px">
      <Typography component="p" color={theme.palette.secondary.dark}>
        Home
      </Typography>
      <Divider />

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
    </Box>
  );
};

export default Home;
