"use client";

import { IBook } from "@/lib/type/Book";
import { FALLBACK_BOOK_IMAGE } from "@/lib/book-image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        setBooks(Array.isArray(data) ? data : []);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    fetchBooks();
  }, [reloadKey]);

  return (
    <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-sm text-white/45">
            The latest books added by our members.
          </p>
        </div>

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-emerald-500" />
            <p className="text-sm">Loading new arrivals...</p>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-sm text-red-400">
              Something went wrong while loading new arrivals. Please try again.
            </p>

            <button
              onClick={() => {
                setStatus("loading");
                setReloadKey((k) => k + 1);
              }}
              className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-5 py-2.5 text-sm font-medium text-emerald-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {status === "ready" && books.length === 0 && (
          <p className="py-16 text-center text-white/50">
            No books have been added yet.
          </p>
        )}

        {/* Books grid */}
        {status === "ready" && books.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book._id}
                className="rounded-xl border border-white/[0.08] bg-[#0a1012] p-3 shadow-lg shadow-black/20 transition-colors duration-300 hover:border-emerald-400/40"
              >
                <Image
                  src={book.image || FALLBACK_BOOK_IMAGE}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="h-48 w-full rounded-lg object-cover sm:h-52"
                />

                <h3 className="mt-3 truncate text-sm font-semibold text-white">
                  {book.title}
                </h3>

                <p className="truncate text-xs text-white/50">
                  by {book.author}
                </p>

                <p className="mt-1 truncate text-xs text-white/40">
                  {book.category}
                </p>

                <Link
                  href={`/books/${book._id}`}
                  className="mt-3 block w-full rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-3 py-2 text-center text-xs font-medium text-emerald-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-200"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* See all books */}
        <div className="mt-10 text-center">
          <Link
            href="/books"
            className="inline-block rounded-xl border border-emerald-400/30 bg-emerald-400/5 px-6 py-2.5 text-sm font-medium text-emerald-300 transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-200"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
