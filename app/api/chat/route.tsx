import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. ИЗМЕНЕННЫЙ ПРОМПТ: Убрали правило "никогда не возвращай пустую строку" 
    // и жестко запретили писать теги в тексте.
    let systemPrompt = `You are Aya AI, a highly empathetic and helpful academic advisor.
COMMUNICATION RULES:
1. ALWAYS respond in the language the user is speaking.
2. Keep text responses brief, warm, and 2-4 sentences max.
3. CRITICAL: If you need to use the update_ui_filters tool, just call the tool. DO NOT write <function> tags, XML, or raw JSON in your text response.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const tools = [
      {
        type: "function",
        function: {
          name: "update_ui_filters",
          description: "Update filters for finding programs. ONLY call this if the user explicitly mentions filtering by country, scholarship, budget, etc.",
          parameters: {
            type: "object",
            properties: {
              country: { type: "string" },
              scholarship: { type: "string" },
              budget: { type: "string" },
              gpa: { type: "string" },
              field: { type: "string" },
              language: { type: "string" },
              format: { type: "string" },
              duration: { type: "string" },
              certificate: { type: "string" }
            }
          }
        }
      }
    ];

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: apiMessages,
      temperature: 0.3,
      tools: tools,
      tool_choice: "auto",
    });

    const responseMessage = completion.choices[0].message;

    // 2. БРОНЕЖИЛЕТ НА БЭКЕНДЕ: Жестко вырезаем мусор, если Llama всё равно его выдала
    let cleanContent = responseMessage.content || "";
    cleanContent = cleanContent.replace(/<function[^>]*>[\s\S]*?<\/function>/gi, '').trim();
    cleanContent = cleanContent.replace(/```json[\s\S]*?```/gi, '').trim();

    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0];
      return NextResponse.json({ 
        isToolCall: true,
        toolData: toolCall.function,
        aiText: cleanContent !== "" ? cleanContent : "✨ Я обновила фильтры по твоему запросу!" 
      });
    }

    const finalContent = cleanContent !== "" 
      ? cleanContent 
      : "Привет! Я Aya. Чем я могу помочь тебе с поступлением сегодня?";

    return NextResponse.json({ 
      isToolCall: false, 
      result: { content: finalContent } 
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}