import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

// Constants for collections
const USERS_COLLECTION = "Users";

// Helper function to get user document
const getUserDoc = (userId) => doc(db, USERS_COLLECTION, userId);

//Function to add new user to database
export async function addNewUser(userId, userData) {
  try {
    const userRef = getUserDoc(userId);

    // Initial structure based on data model
    const initialData = {
      Relationships: [],
      Tags: ["Friend", "Family", "Coworker"],
      Events: [],
      ...userData, // Merges provided user data
    };

    // Set the document in Firestore
    await setDoc(userRef, initialData);
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
}

// Function to add a new person to a user's relationships
export const addPerson = async (userId, person) => {
  try {
    const userRef = getUserDoc(userId);
    await updateDoc(userRef, {
      Relationships: arrayUnion(person),
    });
    console.log("Person added successfully");
  } catch (error) {
    console.error("Error adding person: ", error);
  }
};

// Function to update profile data for a specific user
export const updateProfileData = async (userId, profileId, updateData) => {
  try {
    const userDocRef = getUserDoc(userId);

    // First get the current data
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      throw new Error("User document does not exist");
    }

    const currentData = userSnap.data();
    const relationships = currentData.Relationships || {};
    const currentProfile = relationships[profileId] || {};

    // Prepare the update by merging the new data with existing profile
    const updatedProfile = {
      ...currentProfile,
      ...updateData,
    };

    // Update the specific profile in Relationships
    await updateDoc(userDocRef, {
      [`Relationships.${profileId}`]: updatedProfile,
    });

    return {
      success: true,
      message: "Profile data updated successfully",
      updatedData: updatedProfile,
    };
  } catch (error) {
    console.error("Error updating profile data:", error);
    return {
      success: false,
      message: "Failed to update profile data",
      error: error.message,
    };
  }
};

// Function to update event data for a specific user
async function updateEventData(userId, eventData) {
  try {
    const userDocRef = getUserDoc(userId);

    await updateDoc(userDocRef, eventData);

    return {
      success: true,
      message: "Profile data updated successfully",
      updatedProfile: eventData,
    };
  } catch (error) {
    console.error("Error updating profile data:", error);
    return {
      success: false,
      message: "Failed to update profile data",
      error: error.message,
    };
  }
}
// Function to fetch all people for a user
export const fetchPeople = async (userId) => {
  try {
    const userSnap = await getDoc(getUserDoc(userId));

    if (!userSnap.exists()) return [];

    const relationships = userSnap.data().Relationships;

    const people = Object.entries(relationships).map(
      ([personId, personData]) => {
        return {
          id: personId,
          ...personData,
        };
      }
    );

    return people;
  } catch (error) {
    console.error("Error fetching people: ", error);
    return [];
  }
};

// Function to fetch a user's tags
export async function fetchTags(userId) {
  try {
    const userSnap = await getDoc(getUserDoc(userId));

    const tags = userSnap.data().Tags || [];

    console.log("Tags fetched successfully:", tags);
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
// Function to fetch a specific person's profile
export const fetchPersonProfile = async (userId, personId) => {
  try {
    const userSnap = await getDoc(getUserDoc(userId));
    if (userSnap.exists()) {
      const relationships = userSnap.data().Relationships;
      return relationships[personId];
    }
    return null;
  } catch (error) {
    console.error("Error fetching person profile: ", error);
    return null;
  }
};

// Function to add an event for a user
export const addEvent = async (userId, event) => {
  try {
    const userRef = getUserDoc(userId);
    await updateDoc(userRef, {
      Events: arrayUnion(event),
    });
    console.log("Event added successfully");
  } catch (error) {
    console.error("Error adding event: ", error);
  }
};

// Function to fetch all events for a user
export const fetchEvents = async (userId) => {
  try {
    const userSnap = await getDoc(getUserDoc(userId));
    return userSnap.exists() ? userSnap.data().Events : [];
  } catch (error) {
    console.error("Error fetching events: ", error);
    return [];
  }
};

export const fetchPersonEvents = async (userId, personId) => {
  try {
    const userSnap = await getDoc(getUserDoc(userId));
    if (userSnap.exists()) {
      const events = userSnap.data().Events;

      const filteredEvents = events.filter((eventObj) => {
        const eventDetails = Object.values(eventObj)[0];
        return eventDetails.people.includes(personId);
      });

      const eventValues = filteredEvents.map(
        (event) => Object.values(event)[0]
      );

      return eventValues;
    }
    return [];
  } catch (error) {
    console.error("Error fetching person events: ", error);
    return [];
  }
};

// Function to filter people by relationship tags
export const filterPeopleByTag = async (userId, tag) => {
  const people = await fetchPeople(userId);
  return people.filter((person) => {
    return person.tags.includes(tag);
  });
};
