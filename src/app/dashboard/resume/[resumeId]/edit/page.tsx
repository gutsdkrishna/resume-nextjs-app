"use client";
import EditResume from '../../../../../dashboard/resume/[resumeId]/edit/index';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
export default function EditResumePage() {
    return (
        <>
            <SignedIn>
                <EditResume />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
} 