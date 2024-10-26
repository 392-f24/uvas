// src/uploadData.js
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { dummyData } from "./dummydata";

const uploadDataToFirestore = async () => {
  try {
    for (const userKey in dummyData) {
      console.log("Uploading data:", dummyData);
      const userRef = doc(db, "Users", userKey);
      await setDoc(userRef, dummyData[userKey]);
    }
    console.log("Dummy data successfully uploaded!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

export default uploadDataToFirestore;
