"use client";
import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import UploadCVBox from "./components/UploadCVBox";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

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
  const handleCreateExtractedResume = async () => {
    if (!extractedInfo) return;
    const gemma = extractedInfo;
    const resumeId = uuidv4();
    const now = new Date().toISOString();
    const jobTitle = gemma.experience && gemma.experience[0]?.jobTitle ? gemma.experience[0].jobTitle : "";
    const transformed = {
      resumeId,
      title: gemma.personal?.name
        ? `${gemma.personal.name}'s Resume`
        : `Imported Resume ${Math.floor(Math.random() * 10000)}`,
      userId: user?.id || "",
      userEmail: user?.primaryEmailAddress?.emailAddress || "",
      userName: user?.fullName || gemma.personal?.name || "",
      createdAt: now,
      updatedAt: now,
      __v: 0,
      firstName: gemma.personal?.name?.split(" ")[0] || "",
      lastName: gemma.personal?.name?.split(" ").slice(1).join(" ") || "",
      email: gemma.personal?.email || "",
      phone: gemma.personal?.phone || "",
      address: gemma.personal?.address || "",
      jobTitle: jobTitle,
      summery: gemma.summary || "",
      experience: Array.isArray(gemma.experience)
        ? gemma.experience.map(exp => ({
            title: exp.jobTitle || "",
            companyName: exp.company || "",
            city: "",
            state: "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            workSummery: exp.description || ""
          }))
        : [],
      education: Array.isArray(gemma.education)
        ? gemma.education.map(edu => ({
            universityName: edu.institution || "",
            degree: edu.degree || "",
            major: "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            description: ""
          }))
        : [],
      skills: Array.isArray(gemma.skills)
        ? gemma.skills.map(skill => ({ name: skill, rating: 0 }))
        : [],
    };
    try {
      const dbRes = await GlobalApi.CreateResume(transformed);
      const dbResume = dbRes?.data?.data || dbRes?.data || dbRes;
      if (dbResume) {
        localStorage.setItem("extractedResumeInfo", JSON.stringify(dbResume));
        GetResumesList(); // Refresh dashboard
      }
    } catch (err) {
      setError("Failed to create resume in DB.");
      console.error("CreateResume error:", err, transformed);
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
                    onClick={handleCreateExtractedResume}
                  >
                    Create Resume
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
