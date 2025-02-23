import { NextResponse } from "next/server";
import { requestStreamAsText } from "../helpers";

const getTopicFromRequest = (request: Request): string | null => {
  const { searchParams } = new URL(request.url);
  return searchParams.get("topic");
};

export async function POST(request: Request) {
  const { prompt: topic } = await request.json();
  console.log("topic:", topic);

  if (!topic) {
    return NextResponse.json(
      {
        error: "topic is required",
      },
      { status: 400 }
    );
  }

  try {
    const result = await requestStreamAsText(topic, "gpt-3.5-turbo");
    return result.toDataStreamResponse();
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
