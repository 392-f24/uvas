/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

// components
import BasicInfoHeaderEdit from "../components/Profile/BasicInfoHeaderEdit";
import ContactEdit from "../components/Profile/ContactEdit";

import BasicInfoHeader from "../components/Profile/BasicInfoHeader";
import ImportantDates from "../components/Profile/ImportantDates";
import ContactInfo from "../components/Profile/ContactInfo";
import AdditionalInfo from "../components/Profile/AdditionalInfo";
import EventsCard from "../components/Profile/EventsCard";
import SuggestGifts from "../components/Profile/SuggestGifts";

import {
  fetchPersonProfile,
  fetchPersonEvents,
  updateProfileData,
} from "../utilities/dbFunctions";
import { suggestGifts, suggestEvents } from "../utilities/cloudFunctions";

const Profile = () => {
  const { profileId } = useParams();

  const [person, setPerson] = useState();
  const [loading, setLoading] = useState(false);

  // Modal states for different sections
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAdditional, setOpenAdditional] = useState(false);

  useEffect(() => {
    fetchPersonProfile("User1", profileId)
      .then((res) => {
        setPerson({ ...res });
      })
      .catch((err) => console.log(err));

    suggestEvents({ user_id: "User1", profile_id: profileId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSuggestGifts = async () => {
    setLoading(true);
    try {
      const response = await suggestGifts({
        user_id: "User1",
        profile_id: profileId,
      });

      // Update both local state and database
      const updatedPerson = {
        ...person,
        gifts: response.data,
      };

      await updateProfileData("User1", profileId, {
        gifts: response.data,
      });

      setPerson(updatedPerson);
    } catch (error) {
      console.error("Error suggesting gifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearGifts = async () => {
    try {
      // Update both local state and database
      const updatedPerson = {
        ...person,
        gifts: [],
      };

      await updateProfileData("User1", profileId, {
        gifts: [],
      });

      setPerson(updatedPerson);
    } catch (error) {
      console.error("Error clearing gifts:", error);
    }
  };

  const updateProfile = async (newData) => {
    try {
      await updateProfileData("User1", profileId, newData);
      setPerson((prev) => ({ ...prev, ...newData }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!person) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: "lg",
        mx: "auto",
        p: 2,
        bgcolor: "#f5f5f5", //TODO: add to theme
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
          <Divider sx={{ my: 2 }} />
          <SuggestGifts
            gifts={person.gifts}
            loading={loading}
            onSuggestGifts={handleSuggestGifts}
            onClearGifts={handleClearGifts}
          />
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
