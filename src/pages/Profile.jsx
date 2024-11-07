/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

// components
import BasicInfoHeaderEdit from "../components/Profile/BasicInfoHeaderEdit";
import ContactEdit from "../components/Profile/ContactEdit";
import LikesDislikesEdit from "../components/Profile/LikesDislikesEdit";
import LikesDislikes from "../components/Profile/LikesDislikes";
import DatesEdit from "../components/Profile/DatesEdit";
import BasicInfoHeader from "../components/Profile/BasicInfoHeader";
import ImportantDates from "../components/Profile/ImportantDates";
import ContactInfo from "../components/Profile/ContactInfo";
import AdditionalInfo from "../components/Profile/AdditionalInfo";
import EventsCard from "../components/Profile/EventsCard";
import SuggestGifts from "../components/Profile/SuggestGifts";
import SuggestEvents from "../components/Profile/SuggestEvents";

import {
  fetchPersonProfile,
  fetchPersonEvents,
  updateProfileData,
} from "../utilities/dbFunctions";
import { suggestGifts, suggestEvents } from "../utilities/cloudFunctions";

const Profile = () => {
  const { profileId } = useParams();

  const [person, setPerson] = useState();
  const [giftsLoading, setGiftsLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  // Modal states for different sections
  const [openLikesDislikes, setOpenLikesDislikes]  = useState(false);
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
  }, []);

  const handleSuggestGifts = async () => {
    setGiftsLoading(true);
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
      setGiftsLoading(false);
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

  const handleSuggestEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await suggestEvents({
        user_id: "User1",
        profile_id: profileId,
      });

      // Update both local state and database
      const updatedPerson = {
        ...person,
        activities: response.data,
      };

      await updateProfileData("User1", profileId, {
        activities: response.data,
      });

      setPerson(updatedPerson);
    } catch (error) {
      console.error("Error suggesting events:", error);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleClearEvents = async () => {
    try {
      // Update both local state and database
      const updatedPerson = {
        ...person,
        activities: [],
      };

      await updateProfileData("User1", profileId, {
        activities: [],
      });

      setPerson(updatedPerson);
    } catch (error) {
      console.error("Error clearing events:", error);
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
            OnEdit={() => setOpenDates(true)}
          />
          <Divider sx={{ my: 2 }} />
          <LikesDislikes likes={person.likes} dislikes={person.dislikes} 
          onEdit={() => setOpenLikesDislikes(true)} />
          <Divider sx={{ my: 2 }} />
          
          <AdditionalInfo occupation={person.occupation} notes={person.notes} />
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
            loading={giftsLoading}
            onSuggestGifts={handleSuggestGifts}
            onClearGifts={handleClearGifts}
          />
          <Divider sx={{ my: 2 }} />
          <SuggestEvents
            activities={person.activities}
            loading={eventsLoading}
            onSuggestEvents={handleSuggestEvents}
            onClearEvents={handleClearEvents}
          />
        </CardContent>
      </Card>

      {/* Edit Modals */}
      <BasicInfoHeaderEdit
        open={openBasicInfo}
        onClose={() => setOpenBasicInfo(false)}
        person={person}
      />
      <DatesEdit
        open={openDates}
        onClose={() => setOpenDates(false)}
        person={person}
        updateProfile={updateProfile}
      />
      <ContactEdit
        open={openContact}
        onClose={() => setOpenContact(false)}
        person={person}
        updateProfile={updateProfile}
      />
      <LikesDislikesEdit 
        open={openLikesDislikes} 
        onClose={() => setOpenLikesDislikes(false)}
        person={person}
        updateProfile={updateProfile}
      />
    </Box>
  );
};

export default Profile;
