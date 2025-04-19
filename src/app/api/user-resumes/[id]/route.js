import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongoose';
import Resume from '@/models/Resume';

export async function GET(req, context) {
  await dbConnect();
  const { params } = await context;
  const { id } = await params;
  // Public access: do not check userId
  const resume = await Resume.findOne({ _id: id });
  if (!resume) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(resume), { status: 200 });
}

export async function PUT(req, context) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { params } = await context;
  const { id } = await params;
  const data = await req.json();
  // Always set userId on update
  const updated = await Resume.findOneAndUpdate({ _id: id, userId }, { ...data, userId }, { new: true });
  if (!updated) {
    return new Response(JSON.stringify({ error: 'Not found or not authorized' }), { status: 404 });
  }
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, context) {
  await dbConnect();
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const { params } = await context;
  const { id } = await params;
  const deleted = await Resume.findOneAndDelete({ _id: id, userId });
  if (!deleted) {
    return new Response(JSON.stringify({ error: 'Not found or not authorized' }), { status: 404 });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 