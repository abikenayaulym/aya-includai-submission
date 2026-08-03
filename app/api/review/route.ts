import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { letter, isBrainDump } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const contextInstruction = isBrainDump 
      ? `The user used "Brain Dump Mode". They spoke chaotic, unstructured thoughts. Your job is to structure them into a beautiful academic narrative.`
      : `The user provided a draft. If it is very short (like "I have never traveled"), DO NOT punish them with a terrible score (give at least 50-60%). Instead, expand on their vulnerability and turn it into a powerful essay about their drive to explore the world.`;

    const systemPrompt = `You are a supportive, expert admissions reviewer.
${contextInstruction}

1. Expand the user's exact input. Do not use generic placeholders.
2. Return JSON exactly:
{
  "score": <number>,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "tips": ["string"],
  "improvedText": "<Fully expanded, polished version>"
}`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Draft to review:\n"${letter}"` }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const parsed = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json(parsed);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}