import books from "./books.json";

export interface Page {
  extract: string;
  pageNum: number;
}

export interface Book {
  id: string;
  topic: string;
  pages: Page[];
}

export async function mockBooksData(bookId: string): Promise<Book> {
  // find book else return first book
  return books.find((b) => b.id === bookId) ?? books[0];
}
