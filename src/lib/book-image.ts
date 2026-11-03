import { IBook } from "@/lib/type/Book";

/**
 * Shown when a book was saved without an image, so `next/image`
 * never receives an empty or invalid src.
 */
export const FALLBACK_BOOK_IMAGE =
  "https://placehold.co/600x800/0f172a/64748b/png?text=BookNook";
