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
      <div className="h-full w-full relative">
        <div className="absolute inset-0" />

        {/* Content container with z-index to ensure it's above the image */}
        <div className="absolute bottom-[10vh] left-0 right-0 p-6 text-white z-10">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl drop-shadow-lg">
              {page.title} - Page {page.pageid}
            </h2>
          </div>
          <p className="">{page.extract}</p>
          {/* <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:text-gray-200 drop-shadow-lg"
          >
            Read more →
          </a> */}
        </div>
      </div>
    </div>
  );
}
