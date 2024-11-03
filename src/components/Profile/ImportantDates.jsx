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
        {birthday?.date ? (
          <ListItemText
            primary={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>Birthday</Typography>
                {birthday.remind ? (
                  <Chip
                    size="small"
                    label="Reminder On"
                    color="success"
                    sx={{ ml: 1, height: 20 }}
                  />
                ) : (
                  <Chip
                    size="small"
                    label="Reminder Off"
                    color="failure"
                    sx={{ ml: 1, height: 20 }}
                  />
                )}
              </Box>
            }
            secondary={new Date(birthday.date).toLocaleDateString()}
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
