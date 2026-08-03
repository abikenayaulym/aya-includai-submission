import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { messages, country, context } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are a strict but professional admission committee member for a university in ${country}. Context: "${context}".
1. Ask ONLY ONE question at a time.
2. Evaluate their answer briefly (1 strength, 1 weakness), then ask the NEXT question.
3. Stay in character.`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.3, 
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}