/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const ContactEdit = ({ open, onClose, person, updateProfile }) => {
  // State for managing custom contact fields
  //TODO: maybe just use person.contactInfo.others
  const [customContacts, setCustomContacts] = useState(
    Object.entries(person.contactInfo?.others || {}).map(([key, value]) => ({
      platform: key,
      value: value,
    }))
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Contact Information</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            defaultValue={person.contactInfo?.email}
            fullWidth
            type="email"
          />
          <TextField
            label="Phone Number"
            defaultValue={person.contactInfo?.phoneNumber}
            fullWidth
          />
          <TextField
            label="Address"
            defaultValue={person.address}
            fullWidth
            multiline
            rows={2}
          />

          {/* Dynamic social media/contact fields */}
          {customContacts.map((contact, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Platform"
                value={contact.platform}
                onChange={(e) => {
                  const newContacts = [...customContacts];
                  newContacts[index].platform = e.target.value;
                  setCustomContacts(newContacts);
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Value"
                value={contact.value}
                onChange={(e) => {
                  const newContacts = [...customContacts];
                  newContacts[index].value = e.target.value;
                  setCustomContacts(newContacts);
                }}
                sx={{ flex: 2 }}
              />
              <IconButton
                color="error"
                onClick={() => {
                  const newContacts = customContacts.filter(
                    (_, i) => i !== index
                  );
                  setCustomContacts(newContacts);
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<Add />}
            onClick={() => {
              setCustomContacts([
                ...customContacts,
                { platform: "", value: "" },
              ]);
            }}
          >
            Add Contact Method
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            // Handle save
            const others = {};
            customContacts.forEach((contact) => {
              if (contact.platform && contact.value) {
                others[contact.platform] = contact.value;
              }
            });

            const newContactInfo = {
              ...person.contactInfo,
              others,
            };

            // TODO: might just use utility functions
            updateProfile({ contactInfo: newContactInfo });
            onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactEdit;
