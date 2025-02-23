export interface WikiArticle {
  title: string;
  pageContent: string;
  pageid: number;
  url: string;
}

export async function searchWikipediaArticles(topic: string): Promise<WikiArticle[]> {
  const response = await fetch(
    "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        format: "json",
        generator: "search",
        gsrsearch: topic,
        gsrlimit: "20",
        prop: "extracts|pageimages|info",
        inprop: "url",
        exintro: "1",
        exlimit: "max",
        exsentences: "5",
        explaintext: "1",
        piprop: "thumbnail",
        pithumbsize: "400",
        origin: "*",
      })
  );

  const data = await response.json();

  if (!data.query?.pages) {
    return [];
  }

  return Object.values(data.query.pages)
    .map((page: any) => ({
      title: page.title,
      pageContent: page.pageContent,
      pageid: page.pageid,
      url: page.canonicalurl,
    }))
    .filter((article) => article.url && article.pageContent);
} 