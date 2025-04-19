import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "@/service/GlobalApi";
import { useRouter } from "next/navigation";

import dummy from "../../data/dummy";
import { toast } from "sonner";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };
    GlobalApi.CreateResumeWithDummyData(data)
      .then((response) => {
        setLoading(false);
        console.log('CreateResumeWithDummyData response:', response);
        const resumeId = response?._id || response?.id || response?.data?._id || response?.data?.id;
        if (resumeId) {
          router.push("/dashboard/resume/" + resumeId + "/edit");
        } else {
          toast.error("Resume created but could not navigate to edit page (no ID found)");
        }
        toast.success("Resume Created and Updated Successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Something went wrong. Try again later.");
        setOpenDialog(false);
      });
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed border-spacing-3 border-weight-10 border-2"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <span>Add a title to your resume</span>
              <Input
                className="my-2"
                placeholder="Richard_Full_Stack_Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
