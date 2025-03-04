import { NextResponse } from "next/server";
import { requestStreamAsObject } from "../helpers";
import NodeCache from "node-cache";
import { formatDataStreamPart } from "ai";

// Initialize cache with a TTL of 1 day (60 seconds * 60 minutes * 24 hours)
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

const prepareCacheKey = (topic: string) =>
  `topic:${topic.toLowerCase().split(" ").join("-")}`;

export async function POST(request: Request) {
  const topic = await request.json();
  console.log("topic received on server:", topic);

  if (!topic) {
    return NextResponse.json(
      {
        error: "topic is required",
      },
      { status: 400 }
    );
  }

  const topicCacheKey = prepareCacheKey(topic);

  // Check if the response is already cached
  const cached = cache.get(topicCacheKey);
  if (cached) {
    console.log("-> cache-hit for key:", topicCacheKey);

    return new Response(
      formatDataStreamPart("data", cached),
      {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      }
    );
  }

  // Cache the response when its received completely
  const onCompleteResponseReceived = (event: any) => {
    const { object, error } = event;
    const cacheValue = {
      ...event,
      object: JSON.parse(JSON.stringify(object)), // Ensure it's serializable
      error,
    };

    cache.set(topicCacheKey, cacheValue);
    console.log("-> cache-set for key:", topicCacheKey);
  };

  const freeModels = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "google/gemini-2.0-pro-exp-02-05:free",
  ];
  const paidModels = ["gpt-3.5-turbo"];

  try {
    const result = await requestStreamAsObject(
      topic,
      freeModels[0],
      onCompleteResponseReceived
    );
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
