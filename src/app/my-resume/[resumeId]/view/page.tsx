"use client";
import ViewResume from './ViewResume.jsx';
import { useParams } from 'next/navigation';
export default function ViewResumePage() {
    const params = useParams();
    return <ViewResume resumeId={params.resumeId} />;
} 