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
  Info,
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
      {/* ADDRESS */}
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LocationOn fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.address ? (
          <ListItemText primary={contactInfo.address} />
        ) : (
          <ListItemText primary={<EmptyState text="Address" />} />
        )}
      </ListItem>

      {/* NUMBER */}
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Phone fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.phoneNumber ? (
          <ListItemText primary={contactInfo.phoneNumber} />
        ) : (
          <ListItemText primary={<EmptyState text="Phone number" />} />
        )}
      </ListItem>

      {/* EMAIL */}
      <ListItem disablePadding sx={{ mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Email fontSize="small" color="action" />
        </ListItemIcon>
        {contactInfo?.email ? (
          <ListItemText primary={contactInfo.email} />
        ) : (
          <ListItemText primary={<EmptyState text="Email" />} />
        )}
      </ListItem>

      {/* OTHERS */}
      {contactInfo?.others &&
        Object.entries(contactInfo.others).map(([key, value]) => (
          <ListItem key={key} disablePadding sx={{ mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Info fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" color="secondary" sx={{ mr: 1 }}>
                    {key}
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
    </List>
  </Box>
);

export default ContactInfo;
