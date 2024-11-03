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
import { fetchPersonProfile, fetchPersonEvents, updateProfileData } from "../utilities/dbFunctions";
import {suggestGifts, suggestEvents} from "../utilities/cloudFunctions";

const Profile = () => {
  const { profileId } = useParams();
  
  const [person, setPerson] = useState();

  // Modal states for different sections
  const [openLikesDislikes, setOpenLikesDislikes]  = useState(false);
  const [openBasicInfo, setOpenBasicInfo] = useState(false);
  const [openDates, setOpenDates] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAdditional, setOpenAdditional] = useState(false);

  useEffect(() => {

    fetchPersonProfile("User1", profileId).then((res) => {
      setPerson({...res});
    }).catch((err) => console.log(err));
    // suggestGifts({user_id:"User1", profile_id: profileId}).then((res) => {
    //   console.log(res);
    // }).catch((err) => console.log(err));
  }, [])


  // Helper function to update Firestore
  const updateProfile = async (newData) => {
    try {
      // TODO: Firebase update function here
      console.log(newData);
      await updateProfileData("User1", profileId, newData);
      setPerson((prev) => ({ ...prev, ...newData }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!person) {
    return (
      <Typography>Loading...</Typography>
    )
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
