import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongoose';
import Resume from '@/models/Resume';

export async function GET(req) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const resumes = await Resume.find({ userId });
  return new Response(JSON.stringify(resumes), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const data = await req.json();
  const newResume = await Resume.create({ ...data, userId });
  return new Response(JSON.stringify(newResume), { status: 201 });
} 