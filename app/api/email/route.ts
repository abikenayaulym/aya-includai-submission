import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { country, professorName, researchInterest } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are an expert in academic etiquette for ${country}.
The user wants to write an email. 
Target: ${professorName}
Topic/Question: ${researchInterest}

CRITICAL RULES:
1. IF the user asks an administrative question (e.g. "сколько стоит учеба", "when is the deadline"), DO NOT write a research proposal. Write a polite email to the Admissions Office asking that specific question.
2. IF the user wants a supervisor, write a Cold Email for research supervision and include this placeholder exactly: "[INSERT 1-2 SENTENCES ANALYZING THEIR SPECIFIC PAPER TITLED 'INSERT_PAPER_TITLE']".
3. Adapt tone to ${country}. Output ONLY the email text.`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the email draft." }
      ],
      temperature: 0.2, 
    });

    return NextResponse.json({ email: completion.choices[0].message.content });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}