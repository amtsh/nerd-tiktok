import { NextResponse } from "next/server";
import { requestStreamAsObject } from "../helpers";
import { Mode } from "@/shared/types";
export async function POST(request: Request) {
  const { query, mode } = await request.json();
  console.log("query", query);
  console.log("mode", mode);

  if (!query) {
    return NextResponse.json(
      {
        error: "query is required",
      },
      { status: 400 }
    );
  }

  const model = "x-ai/grok-4.1-fast";

  try {
    const result = await requestStreamAsObject(
      query as string,
      mode as Mode,
      model
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
