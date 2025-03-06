import React from "react";

export interface Page {
  pageTitle?: string;
  pageContent?: string;
  pageNum?: number;
}

interface FeedItemProps {
  bookTitle?: string;
  page?: Page;
}

export function FeedItem({ page, bookTitle }: FeedItemProps) {
  if (!page) return null;

  return (
    <div className="h-screen w-full flex items-center justify-center snap-start relative text-white">
      <div className="h-full w-full relative p-4">
        <div className="absolute bottom-[calc(100px+env(safe-area-inset-bottom))] left-0 right-0 p-4">
          <ul className="text-xl md:text-2xl opacity-90 leading-relaxed">
            {page.pageContent?.split(". ").map((sentence, index) => (
              <li className="mb-4" key={index}>
                {sentence}.
              </li>
            ))}
          </ul>

          {/* Bottom Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">
                  {page.pageNum}. {page?.pageTitle}
                </span>
                <span className="text-xs text-gray-400 capitalize mt-2">
                  {bookTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
