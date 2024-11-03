// dbService.js
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { isWithinInterval, addDays, subDays } from 'date-fns';

// Helper function to get user document
const getUserDoc = (userId) => doc(db, 'Users', userId);

// Function to get birthdays within the next 30 days
export const fetchBirthdays = async (userId) => {
  try {
    const userSnap = await getDoc(getUserDoc(userId));
    if (!userSnap.exists()) return [];

    const userData = userSnap.data();
    const { Relationships = [], Tags = [] } = userData;

    const today = new Date();
    const upcomingBirthdays = [];

    // Check relationships for birthdays
    Object.entries(Relationships).forEach(([personId, personDetails]) => {

      // Skip if there's no birthday
      if (!personDetails.birthday) return;

      // Parse the birthday to get the year, month, and day
      const [month, day, year] = personDetails.birthday.split('-').map(Number);
      const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);

      // Calculate the age they are turning
      const age = today.getFullYear() - year;

      // If birthday is within the next 30 days
      if (isWithinInterval(birthdayThisYear, { start: subDays(today, 1), end: addDays(today, 30) })) {
        upcomingBirthdays.push({
          personId: personId,
          firstName: personDetails.firstName,
          date: personDetails.birthday,
          age: age,
          birthdayThisYear
        });
      }
    });

    // Sort birthdays by date, earliest first
    upcomingBirthdays.sort((a, b) => a.birthdayThisYear - b.birthdayThisYear);

    return upcomingBirthdays;
  } catch (error) {
    console.error("Error fetching birthdays: ", error);
    return [];
  }
};
