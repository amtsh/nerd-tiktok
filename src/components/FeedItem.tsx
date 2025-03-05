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
    <div className="h-screen w-full flex items-center justify-center snap-start relative">
      <div className="h-full w-full relative">
        <div className="absolute bottom-[calc(100px+env(safe-area-inset-bottom))] left-0 right-0 p-4">
          <ul className="text-xl md:text-2xl opacity-90">
            {page.pageContent?.split(". ").map((sentence, index) => (
              <li className="mb-4" key={index}>
                {sentence}.
              </li>
            ))}
          </ul>

          {/* <!-- Bottom Section --> */}
          <div className="mt-8">
            <div className="flex justify-right items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 font-medium">
                  {page.pageNum}. {page?.pageTitle}
                </span>
                <span className="text-xs text-gray-400 capitalize mt-2">
                  {bookTitle}
                </span>
              </div>
            </div>

            {/* <!-- Icons Section --> 
            <div className="flex flex-col items-end space-y-8 text-gray-400 absolute bottom-6 right-4">
              <div className="flex items-center space-x-1">
                <Heart size={24} />
                <span className="text-xs">1</span>
              </div>

              <div className="flex items-center space-x-1">
                <MessageCircle size={24} />
                <span className="text-xs">1</span>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
