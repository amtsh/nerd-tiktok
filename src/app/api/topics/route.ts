import { NextResponse } from "next/server";
import { mockBooksData } from "@/lib/mockBooksData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json(
      {
        error:
          "topic parameter is required. Example /api/topics?topic=black-hole",
      },
      { status: 400 }
    );
  }

  try {
    const book = await mockBooksData(topic);

    if (!book) {
      return NextResponse.json(
        { error: "No results found for this topic" },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching topic data:", error);
    return NextResponse.json(
      { error: "Failed to fetch topic data" },
      { status: 500 }
    );
  }
}
