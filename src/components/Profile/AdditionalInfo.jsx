/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EditButton from "./EditButton";
import { Work, Notes } from "@mui/icons-material";
import EmptyState from "./EmptyState";

const AdditionalInfo = ({ occupation, notes, OnEdit }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        color="primary"
      >
        Additional Information
      </Typography>
      <EditButton onClick={OnEdit} />
    </Box>
    <List dense disablePadding>
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Work fontSize="small" color="action" />
        </ListItemIcon>
        {occupation ? (
          <ListItemText primary={occupation} />
        ) : (
          <ListItemText primary={<EmptyState text="Occupation" />} />
        )}
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Notes fontSize="small" color="action" />
        </ListItemIcon>
        {notes ? (
          <ListItemText primary={notes} />
        ) : (
          <ListItemText primary={<EmptyState text="Notes" />} />
        )}
      </ListItem>
    </List>
  </Box>
);

export default AdditionalInfo;
