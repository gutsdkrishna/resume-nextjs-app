import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
;
import ResumePreview from "../../components/ResumePreview";
import FormSections from "../../components/FormSections";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useState } from "react";
import GlobalApi from "@/service/GlobalApi";
function EditResume() {
  const { resumeId } = useParams();
  const router = useRouter();
  const [resumeInfo, setResumeInfo] = useState({});
  useEffect(() => {
    if (resumeId === 'new') {
      // Try to load extracted info from localStorage
      const extracted = localStorage.getItem("extractedResumeInfo");
      if (extracted) {
        try {
          const parsed = JSON.parse(extracted);
          // Set a default title if not present
          if (!parsed.title) {
            parsed.title = parsed.personal?.name
              ? `${parsed.personal.name}'s Resume`
              : 'Imported Resume';
          }
          // Create a new resume in the database
          GlobalApi.CreateResume(parsed).then((res) => {
            const newId = res.data?.data?._id || res.data?.data?.resumeId || res.data?.data?.id;
            if (newId) {
              setResumeInfo(parsed);
              localStorage.removeItem("extractedResumeInfo");
              router.replace(`/dashboard/resume/${newId}/edit`);
            }
          });
        } catch {}
        return;
      }
    }
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      setResumeInfo(res.data.data);
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSections />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
