import {
  createOpenRouter,
  OpenRouterProvider,
} from "@openrouter/ai-sdk-provider";
import { streamObject, streamText } from "ai";
import { bookSchema } from "./stream-topic-as-object/schema";

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

const beginnerFriendlyPrompt = `Use simple, concise language to ensure accessibility for all learners.`;

const generatePrompt = (query: string): string => {
  return `Write an engaging content on the topic ${query}, formatted in distinct pages.
Each page should have a maximum of 6 sentences and a total of more than 10 pages but fewer than 20 pages.
Break down complex ideas into relatable, easy-to-grasp concepts.
Focus on making the content lively, interesting and concise to keep the reader hooked.`;
};

export const requestStreamAsText = async (
  query: string,
  llmModelName: string
) => {
  const openrouter = getOpenRouterClient();

  return await streamText({
    model: openrouter(llmModelName),
    prompt: generatePrompt(query),
  });
};

export const requestStreamAsObject = async (
  query: string,
  llmModelName: string,
  onFinish?: (event: any) => void
) => {
  const openrouter = getOpenRouterClient();

  return await streamObject({
    model: openrouter(llmModelName),
    system: `You are helpful assistant and expert in the topic ${query}`,
    prompt: generatePrompt(query),
    schema: bookSchema,
    onFinish,
  });
};
