"use client";

import { IBook } from "@/lib/type/Book";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

export default function BooksPage() {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`${API_BASE}/books`);
      const data = await res.json();

      setBooks(data);
    }

    fetchBooks();
  }, []);

  return (
    <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div key={book._id} className="rounded-lg border p-4 shadow-sm">
          <Image
            src={book.image}
            alt={book.title}
            width={300}
            height={400}
            className="h-64 w-full rounded-md object-cover"
          />

          <h2 className="mt-4 font-semibold">{book.title}</h2>

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
  );
}
