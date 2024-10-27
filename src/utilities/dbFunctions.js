import { db } from './firebase'
import { doc, setDoc, collection, addDoc, getDoc, query, where } from 'firebase/firestore';

// Constants for collections
const USERS_COLLECTION = 'Users';

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
        ...userData // Merges provided user data
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
async function updateProfileData(userId, profileData) {
    try {
        const userDocRef = getUserDoc(userId);

        await updateDoc(userDocRef, profileData);

        return {
            success: true,
            message: 'Profile data updated successfully',
            updatedProfile: profileData
        };
    } catch (error) {
        console.error("Error updating profile data:", error);
        return {
            success: false,
            message: 'Failed to update profile data',
            error: error.message
        };
    }
}
// Function to update event data for a specific user
async function updateEventData(userId, eventData) {
    try {
        const userDocRef = getUserDoc(userId);

        await updateDoc(userDocRef, eventData);

        return {
            success: true,
            message: 'Profile data updated successfully',
            updatedProfile: eventData
        };
    } catch (error) {
        console.error("Error updating profile data:", error);
        return {
            success: false,
            message: 'Failed to update profile data',
            error: error.message
        };
    }
}
// Function to fetch all people for a user
export const fetchPeople = async (userId) => {
    try {
        const userSnap = await getDoc(getUserDoc(userId));
        
        if (!userSnap.exists()) return [];

        const relationships = userSnap.data().Relationships;
        
        const people = relationships.map(personObj => {
            const personId = Object.keys(personObj)[0];
            const personData = personObj[personId];
            return {
                id: personId,
                name: `${personData.firstName} ${personData.lastName}`,
                occupation: personData.occupation,
                tags: personData.relationshipTags,
                avatar: personData.avatar || null, // Optional: add avatar
            };
        });

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
            const people = userSnap.data().Relationships;
            const person = people.find(p => Object.keys(p)[0] === personId);
            return person ? person[personId] : null;
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

// Function to filter people by relationship tags
export const filterPeopleByTag = async (userId, tag) => {
    const people = await fetchPeople(userId);
    return people.filter(person => {
        return person.tags.includes(tag);
    });
};
