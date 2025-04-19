import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req) {
  try {
    // Parse form-data
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'No PDF file uploaded.' }, { status: 400 });
    }

    // Prepare file for ConvertAPI
    const convertApiUrl = `https://v2.convertapi.com/convert/pdf/to/jpg?Secret=${process.env.NEXT_PUBLIC_CONVERTAPI_SECRET}`;
    const convertForm = new FormData();
    convertForm.append('File', file, file.name);

    // Call ConvertAPI
    const convertRes = await fetch(convertApiUrl, {
      method: 'POST',
      body: convertForm,
    });
    if (!convertRes.ok) {
      return NextResponse.json({ error: 'Failed to convert PDF.' }, { status: 500 });
    }
    const convertData = await convertRes.json();
    // Get the first image file's base64 data
    const fileInfo = convertData.Files?.[0];
    if (!fileInfo || !fileInfo.FileData) {
      return NextResponse.json({ error: 'Failed to convert PDF to image.' }, { status: 500 });
    }
    // Add data URL prefix
    const imageBase64 = `data:image/jpeg;base64,${fileInfo.FileData}`;
    return NextResponse.json({ imageBase64 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 