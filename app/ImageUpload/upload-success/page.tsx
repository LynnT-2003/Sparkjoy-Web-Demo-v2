"use client";
const UploadSuccessScreen = () => {
  const base64String = localStorage.getItem("uploadedFile");

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
