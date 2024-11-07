/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";

const BasicInfoHeaderEdit = ({ open, onClose, person, updateProfile }) => {
  // State for the input values
  const [firstName, setFirstName] = useState(person.firstName || "");
  const [lastName, setLastName] = useState(person.lastName || "");
  const [relationshipTags, setRelationshipTags] = useState(
    person.relationshipTags || []
  );

  const handleSave = () => {
    const updatedInfo = {
      firstName,
      lastName,
      relationshipTags,
    };
    updateProfile(updatedInfo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Basic Information</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            defaultValue={firstName}
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            defaultValue={lastName}
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Relationship Tags"
            defaultValue={relationshipTags.join(", ") || ""}
            helperText="Separate tags with commas"
            fullWidth
            onChange={(e) => setRelationshiptags(e.target.value.split(", "))}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasicInfoHeaderEdit;
