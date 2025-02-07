import { Share2 } from "lucide-react";

export interface WikiArticle {
  title: string;
  extract: string;
  pageid: number;
  url: string;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
}

interface WikiCardProps {
  article: WikiArticle;
}

export function Item({ article }: WikiCardProps) {
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
              <h2 className="text-2xl font-bold drop-shadow-lg">
                {article.title}
              </h2>
            </a>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                aria-label="Share article"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-100 mb-4 drop-shadow-lg line-clamp-6">
            {article.extract}
          </p>
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
