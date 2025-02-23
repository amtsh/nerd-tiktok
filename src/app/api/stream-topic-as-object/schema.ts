import { z } from "zod";

// Define a schema for Page
const pageSchema = z.object({
  pageNum: z.number().describe("page number"),
  pageTitle: z.string().describe("Brief title for the page content"),
  pageContent: z.string().describe("Content of the page"),
});

// Define a schema for Book
export const bookSchema = z.object({
  id: z.string().describe("unique identifier for the book"),
  topic: z.string().describe("topic of the book"),
  pages: z.array(pageSchema).describe("pages of the book"),
});
