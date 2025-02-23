import { NextResponse } from "next/server";
import { requestStreamAsObject } from "../helpers";

export async function POST(request: Request) {
  const topic = await request.json();
  console.log("topic:", topic);
  if (!topic) {
    return NextResponse.json(
      {
        error: "topic is required",
      },
      { status: 400 }
    );
  }

  const freeModels = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "google/gemini-2.0-pro-exp-02-05:free",
  ];
  const paidModels = ["gpt-3.5-turbo"];

  try {
    const result = await requestStreamAsObject(topic, freeModels[0]);
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
