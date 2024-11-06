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
} from "../utilities/dbFunctions";
import { suggestGifts, suggestEvents } from "../utilities/cloudFunctions";

const Profile = () => {
  const { profileId } = useParams();

  const [person, setPerson] = useState();
  const [giftSuggestions, setGiftSuggestions] = useState([]);
  const [loadingGifts, setLoadingGifts] = useState(false);

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

    //TODO:  Fetch existing saved gifts from Firestore
    // TODO: Replace with your Firestore fetch function
    // const existingGifts = await fetchGiftsFromFirestore("User1", profileId);
    // if (existingGifts) {
    //   setGiftSuggestions(existingGifts);
    // }

    suggestEvents({ user_id: "User1", profile_id: profileId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSuggestGifts = async () => {
    setLoadingGifts(true);
    try {
      const response = await suggestGifts({
        user_id: "User1",
        profile_id: profileId,
      });
      setGiftSuggestions(response.data);

      // Save to Firestore
      // TODO: Replace with your Firestore save function
      // await saveGiftsToFirestore("User1", profileId, response);
    } catch (error) {
      console.error("Error suggesting gifts:", error);
    } finally {
      setLoadingGifts(false);
    }
  };

  const handleClearGifts = async () => {
    try {
      setGiftSuggestions([]); // Clear the suggestions from state
      // TODO: Also clear from Firestore if needed
      // await clearGiftsFromFirestore("User1", profileId);
    } catch (error) {
      console.error("Error clearing gifts:", error);
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
            gifts={giftSuggestions}
            loading={loadingGifts}
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
