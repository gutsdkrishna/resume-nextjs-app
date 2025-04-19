import React, { useRef } from "react";

function UploadCVBox({ onUpload }) {
  const fileInputRef = useRef();

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onUpload && onUpload(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-[280px] rounded-lg border-2 border-dashed border-blue-400 cursor-pointer bg-gradient-to-b from-blue-100 via-blue-50 to-white hover:scale-105 transition-all"
      onClick={handleBoxClick}
    >
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img src="./upload-cv.png" alt="Upload CV" width={60} height={60} className="mb-4" />
      <span className="font-semibold text-blue-700">Upload Previous Resume (PDF)</span>
      <span className="text-xs text-gray-500 mt-2">Extract details from your old CV</span>
    </div>
  );
}

export default UploadCVBox; 