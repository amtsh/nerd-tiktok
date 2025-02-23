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

  try {
    const result = await requestStreamAsObject(topic, "gpt-3.5-turbo");
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
