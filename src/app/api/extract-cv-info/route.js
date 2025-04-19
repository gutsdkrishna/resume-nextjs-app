import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }
    const client = new OpenAI({
      baseURL: 'https://api.studio.nebius.com/v1/',
      apiKey: process.env.NEXT_PUBLIC_NEBIUS_GEMMA_API_KEY,
    });
    const systemPrompt = `You are a professional CV parser.\n\nExtract all available structured information from this resume image.\n\nRespond with ONLY the following JSON object, with NO extra text, NO markdown, and NO comments.\nIf any information is missing, leave the field blank.\n\n{\n  personal: {\n    name: string,\n    email: string,\n    phone: string,\n    address: string\n  },\n  summary: string,\n  experience: [\n    {\n      jobTitle: string,\n      company: string,\n      startDate: string,\n      endDate: string,\n      description: string\n    }\n  ],\n  education: [\n    {\n      degree: string,\n      institution: string,\n      startDate: string,\n      endDate: string\n    }\n  ],\n  skills: [string]\n}\n\nOnly extract what is clearly visible. Do not hallucinate or make up data. Preserve original phrasing and formatting where possible.`;
    const result = await client.chat.completions.create({
      model: "google/gemma-3-27b-it",
      max_tokens: 8192,
      temperature: 0.5,
      top_p: 0.9,
      extra_body: { top_k: 50 },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Extract all information as per the instructions" },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
    });
    // Try to parse the model's response as JSON
    let extracted = null;
    let text = result.choices?.[0]?.message?.content;
    // Remove markdown code block if present
    if (text && text.trim().startsWith('```')) {
      text = text.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
    }
    try {
      extracted = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Failed to parse extracted information.', raw: text }, { status: 500 });
    }
    return NextResponse.json({ extracted });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 