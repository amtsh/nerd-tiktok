import { NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json(
      {
        error: "topic is required",
      },
      { status: 400 }
    );
  }

  const prompt = `Write an engaging, beginner-friendly microlearning script on the topic ${topic}, formatted in distinct pages.
Each page should have a maximum of 6 short sentences and a total of fewer than 20 pages.
Use simple, concise language to ensure accessibility for all learners.
Break down complex ideas into relatable, easy-to-grasp concepts, using everyday examples or analogies.
Focus on making the content lively and interesting to keep the reader hooked.
Include a brief title for each page to summarize its focus.`;

  const deepseekModel = "deepseek/deepseek-r1-distill-llama-70b:free";

  if (!process.env.OPEN_ROUTER_API_KEY) {
    return NextResponse.json(
      {
        error: "OPEN_ROUTER_API_KEY is not set",
      },
      { status: 500 }
    );
  }

  const openrouter = createOpenRouter({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });

  try {
    const result = await streamText({
      model: openrouter(deepseekModel),
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return NextResponse.json(
      {
        error: "Failed to stream text",
      },
      { status: 500 }
    );
  }
}
