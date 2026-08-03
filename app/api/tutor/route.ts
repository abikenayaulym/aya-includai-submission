import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are an expert ETS TOEFL iBT examiner and Academic English University Tutor.
Your task is to analyze a student's simple text, elevate it to academic university level, and estimate a TOEFL Writing score (0-30).

You MUST respond ONLY with a valid JSON object. Do not include any other text or markdown code blocks outside the JSON.
The JSON must perfectly match this structure:
{
  "score": <number 0-30 representing TOEFL Writing score estimate>,
  "academicVersion": "<A fully rewritten, C1/C2 academic level version of their text>",
  "vocabularyUpgrades": [
    { "simple": "cool", "academic": "innovative", "explanation": "Why this word fits academic context better" }
  ],
  "feedback": ["Grammar or structural feedback 1", "Feedback 2"]
}`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is my draft text. Please evaluate and upgrade it:\n\n${text}` }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content || "{}";
    
    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse);
    } catch (e) {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      parsedData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsedData) {
      throw new Error("AI did not return a valid JSON format.");
    }

    return NextResponse.json(parsedData);
    
  } catch (error: any) {
    console.error("TUTOR API ERROR:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}