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
    <div className="h-screen w-full flex flex-col justify-between snap-start relative text-white">
      {/* Top Section */}
      <div className="p-4 pt-[calc(100px+env(safe-area-inset-top))]">
        <ul className="text-xl md:text-2xl opacity-90 leading-relaxed">
          {page.pageContent?.split(". ").map((sentence, index) => (
            <li className="mb-4" key={index}>
              {sentence}.
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4 pb-[calc(100px+env(safe-area-inset-bottom))]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-300 font-medium">
              {page.pageNum}. {page?.pageTitle}
            </span>
            <span className="text-xs text-gray-400 capitalize mt-2">
              {bookTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
