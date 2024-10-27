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

const BasicInfoHeaderEdit = ({ open, onClose, person }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Edit Basic Information</DialogTitle>
    <DialogContent>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="First Name"
          defaultValue={person.firstName}
          fullWidth
        />
        <TextField label="Last Name" defaultValue={person.lastName} fullWidth />
        <TextField
          label="Relationship Tags"
          defaultValue={person.relationshipTags?.join(", ")}
          helperText="Separate tags with commas"
          fullWidth
        />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button
        variant="contained"
        // TODO: add Handle save
        onClick={onClose}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default BasicInfoHeaderEdit;
