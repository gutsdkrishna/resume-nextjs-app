import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/service/GlobalApi";

function ViewResume({ resumeId }) {
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/my-resume/${resumeId}/view`
      : '';
    if (navigator.share) {
      navigator.share({
        title: (resumeInfo?.firstName || "") + " " + (resumeInfo?.lastName || "") + " resume",
        text: "Hello Everyone, This is my resume please open url to see it",
        url: shareUrl,
      });
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36 py-4">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generates Resume is ready !{" "}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family{" "}
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <Button variant="outline" onClick={handleShare}>Share 🔗</Button>
          </div>
        </div>
      </div>
      <div id="print-area">
        <ResumePreview />
      </div>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-area, #print-area * {
            visibility: visible !important;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            background: white;
            z-index: 9999;
          }
          #no-print {
            display: none !important;
          }
        }
      `}</style>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume; 