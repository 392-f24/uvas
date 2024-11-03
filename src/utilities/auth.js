import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await saveUserData(user);
    return user;
  } catch (error) {
    console.error("Error with sign in: ", error.message);
    return null;
  }
};

const saveUserData = async (user) => {
  try {
    const userRef = doc(db, "Users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        Relationships: {},
        Tags: ["Friend", "Family", "Coworker"],
        CreatedAt: new Date(),
      });
      console.log("New user data saved successfully.");
    } else {
      console.log("User already exists in the database.");
    }
  } catch (error) {
    console.error("Error saving user data: ", error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error with sign out: ", error.message);
  }
};
