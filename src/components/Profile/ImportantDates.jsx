/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  Chip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// import EditButton from "./EditButton";
import { CalendarToday, Favorite } from "@mui/icons-material";
import EmptyState from "./EmptyState";

const ImportantDates = ({ birthday, anniversary }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        color="primary"
      >
        Important Dates
      </Typography>
      {/*TODO:uncomment and add edit modal: <EditButton onClick={() => setOpenDates(true)} /> */}
    </Box>
    <List dense disablePadding>
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <CalendarToday fontSize="small" color="action" />
        </ListItemIcon>
        {birthday?.date ? (
          <ListItemText
            primary="Birthday"
            secondary={
              <>
                {new Date(birthday.date).toLocaleDateString()}
                {/* TODO: replace Reminder label to reminded? */}
                {birthday.remind && (
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
        {anniversary?.date ? (
          <ListItemText
            primary="Anniversary"
            secondary={
              <>
                {new Date(anniversary.date).toLocaleDateString()}
                {anniversary.remind && (
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
  </Box>
);

export default ImportantDates;
