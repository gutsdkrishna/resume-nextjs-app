import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/service/GlobalApi";
import { RWebShare } from "react-web-share";

function ViewResume({ resumeId }) {
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/my-resume/${resumeId}/view`
    : '';

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
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: shareUrl,
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " resume",
              }}
            >
              <Button variant="outline">Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      {/* <div className="my-10 mx-10 md:mx-20 lg:mx-36"> */}
      <div>
        <ResumePreview id="print-area" />
      </div>
      {/* </div> */}
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
