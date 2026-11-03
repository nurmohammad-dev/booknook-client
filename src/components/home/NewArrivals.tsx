"use client";

import { IBook } from "@/lib/type/Book";
import { FALLBACK_BOOK_IMAGE } from "@/lib/book-image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("http://localhost:8000/books?limit=6");
      const data = await res.json();

      setBooks(data);
    }

    fetchBooks();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-8 text-center text-2xl font-bold">New Arrivals</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div key={book._id} className="rounded-lg border p-4 shadow-sm">
            <Image
              src={book.image || FALLBACK_BOOK_IMAGE}
              alt={book.title}
              width={300}
              height={400}
              className="h-64 w-full rounded-md object-cover"
            />

            <h3 className="mt-4 font-semibold">{book.title}</h3>
            <p className="text-sm">by {book.author}</p>
            <p className="mt-2 text-sm">Category: {book.category}</p>
            <Link
              href={`/books/${book._id}`}
              className="mt-4 block w-full rounded-md border px-4 py-2 text-center text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/books"
          className="inline-block rounded-md border px-6 py-2 text-sm font-medium"
        >
          See All Books
        </Link>
      </div>
    </section>
  );
};

export default NewArrivals;
