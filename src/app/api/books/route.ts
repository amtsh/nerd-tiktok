import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const NUM_TOPICS = 5;
  const prompt = `Generate a list of ${NUM_TOPICS} trending, interesting, simple, no-nonsense, concisely named topics that sparks curiosity. Only output comma separated list without any numbering.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "developer", content: prompt }],
      model: "gpt-3.5-turbo",
      store: false,
    });

    const topics = completion.choices[0].message.content;

    return NextResponse.json(topics?.split(", ") || []);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching topics:", error.message);
    } else {
      console.error("Error fetching topics:", error);
    }
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
