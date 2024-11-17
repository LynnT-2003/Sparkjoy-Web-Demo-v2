"use client";
import { useState, useEffect } from "react";

const UploadSuccessScreen = () => {
  const [base64String, setBase64String] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access localStorage safely only on the client side
      const storedFile = localStorage.getItem("uploadedFile");
      setBase64String(storedFile);
    }
  }, []);

  if (!base64String) {
    return <div>No file found.</div>;
  }

  return (
    <div>
      <h1>Upload Success</h1>
      <img src={base64String} alt="Uploaded File" />
    </div>
  );
};

export default UploadSuccessScreen;
