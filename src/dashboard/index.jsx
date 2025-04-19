"use client";
import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    console.log("Clerk user:", user);
    if (user) {
      GetResumesList();
    }
  }, [user]);
  const GetResumesList = () => {
    GlobalApi.GetUserResumes()
      .then((resp) => {
        console.log("API resumes response:", resp.data);
        if (Array.isArray(resp.data)) {
          setResumeList(resp.data);
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
      });
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
