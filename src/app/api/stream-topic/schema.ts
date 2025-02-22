import { z } from "zod";

// Define a schema for Page
const pageSchema = z.object({
  extract: z.string().describe("The content of the page"),
  pageNum: z.number().describe("The page number"),
});

// Define a schema for Book
export const bookSchema = z.object({
  id: z.string().describe("The unique identifier for the book"),
  topic: z.string().describe("The topic of the book"),
  pages: z.array(pageSchema).describe("The pages of the book"),
});
