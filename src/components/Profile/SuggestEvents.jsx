/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Link,
} from "@mui/material";
import { Event, Refresh, Clear, OpenInNew } from "@mui/icons-material";

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
        <Box sx={{ display: "flex", gap: 1 }}>
          {activities.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={onClearEvents}
              startIcon={<Clear fontSize="small" />}
              color="error"
            >
              Clear
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={onSuggestEvents}
            startIcon={<Refresh fontSize="small" />}
            disabled={loading}
          >
            {activities.length ? "Refresh Activities" : "Suggest Activities"}
          </Button>
        </Box>
      </Box>

      <List dense disablePadding>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ mb: 1 }}
              secondaryAction={
                <Link
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <OpenInNew fontSize="small" sx={{ ml: 1 }} />
                </Link>
              }
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <NumberIcon number={index + 1} />
              </ListItemIcon>
              <ListItemText primary={activity.title} />
            </ListItem>
          ))
        ) : (
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Event fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText
              primary="Click the button to get activity suggestions"
              sx={{ color: "text.disabled" }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SuggestEvents;
