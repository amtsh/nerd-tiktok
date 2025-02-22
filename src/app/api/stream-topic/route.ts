import { NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const getTopicFromRequest = (request: Request): string | null => {
  const { searchParams } = new URL(request.url);
  return searchParams.get("topic");
};

const generatePrompt = (topic: string): string => {
  return `Write an engaging, beginner-friendly microlearning script on the topic ${topic}, formatted in distinct pages.
Each page should have a maximum of 6 short sentences and a total of fewer than 20 pages.
Use simple, concise language to ensure accessibility for all learners.
Break down complex ideas into relatable, easy-to-grasp concepts, using everyday examples or analogies.
Focus on making the content lively and interesting to keep the reader hooked.
Include a brief title for each page to summarize its focus.`;
};

const createOpenRouterClient = () => {
  if (!process.env.OPEN_ROUTER_API_KEY) {
    throw new Error("OPEN_ROUTER_API_KEY is not set");
  }

  return createOpenRouter({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });
};

const streamMicrolearningScript = async (topic: string) => {
  const prompt = generatePrompt(topic);
  const openrouter = createOpenRouterClient();
  const deepseekModel = "deepseek/deepseek-r1-distill-llama-70b:free";

  return await streamText({
    model: openrouter(deepseekModel),
    prompt: prompt,
  });
};

export async function GET(request: Request) {
  try {
    const topic = getTopicFromRequest(request);

    if (!topic) {
      return NextResponse.json(
        {
          error: "topic is required",
        },
        { status: 400 }
      );
    }

    const result = await streamMicrolearningScript(topic);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to stream text",
      },
      { status: 500 }
    );
  }
}
