import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { targetCountry, scholarship, homeCountry, engCert, localCert } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    let certCostInstruction = "LANGUAGE EXAM COSTS TO INCLUDE:\n";
    if (engCert && !engCert.includes("None")) certCostInstruction += `- Include cost for ${engCert} exam.\n`;
    if (localCert && !localCert.includes("None")) certCostInstruction += `- Include cost for ${localCert} exam.\n`;
    if (certCostInstruction === "LANGUAGE EXAM COSTS TO INCLUDE:\n") certCostInstruction = "- DO NOT include any language exam costs.\n";

    const systemPrompt = `You are an Empathetic Application Planner.
Break down the application process for ${scholarship} in ${targetCountry} into 4 micro-tasks. 
Estimate hidden costs in USD for a student from ${homeCountry}.

CRITICAL RULES:
${certCostInstruction}
- DO NOT INCLUDE FLIGHT TICKETS if scholarship is MEXT, CSC, GKS, Chevening, Vanier, or Fulbright.
- Do not include tuition fees.

Return JSON:
{
  "burnoutMessage": "<1-sentence empathy message>",
  "hiddenCosts": [{ "item": "string", "cost": 45, "note": "string" }],
  "totalHiddenCost": <number>,
  "microTasks": [{ "title": "string", "timeEstimate": "10 mins", "antiBurnoutTip": "string" }]
}`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: "Generate." }],
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    return NextResponse.json(JSON.parse(completion.choices[0].message.content || "{}"));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}