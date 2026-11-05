"use client";

import { IBook } from "@/lib/type/Book";
import { FALLBACK_BOOK_IMAGE } from "@/lib/book-image";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function BooksList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
      const data = await res.json();

      setBooks(data);
    }

    fetchBooks();
  }, []);

  const filteredBooks = category
    ? books.filter(
        (book) => book.category.toLowerCase() === category.toLowerCase(),
      )
    : books;

  return (
    <main className="min-h-screen bg-[#060e0c] py-8">
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
        {category && (
          <h1 className="mb-6 text-2xl font-bold text-white">
            {category.charAt(0).toUpperCase() + category.slice(1)} Books
          </h1>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="rounded-2xl border border-white/[0.08] bg-[#0a1012] p-4 shadow-lg shadow-black/20"
              >
                <Image
                  src={book.image || FALLBACK_BOOK_IMAGE}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="h-64 w-full rounded-lg object-cover"
                />

                <h2 className="mt-4 font-semibold text-white">{book.title}</h2>

                <p className="text-sm text-white/50">by {book.author}</p>

                <p className="mt-2 text-sm text-white/40">
                  Category: {book.category}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-4 block w-full rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-2.5 text-center text-sm font-medium text-emerald-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-200"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-white/50">No books found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<p className="p-8 text-white">Loading books...</p>}>
      <BooksList />
    </Suspense>
  );
}
