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
} from "@mui/icons-material";

const Profile = () => {
  const { profileId } = useParams();
  const person = {
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

  const events = []; // Empty for demo

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
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
        <Avatar
          src={person.avatar}
          alt={person.firstName}
          sx={{
            width: 80,
            height: 80,
            bgcolor: "primary.main",
          }}
        >
          {getInitials()}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {person.firstName} {person.lastName}
          </Typography>
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
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Important Dates
          </Typography>
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
    </Box>
  );
};

export default Profile;
