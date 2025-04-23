import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function PersonalSidebar({ resumeInfo }) {
  return (
    <div
      className="p-4 text-white"
      style={{ backgroundColor: resumeInfo?.themeColor, minWidth: "220px" }}
    >
      <h2 className="text-lg font-bold mb-1">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <p className="text-sm mb-4">{resumeInfo?.jobTitle}</p>
      <div className="text-xs space-y-2">
        <div>{resumeInfo?.address}</div>
        <div>{resumeInfo?.phone}</div>
        <div>{resumeInfo?.email}</div>
      </div>
    </div>
  );
}

function SummarySection({ resumeInfo }) {
  return (
    <section className="mb-4">
      <h3 className="text-sm font-semibold mb-1">Profile</h3>
      <p className="text-xs">{resumeInfo?.summery}</p>
    </section>
  );
}

function ExperienceSection({ resumeInfo }) {
  return (
    <section className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Experience</h3>
      {resumeInfo?.experience?.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between text-xs font-semibold">
            <span>{item?.title}</span>
            <span>
              {item?.startDate} -{" "}
              {item?.currentlyWorking ? "Present" : item?.endDate}
            </span>
          </div>
          <div className="text-xs italic">
            {item?.companyName}, {item?.city}, {item?.state}
          </div>
          <div
            className="text-xs mt-1"
            dangerouslySetInnerHTML={{ __html: item?.workSummery }}
          />
        </div>
      ))}
    </section>
  );
}

function EducationSection({ resumeInfo }) {
  return (
    <section className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Education</h3>
      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between text-xs font-semibold">
            <span>{edu.universityName}</span>
            <span>
              {edu.startDate} - {edu.endDate}
            </span>
          </div>
          <div className="text-xs italic">
            {edu.degree} in {edu.major}
          </div>
          <p className="text-xs mt-1">{edu.description}</p>
        </div>
      ))}
    </section>
  );
}

function SkillsSection({ resumeInfo }) {
  return (
    <section className="mb-4">
      <h3 className="text-sm font-semibold mb-2">Skills</h3>
      <div className="grid grid-cols-2 gap-2">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="text-xs flex justify-between items-center">
            <span>{skill.name}</span>
            <div className="h-1.5 bg-gray-300 w-[100px] rounded-sm">
              <div
                className="h-1.5 rounded-sm"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${skill?.rating * 20}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResumeModernPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="flex border shadow-lg overflow-hidden m-auto"
      style={{ width: "792px", height: "1080px" }}
    >
      {/* Sidebar */}
      <PersonalSidebar resumeInfo={resumeInfo} />

      {/* Main Content */}
      <div className="p-6 flex-1 text-gray-800 text-sm overflow-y-auto">
        <SummarySection resumeInfo={resumeInfo} />
        {resumeInfo?.experience?.length > 0 && (
          <ExperienceSection resumeInfo={resumeInfo} />
        )}
        {resumeInfo?.education?.length > 0 && (
          <EducationSection resumeInfo={resumeInfo} />
        )}
        {resumeInfo?.skills?.length > 0 && (
          <SkillsSection resumeInfo={resumeInfo} />
        )}
      </div>
    </div>
  );
}

export default ResumeModernPreview;
