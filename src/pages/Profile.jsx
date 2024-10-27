/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
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
import { Schedule } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

// components
import BasicInfoHeaderEdit from "../components/Profile/BasicInfoHeaderEdit";
import ContactEdit from "../components/Profile/ContactEdit";

import BasicInfoHeader from "../components/Profile/BasicInfoHeader";
import ImportantDates from "../components/Profile/ImportantDates";
import ContactInfo from "../components/Profile/ContactInfo";
import AdditionalInfo from "../components/Profile/AdditionalInfo";

import EmptyState from "../components/Profile/EmptyState";

const Profile = () => {
  const { profileId } = useParams();

  const personFullInfo = {
    id: profileId,
    firstName: "Kathryn",
    lastName: "Murphy",
    avatar: "KM",
    address: "2100 Campus Drive, Evanston, IL",
    contactInfo: {
      email: "kathryn.murphy@northwestern.edu",
      phoneNumber: "+1 (847) 555-0123",
      others: {
        Instagram: "@kathrynm",
        LinkedIn: "linkedin.com/in/kathrynm",
      },
    },
    relationshipTags: ["Friend", "Roommate", "Classmate"],
    birthday: {
      date: new Date("2001-05-15"),
      remind: true,
    },
    occupation: "Student at Northwestern",
    notes: "Met during freshman orientation. Loves photography and hiking.",
    anniversary: {
      date: new Date("2023-09-01"),
      remind: true,
      description: "Friendship anniversary",
    },
  };

  const personSomeEmpty = {
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

  const [person, setPerson] = useState(personSomeEmpty);

  // Modal states for different sections
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAdditional, setOpenAdditional] = useState(false);

  const events = [
    // {
    //   id: "evt-001",
    //   title: "Coffee Catchup",
    //   date: new Date("2024-10-28"),
    //   location: "Starbucks Downtown",
    //   description: "Monthly coffee meetup",
    //   type: "general",
    // },
    // {
    //   id: "evt-002",
    //   title: "Birthday Celebration",
    //   date: new Date("2024-05-15"),
    //   location: "Pizza Place",
    //   type: "birthday",
    // },
  ];

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

  // Helper function to update Firestore
  const updateProfile = async (newData) => {
    try {
      // TODO: Firebase update function here
      // await updateProfileData(profileId, newData);
      setPerson((prev) => ({ ...prev, ...newData }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
      <BasicInfoHeader
        firstName={person.firstName}
        lastName={person.lastName}
        avatar={person.avatar}
        relationshipTags={person.relationshipTags}
        OnEdit={() => setOpenBasicInfo(true)}
      />
      {/* Main Info Card */}
      <Card
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <ImportantDates
            birthday={person.birthday}
            anniversary={person.anniversary}
          />
          <Divider sx={{ my: 2 }} />
          <ContactInfo
            contactInfo={person.contactInfo}
            address={person.address}
            OnEdit={() => setOpenContact(true)}
          />
          <Divider sx={{ my: 2 }} />
          <AdditionalInfo occupation={person.occupation} notes={person.notes} />
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
      {/* Edit Modals */}
      <BasicInfoHeaderEdit
        open={openBasicInfo}
        onClose={() => setOpenBasicInfo(false)}
        person={person}
      />
      <ContactEdit
        open={openContact}
        onClose={() => setOpenContact(false)}
        person={person}
        updateProfile={updateProfile}
      />
    </Box>
  );
};

export default Profile;
