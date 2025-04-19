"use client";
// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

export function getAIChatSession() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return {
      sendMessage: async () => {
        throw new Error("AI features are disabled: NEXT_PUBLIC_GOOGLE_AI_API_KEY is not set.");
      },
    };
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  return model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
}
