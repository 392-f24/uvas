/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";
// import EditButton from "./EditButton";
import EmptyState from "./EmptyState";

const EventsCard = ({ events }) => {
  events.map((event) => console.log(event));
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

  return (
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
            {events.map((event, index) => (
              <ListItem
                key={index}
                component={Paper}
                variant="outlined"
                sx={{
                  mb: 1,
                  p: 1,
                  bgcolor: "#fafafa", // TODO: define this in theme?
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
                      <span>
                        {event.date}
                        {event.location && ` • ${event.location}`}
                      </span>
                      {event.description && (
                        <span style={{ display: "block" }}>
                          {event.description}
                        </span>
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
  );
};

export default EventsCard;
