import React from "react";

export interface Article {
  title: string;
  extract: string;
  pageid: number;
  url: string;
}

interface FeedItemProps {
  article: Article;
}

export function FeedItem({ article }: FeedItemProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center snap-start relative">
      <div className="h-full w-full relative">
        <div className="absolute inset-0" />

        {/* Content container with z-index to ensure it's above the image */}
        <div className="absolute bottom-[10vh] left-0 right-0 p-6 text-white z-10">
          <div className="flex justify-between items-start mb-3">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              <h2 className="text-2xl drop-shadow-lg">{article.title}</h2>
            </a>
          </div>
          <p className="">{article.extract}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:text-gray-200 drop-shadow-lg"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
