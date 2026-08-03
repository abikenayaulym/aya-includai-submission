import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are Aya AI, a highly empathetic and helpful academic advisor.
COMMUNICATION RULES:
1. ALWAYS respond in the language the user is speaking.
2. Keep text responses brief, warm, and 2-4 sentences max.
3. CRITICAL: NEVER output raw JSON or tool names like "update_ui_filters" in your text response.`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: apiMessages,
      temperature: 0.3,
      tools: [
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
      ],
      tool_choice: "auto",
    });

    if (!completion.choices || completion.choices.length === 0) {
      return NextResponse.json({ 
        isToolCall: false, 
        result: { content: "Произошла ошибка при генерации ответа." } 
      });
    }

    const responseMessage = completion.choices[0].message;
    let finalContent = responseMessage.content || "";
    let fallbackArgs = null;

    const toolKeyword = "update_ui_filters";
    const keywordIndex = finalContent.indexOf(toolKeyword);

    if (keywordIndex !== -1) {
      const remainder = finalContent.substring(keywordIndex + toolKeyword.length);
      const jsonStart = remainder.indexOf('{');
      const jsonEnd = remainder.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        fallbackArgs = remainder.substring(jsonStart, jsonEnd + 1);
      }
    }

    const cutOffKeywords = ["update_ui_filters", "function=", "function =", "<function", "tool_call", "```json", "```"];
    let earliestIndex = finalContent.length;
    
    for (const kw of cutOffKeywords) {
      const idx = finalContent.toLowerCase().indexOf(kw.toLowerCase());
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
      }
    }

    if (earliestIndex < finalContent.length) {
      finalContent = finalContent.substring(0, earliestIndex);
    }
    
    finalContent = finalContent.replace(/[<>]/g, '').trim();

    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolCall = responseMessage.tool_calls[0];
      let safeArgs = "{}";
      
      try {
        JSON.parse(toolCall.function.arguments);
        safeArgs = toolCall.function.arguments;
      } catch (e) {
        safeArgs = "{}";
      }

      return NextResponse.json({ 
        isToolCall: true,
        toolData: {
          name: toolCall.function.name,
          arguments: safeArgs
        },
        aiText: finalContent !== "" ? finalContent : "✨ Я обновила фильтры!" 
      });
    }

    if (fallbackArgs) {
      let safeArgs = "{}";
      
      try {
        JSON.parse(fallbackArgs);
        safeArgs = fallbackArgs;
      } catch (e) {
        safeArgs = "{}";
      }

      return NextResponse.json({
        isToolCall: true,
        toolData: {
          name: "update_ui_filters",
          arguments: safeArgs
        },
        aiText: finalContent !== "" ? finalContent : "✨ Я обновила фильтры!"
      });
    }

    return NextResponse.json({ 
      isToolCall: false, 
      result: { content: finalContent !== "" ? finalContent : "Привет! Чем могу помочь?" } 
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
