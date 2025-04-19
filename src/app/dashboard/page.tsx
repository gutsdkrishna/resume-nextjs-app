"use client";
import Dashboard from '../../dashboard/index';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
export default function DashboardPage() {
    return (
        <>
            <SignedIn>
                <Dashboard />
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
} 