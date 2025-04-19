"use client";
import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import UploadCVBox from "./components/UploadCVBox";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    console.log("Clerk user:", user);
    if (user) {
      GetResumesList();
    }
  }, [user]);

  // Keep localStorage in sync with resumeList
  useEffect(() => {
    if (Array.isArray(resumeList) && resumeList.length > 0) {
      localStorage.setItem("userResumes", JSON.stringify(resumeList));
    } else {
      localStorage.removeItem("userResumes");
    }
  }, [resumeList]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes()
      .then((resp) => {
        console.log("API resumes response:", resp.data);
        if (Array.isArray(resp.data)) {
          setResumeList(resp.data);
          localStorage.setItem("userResumes", JSON.stringify(resp.data));
          setError("");
        } else if (resp.data && resp.data.error) {
          setError("Could not load resumes: " + resp.data.error);
        } else {
          setError("Could not load resumes. Please try again later.");
        }
      })
      .catch((err) => {
        setError("Could not load resumes. Please try again later.");
        setResumeList([]);
        localStorage.removeItem("userResumes");
      });
  };
  const handleCVUpload = async (file) => {
    setUploading(true);
    setUploadedImageUrl("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/convert-pdf-to-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.imageBase64) {
        setUploadedImageUrl(data.imageBase64);
      } else {
        setError(data.error || "Failed to convert PDF.");
      }
    } catch (err) {
      setError("Failed to upload and convert PDF.");
    } finally {
      setUploading(false);
    }
  };
  const handleExtractInfo = async () => {
    setExtracting(true);
    setError("");
    setExtractedInfo(null);
    try {
      const res = await fetch("/api/extract-cv-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: uploadedImageUrl }),
      });
      const data = await res.json();
      if (res.ok && data.extracted) {
        setExtractedInfo(data.extracted);
        console.log("Extracted info:", data.extracted);
      } else {
        setError(data.error || "Failed to extract information.");
      }
    } catch (err) {
      setError("Failed to extract information.");
    } finally {
      setExtracting(false);
    }
  };
  const handleStartEditing = () => {
    if (extractedInfo) {
      localStorage.setItem("extractedResumeInfo", JSON.stringify(extractedInfo));
      router.push("/dashboard/resume/new/edit");
    }
  };
  if (!user) {
    return (
      <div className="p-10 md:px-20 lg:px-32">
        <h2 className="font-bold text-3xl">My Resume</h2>
        <p>Please sign in to view and manage your resumes.</p>
      </div>
    );
  }
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded my-4">{error}</div>
      )}
      <div
        className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      "
      >
        <AddResume key={0} />
        <div>
          <UploadCVBox onUpload={handleCVUpload} />
          {uploading && <div className="text-blue-500 mt-2">Converting PDF...</div>}
          {uploadedImageUrl && (
            <div className="mt-2">
              <img src={uploadedImageUrl} alt="Converted CV" className="rounded shadow max-h-40 mx-auto" />
              <div className="text-xs text-center text-gray-500 mt-1">Preview of extracted image</div>
              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleExtractInfo}
                disabled={extracting}
              >
                {extracting ? "Extracting..." : "Extract Info"}
              </button>
              {extractedInfo && (
                <>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded max-h-40 overflow-auto text-left">{JSON.stringify(extractedInfo, null, 2)}</pre>
                  <button
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleStartEditing}
                  >
                    Start Editing
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {resumeList && resumeList.length > 0
          ? resumeList.map((resume) => (
              <ResumeCardItem
                resume={resume}
                key={resume._id || resume.resumeId || resume.id}
                refreshData={GetResumesList}
              />
            ))
          : !error && [1, 2, 3, 4].map((item, index) => (
              <div key={index} className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
