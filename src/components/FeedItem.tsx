import React from "react";

export interface Page {
  title: string;
  extract: string;
  pageid: number;
}

interface FeedItemProps {
  page: Page;
}

export function FeedItem({ page }: FeedItemProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center snap-start relative">
      <div className="h-full w-full relative text-[#EAEAEA]">
        <div className="absolute bottom-[15vh] left-0 right-0 p-6">
          <h2 className="text-2xl drop-shadow-lg mb-3">
            {page.pageid}. {page.title}
          </h2>

          <ul className="text-lg opacity-90">
            {page.extract.split(". ").map((sentence, index) => (
              <li className="mb-2" key={index}>
                {sentence}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
