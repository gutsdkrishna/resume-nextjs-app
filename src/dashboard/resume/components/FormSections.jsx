"use client";
import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import ThemeColor from "./ThemeColor";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const params = useParams();
  const resumeId = params.resumeId;
  const router = useRouter();

  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push("/my-resume/" + resumeId + "/view");
    }
  }, [activeFormIndex, resumeId, router]);

  useEffect(() => {
    setEnableNext(false);
  }, [activeFormIndex]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link href={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {" "}
            Next
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : null}
    </div>
  );
}

export default FormSection;
