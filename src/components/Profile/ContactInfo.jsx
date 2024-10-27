/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Email,
  Phone,
  Instagram,
  LinkedIn,
  LocationOn,
} from "@mui/icons-material";
import EditButton from "./EditButton";
import EmptyState from "./EmptyState";

const ContactInfo = ({ contactInfo, address, OnEdit }) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        alignItem: "center",
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        gutterBottom
        color="primary"
      >
        Contact Information
      </Typography>
      <EditButton onClick={OnEdit} />
    </Box>
    <List dense disablePadding>
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Email fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.email ? (
          <ListItemText primary={contactInfo.email} />
        ) : (
          <ListItemText primary={<EmptyState text="Add email" />} />
        )}
      </ListItem>
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Phone fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.phoneNumber ? (
          <ListItemText primary={contactInfo.phoneNumber} />
        ) : (
          <ListItemText primary={<EmptyState text="Add phone number" />} />
        )}
      </ListItem>

      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LocationOn fontSize="small" color="action" />
        </ListItemIcon>
        {address ? (
          <ListItemText primary={address} />
        ) : (
          <ListItemText primary={<EmptyState text="Add address" />} />
        )}
      </ListItem>

      {/* TODO: support more than linkedin and instagram */}
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Instagram fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.others?.Instagram ? (
          <ListItemText primary={contactInfo.others.Instagram} />
        ) : (
          <ListItemText primary={<EmptyState text="Add Instagram" />} />
        )}
      </ListItem>
      <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LinkedIn fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.others?.LinkedIn ? (
          <ListItemText primary={contactInfo.others.LinkedIn} />
        ) : (
          <ListItemText primary={<EmptyState text="Add LinkedIn" />} />
        )}
      </ListItem>
    </List>
  </Box>
);

export default ContactInfo;
