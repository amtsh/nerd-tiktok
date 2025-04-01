import { NextResponse } from "next/server";
import { mockBook } from "./mock-data";

export async function GET() {
  return NextResponse.json(mockBook);
}