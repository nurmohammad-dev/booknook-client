"use client";

import { IBook } from "@/lib/type/Book";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("http://localhost:8000/books");
      const data = await res.json();

      setBooks(data);
    }

    fetchBooks();
  }, []);

return (
  <section className="mx-auto max-w-6xl px-4 py-12">
    <h2 className="mb-8 text-center text-2xl font-bold">
      New Arrivals
    </h2>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="rounded-lg border p-4 shadow-sm"
        >
          <h3 className="font-semibold">{book.title}</h3>

          <p className="text-sm">
            by {book.author}
          </p>

          <p className="mt-2 text-sm">
            Category: {book.category}
          </p>

          <p className="text-sm">
            Copies: {book.copies}
          </p>

          <p className="mt-2 text-sm">
            {book.description}
          </p>
          <Image
          src={book.image}
          alt={book.title}
         className="h-64 w-full object-cover"
            />
        </div>
      ))}
    </div>
  </section>
);
};

export default NewArrivals;