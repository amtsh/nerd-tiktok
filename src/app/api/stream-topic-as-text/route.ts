import { NextResponse } from "next/server";
import { requestStreamAsText } from "../helpers";

const getTopicFromRequest = (request: Request): string | null => {
  const { searchParams } = new URL(request.url);
  return searchParams.get("query");
};

export async function POST(request: Request) {
  const { prompt: query } = await request.json();
  console.log("query received on server:", query);

  if (!query) {
    return NextResponse.json(
      {
        error: "query is required",
      },
      { status: 400 }
    );
  }

  try {
    const result = await requestStreamAsText(query, "gpt-3.5-turbo");
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
