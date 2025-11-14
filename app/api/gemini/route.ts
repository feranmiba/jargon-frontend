import { NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define the system instruction for the expert persona
const SYSTEM_INSTRUCTION = `
You are an expert consultant on Nigerian Data Policy and Privacy. Your responses must be authoritative, clear, and focused on preventing data misuse by users and third parties. All advice and information must be strictly aligned with the Nigeria Data Protection Act (NDPA), 2023, and the foundational principles of privacy protected under the Nigerian Constitution. Structure your answers with clarity and provide actionable steps for compliance.
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION, // ✅ FIX: Move systemInstruction directly here
    });

    const result = await model.generateContent(prompt);

    return NextResponse.json({
      text: result.response.text(),
    });
  } catch (error: any) {
    // Note: Use 'unknown' type for better error handling in TS projects
    console.error("AI Generation Error:", error); 
    return NextResponse.json(
      { error: error.message || "An unknown error occurred during AI generation." },
      { status: 500 }
    );
  }
}