import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  IconButton,
  Modal,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import {
  CalendarToday,
  Email,
  Phone,
  Work,
  LocationOn,
  Favorite,
  Schedule,
  Notes,
  Add,
  Instagram,
  LinkedIn,
  Edit,
  Delete,
} from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const Profile = () => {
  const { profileId } = useParams();

  const personFullInfo = {
    id: profileId,
    firstName: "Kathryn",
    lastName: "Murphy",
    avatar: "https://example.com/avatar.jpg",
    address: "2100 Campus Drive, Evanston, IL",
    contactInfo: {
      email: "kathryn.murphy@northwestern.edu",
      phoneNumber: "+1 (847) 555-0123",
      others: {
        Instagram: "@kathrynm",
        LinkedIn: "linkedin.com/in/kathrynm",
      },
    },
    relationshipTags: ["Friend", "Roommate"],
    birthday: {
      date: new Date("2001-05-15"),
      remind: true,
    },
    occupation: "Student at Northwestern",
    notes: "Met during freshman orientation. Loves photography and hiking.",
    anniversary: {
      date: new Date("2023-09-01"),
      remind: true,
      description: "Friendship anniversary",
    },
  };

  const personSomeEmpty = {
    id: profileId,
    firstName: "Kathryn",
    lastName: "Murphy",
    avatar: "KM",
    address: "", // Empty for demo
    contactInfo: {
      email: "kathryn.murphy@northwestern.edu",
      phoneNumber: "", // Empty for demo
      others: {
        Instagram: "@kathrynm",
        LinkedIn: "", // Empty for demo
      },
    },
    relationshipTags: ["Friend", "Roommate"],
    birthday: {
      date: new Date("2001-05-15"),
      remind: true,
    },
    occupation: "", // Empty for demo
    notes: "Met during freshman orientation. Loves photography and hiking.",
    anniversary: null, // Empty for demo
  };

  const [person, setPerson] = useState(personSomeEmpty);

  // Modal states for different sections
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAdditional, setOpenAdditional] = useState(false);

  // State for managing custom contact fields
  const [customContacts, setCustomContacts] = useState(
    Object.entries(person.contactInfo?.others || {}).map(([key, value]) => ({
      platform: key,
      value: value,
    }))
  );

  const events = [
    // {
    //   id: "evt-001",
    //   title: "Coffee Catchup",
    //   date: new Date("2024-10-28"),
    //   location: "Starbucks Downtown",
    //   description: "Monthly coffee meetup",
    //   type: "general",
    // },
    // {
    //   id: "evt-002",
    //   title: "Birthday Celebration",
    //   date: new Date("2024-05-15"),
    //   location: "Pizza Place",
    //   type: "birthday",
    // },
  ];

  const getInitials = () => {
    return `${person.firstName[0]}${
      person.lastName ? person.lastName[0] : ""
    }`.toUpperCase();
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "birthday":
        return "primary";
      case "anniversary":
        return "secondary";
      default:
        return "default";
    }
  };

  const EmptyState = ({ text }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text.disabled",
        gap: 1,
        fontSize: "0.875rem",
      }}
    >
      <Add fontSize="small" />
      <Typography variant="body2" color="text.disabled">
        {text}
      </Typography>
    </Box>
  );

  const BasicInfoEdit = () => (
    <Dialog
      open={openBasicInfo}
      onClose={() => setOpenBasicInfo(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Basic Information</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            defaultValue={person.firstName}
            fullWidth
          />
          <TextField
            label="Last Name"
            defaultValue={person.lastName}
            fullWidth
          />
          <TextField
            label="Relationship Tags"
            defaultValue={person.relationshipTags?.join(", ")}
            helperText="Separate tags with commas"
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenBasicInfo(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            // TODO: Handle save
            setOpenBasicInfo(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Add edit buttons to your existing sections
  const EditButton = ({ onClick }) => (
    <IconButton size="small" onClick={onClick} sx={{ ml: 1 }}>
      <Edit fontSize="small" />
    </IconButton>
  );

  return (
    <Box
      sx={{
        maxWidth: "lg",
        mx: "auto",
        p: 2,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header with Edit Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <Avatar
          src={person.avatar}
          alt={person.firstName}
          sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
        >
          {getInitials()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {person.firstName} {person.lastName}
            </Typography>
            {/* relationship tags */}
            <EditButton onClick={() => setOpenBasicInfo(true)} />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {person.relationshipTags?.length > 0 ? (
              person.relationshipTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  size="small"
                  sx={{ "&.MuiChip-root": { fontWeight: 500 } }}
                />
              ))
            ) : (
              <EmptyState text="Add tags" />
            )}
          </Box>
        </Box>
      </Box>

      {/* Main Info Card */}
      <Card
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          {/* Important Dates */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Important Dates
            </Typography>
            {/* <EditButton onClick={() => setOpenDates(true)} /> */}
          </Box>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <CalendarToday fontSize="small" color="action" />
              </ListItemIcon>
              {person.birthday?.date ? (
                <ListItemText
                  primary="Birthday"
                  secondary={
                    <>
                      {new Date(person.birthday.date).toLocaleDateString()}
                      {person.birthday.remind && (
                        <Chip
                          size="small"
                          label="Reminder"
                          color="success"
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                    </>
                  }
                />
              ) : (
                <ListItemText primary={<EmptyState text="Add birthday" />} />
              )}
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Favorite fontSize="small" color="action" />
              </ListItemIcon>
              {person.anniversary?.date ? (
                <ListItemText
                  primary="Anniversary"
                  secondary={
                    <>
                      {new Date(person.anniversary.date).toLocaleDateString()}
                      {person.anniversary.remind && (
                        <Chip
                          size="small"
                          label="Reminder"
                          color="success"
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                    </>
                  }
                />
              ) : (
                <ListItemText primary={<EmptyState text="Add anniversary" />} />
              )}
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Contact Info */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Contact Information
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Email fontSize="small" color="action" />
              </ListItemIcon>
              {person.contactInfo?.email ? (
                <ListItemText primary={person.contactInfo.email} />
              ) : (
                <ListItemText primary={<EmptyState text="Add email" />} />
              )}
            </ListItem>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Phone fontSize="small" color="action" />
              </ListItemIcon>
              {person.contactInfo?.phoneNumber ? (
                <ListItemText primary={person.contactInfo.phoneNumber} />
              ) : (
                <ListItemText
                  primary={<EmptyState text="Add phone number" />}
                />
              )}
            </ListItem>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LocationOn fontSize="small" color="action" />
              </ListItemIcon>
              {person.address ? (
                <ListItemText primary={person.address} />
              ) : (
                <ListItemText primary={<EmptyState text="Add address" />} />
              )}
            </ListItem>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Instagram fontSize="small" color="action" />
              </ListItemIcon>
              {person.contactInfo?.others?.Instagram ? (
                <ListItemText primary={person.contactInfo.others.Instagram} />
              ) : (
                <ListItemText primary={<EmptyState text="Add Instagram" />} />
              )}
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LinkedIn fontSize="small" color="action" />
              </ListItemIcon>
              {person.contactInfo?.others?.LinkedIn ? (
                <ListItemText primary={person.contactInfo.others.LinkedIn} />
              ) : (
                <ListItemText primary={<EmptyState text="Add LinkedIn" />} />
              )}
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Additional Info */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Additional Information
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Work fontSize="small" color="action" />
              </ListItemIcon>
              {person.occupation ? (
                <ListItemText primary={person.occupation} />
              ) : (
                <ListItemText primary={<EmptyState text="Add occupation" />} />
              )}
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Notes fontSize="small" color="action" />
              </ListItemIcon>
              {person.notes ? (
                <ListItemText primary={person.notes} />
              ) : (
                <ListItemText primary={<EmptyState text="Add notes" />} />
              )}
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Events Card */}
      <Card
        sx={{
          bgcolor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Upcoming Events
          </Typography>
          {events.length > 0 ? (
            <List disablePadding>
              {events.map((event) => (
                <ListItem
                  key={event.id}
                  component={Paper}
                  variant="outlined"
                  sx={{
                    mb: 1,
                    p: 1,
                    bgcolor: "#fafafa",
                    border: "1px solid #eee",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Schedule fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {event.title}
                        <Chip
                          label={event.type}
                          color={getEventTypeColor(event.type)}
                          size="small"
                          sx={{ height: 20 }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        {new Date(event.date).toLocaleDateString()}
                        {event.location && ` • ${event.location}`}
                        {event.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {event.description}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 2 }}>
              <EmptyState text="No upcoming events. Click to add an event." />
            </Box>
          )}
        </CardContent>
      </Card>
      {/* Edit Modals */}
      <BasicInfoEdit />
    </Box>
  );
};

export default Profile;
