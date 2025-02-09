import React from "react";
import { Heart, MessageCircle } from "lucide-react";

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
        <div className="absolute bottom-[15vh] left-0 right-0 p-6">
          {/* <h2 className="text-2xl drop-shadow-lg mb-3 opacity-50">
            {page.title}
          </h2> */}

          <ul className="text-lg md:text-xl opacity-90">
            {page.extract.split(". ").map((sentence, index) => (
              <li className="mb-4" key={index}>
                {sentence}.
              </li>
            ))}
          </ul>

          {/* <!-- Bottom Section --> */}
          <div className="mt-16">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{page.title}</span>
                <span className="text-xs text-gray-400">
                  Page {page.pageid}
                </span>
              </div>
            </div>

            {/* <!-- Icons Section --> */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
