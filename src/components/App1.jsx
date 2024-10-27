import React, { useEffect } from "react";
import uploadDataToFirestore from "./uploadData";

function App1() {
  useEffect(() => {
    const uploadData = async () => {
      await uploadDataToFirestore();
    };
    uploadData(); // Automatically run on mount
  }, []);

  return (
    <div className="App">
      <h1>Data Upload</h1>
      <button onClick={uploadDataToFirestore}>Upload Data</button>
      <p>Check console for upload status</p>
    </div>
  );
}

export default App1;
