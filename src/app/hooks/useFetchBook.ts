import { Page } from "@/components/FeedItem";
import { useState, useCallback } from "react";

export function useFetchBook(topic?: string) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [buffer, setBuffer] = useState<Page[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBook = useCallback(
    async (forBuffer = false) => {
      if (loading) return;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/topics?${new URLSearchParams({
            topic: topic || "black-hole",
          })}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const book = await response.json();

        if (!book || !book.pages) {
          throw new Error("Invalid book data received");
        }

        const newPages = book.pages.map((page: Page) => ({
          ...page,
          title: book.topic,
        }));

        if (forBuffer) {
          setBuffer(newPages);
        } else {
          setPages((prev) => [...prev, ...newPages]);
          // Move the recursive call outside to avoid potential race conditions
          setTimeout(() => fetchBook(true), 0);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error fetching pages:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [topic, loading]
  ); // Add proper dependencies

  const getMorePages = useCallback(() => {
    if (buffer.length > 0) {
      setPages((prev) => [...prev, ...buffer]);
      setBuffer([]);
      fetchBook(true);
    } else {
      fetchBook(false);
    }
  }, [buffer, fetchBook]); // Add fetchBook as dependency

  return { pages, loading, error, fetchPages: getMorePages };
}
