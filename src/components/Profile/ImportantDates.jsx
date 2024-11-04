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
import EditButton from "./EditButton";
import { CalendarToday, Favorite } from "@mui/icons-material";
import EmptyState from "./EmptyState";

const ImportantDates = ({ birthday, anniversary, OnEdit }) => (
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
      <EditButton onClick={OnEdit} />
    </Box>
    <List dense disablePadding>
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <CalendarToday fontSize="small" color="action" />
        </ListItemIcon>
        {/* DOUBLE CHECK */}
        {birthday ? (
          <ListItemText
            primary="Birthday"
            secondary={birthday.replace(/-/g, '/')}
          />
        ) : (
          <ListItemText primary={<EmptyState text="Add birthday" />} />
        )}
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Favorite fontSize="small" color="action" />
        </ListItemIcon>
        {anniversary ? (
          <ListItemText
            primary="Anniversary"
            secondary={anniversary.replace(/-/g, '/')}
          />
        ) : (
          <ListItemText primary={<EmptyState text="Add anniversary" />} />
        )}
      </ListItem>
    </List>
  </Box>
);

export default ImportantDates;
