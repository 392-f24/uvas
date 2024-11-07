/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { Event, Refresh, Clear } from "@mui/icons-material";

// Custom numbered circle component
const NumberIcon = ({ number }) => (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "action.active",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "0.75rem",
      fontWeight: "medium",
    }}
  >
    {number}
  </Box>
);

const SuggestEvents = ({
  activities = [],
  loading = false,
  onSuggestEvents,
  onClearEvents,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Activity Suggestions
        </Typography>
        <Box>
          {activities.length > 0 && (
            <IconButton size="small" onClick={onClearEvents} sx={{ ml: 1 }}>
              <Clear fontSize="small" />
            </IconButton>
          )}
          <IconButton size="small" onClick={onSuggestEvents} sx={{ ml: 1 }}>
            <Refresh fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <List dense disablePadding>
        {activities.length > 0 && !loading ? (
          activities.map((activity, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                mb: 1,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <NumberIcon number={index + 1} />
              </ListItemIcon>
              <Box sx={{ flexGrow: 1 }}>
                <Link
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  color="secondary.dark"
                >
                  <ListItemText primary={activity.title} />
                </Link>
                <Divider />
              </Box>
            </ListItem>
          ))
        ) : (
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Event fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText
              primary={
                loading
                  ? "Loading ..."
                  : "Click the button to get activity suggestions"
              }
              sx={{ color: "text.disabled" }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SuggestEvents;
