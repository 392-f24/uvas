// dbService.js
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { format, isWithinInterval, addDays } from 'date-fns';

// Helper function to get user document
const getUserDoc = (userId) => doc(db, 'Users', userId);

// Function to get reminders for events and relationships within the next 7 days
export const fetchReminders = async (userId) => {
  return [];
  try {
    // const userSnap = await getDoc(getUserDoc(userId));
    // if (!userSnap.exists()) return [];

    // const userData = userSnap.data();
    // const { Events = [], Relationships = [] } = userData;

    // const today = new Date();
    // const upcomingReminders = [];

    // // Check events for upcoming dates
    // Events.forEach(event => {
    //   const eventKey = Object.keys(event)[0];
    //   const eventData = event[eventKey];

    //   if (eventData.date) {
    //     const eventDate = new Date(eventData.date);
    //     if (isWithinInterval(eventDate, { start: today, end: addDays(today, 7) })) {
    //       upcomingReminders.push({
    //         title: eventData.title,
    //         date: format(eventDate, 'MMMM do'), // Format date as "Month day"
    //       });
    //     }
    //   }
    // });

    // // Check relationships for birthdays and anniversaries
    // Relationships.forEach(person => {
    //   const personKey = Object.keys(person)[0];
    //   const personData = person[personKey];

    //   // Check for birthday
    //   if (personData.birthday) {
    //     const birthdayThisYear = new Date(today.getFullYear(), new Date(personData.birthday).getMonth(), new Date(personData.birthday).getDate());
    //     if (isWithinInterval(birthdayThisYear, { start: today, end: addDays(today, 7) })) {
    //       upcomingReminders.push({
    //         title: `${personData.firstName}'s Birthday`,
    //         date: format(birthdayThisYear, 'MMMM do'),
    //       });
    //     }
    //   }

    //   // Check for anniversary
    //   if (personData.anniversary) {
    //     const anniversaryThisYear = new Date(today.getFullYear(), new Date(personData.anniversary).getMonth(), new Date(personData.anniversary).getDate());
    //     if (isWithinInterval(anniversaryThisYear, { start: today, end: addDays(today, 7) })) {
    //       upcomingReminders.push({
    //         title: `${personData.firstName} & ${personData.lastName}'s Anniversary`,
    //         date: format(anniversaryThisYear, 'MMMM do'),
    //       });
    //     }
    //   }
    // });
  } catch (error) {
    console.error("Error fetching reminders: ", error);
    return [];
  }
};
