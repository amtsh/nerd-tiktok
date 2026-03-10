import {
  createOpenRouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { streamObject } from "ai";
import { bookSchema } from "./stream-topic-as-object/schema";
import { Mode } from "@/lib/types";

let openRouterClient: OpenRouterProvider | null = null;

const getOpenRouterClient = () => {
  if (openRouterClient) {
    return openRouterClient;
  }

  const openRouterApiKey = process.env.OPEN_ROUTER_API_KEY;
  if (!openRouterApiKey) {
    throw new Error("OPEN_ROUTER_API_KEY is not set");
  }

  openRouterClient = createOpenRouter({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });

  return openRouterClient;
};

const getPromptByMode = (mode: Mode, query: string) => {
  const outputFormatPrompt = ` Output should be formatted in distinct pages. Each page should have a maximum of 6 sentences and a total of more than 10 pages but fewer than 20 pages.`;
  if (mode === Mode.LEARN) {
    const learnPrompt = `Write an engaging content on the topic ${query}.
${outputFormatPrompt}
Break down complex ideas into relatable, easy-to-grasp concepts.
Focus on making the content lively, interesting and concise to keep the reader hooked.`;

    return learnPrompt;
  }

  if (mode === Mode.STORY) {
    const storyPrompt = `Write a medium length story on the theme ${query}.
${outputFormatPrompt}`;

    return storyPrompt;
  }
};

export const requestStreamAsObject = async (
  query: string,
  mode: Mode,
  llmModelName: string,
  onFinish?: (event: any) => void
) => {
  const openrouter = getOpenRouterClient();

  return await streamObject({
    model: openrouter(llmModelName),
    system: `You are helpful assistant.`,
    prompt: getPromptByMode(mode as Mode, query),
    schema: bookSchema,
    onFinish,
  });
};
