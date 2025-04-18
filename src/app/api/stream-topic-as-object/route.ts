import { NextResponse } from "next/server";
import { requestStreamAsObject } from "../helpers";
import { Mode } from "@/lib/types";
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

  const freeModels = [
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-2.5-pro-exp-03-25:free",
  ];
  const paidModels = ["gpt-3.5-turbo"];

  try {
    const result = await requestStreamAsObject(
      query as string,
      mode as Mode,
      freeModels[0]
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
