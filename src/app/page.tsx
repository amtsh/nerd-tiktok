import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableFooter,
} from "@/components/ui/table";
import Link from "next/link";

const topics = [
  "Dark matter",
  "Seretonin",
  "Building habits",
  "Inflammation",
  "Breathing from diaphragm",
  "Photons",
  "Vagus nerve",
  "Gluten",
  "Black holes",
];

export default function Home() {
  return (
    <div className="px-4 py-16">
      <Table className="max-w-md mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="">Today&apos;s topics</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={`/feed?topic=${topic.toLowerCase().replace(/\s+/g, "-")}`}
              legacyBehavior
            >
              <TableRow className="border-0 cursor-pointer">
                <TableCell className="text-lg">{topic}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
        <span className="text-xs text-zinc-400">
          <s>Doomscrolling</s> -&gt; Curiosity scrolling
        </span>
      </div>
    </div>
  );
}
