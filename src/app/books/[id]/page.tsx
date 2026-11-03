import BorrowButton from "@/components/books/BorrowButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //server componet theke token access
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  const token = jwtToken?.token;
  const res = await fetch(`http://localhost:8000/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const book = await res.json();

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <Image
          src={book.image}
          alt={book.title}
          width={500}
          height={650}
          className="h-auto w-full rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>

          <p className="mt-3">Author: {book.author}</p>

          <p className="mt-2">Category: {book.category}</p>

          <p className="mt-2">Available Copies: {book.copies}</p>

          <p className="mt-6 text-gray-600">{book.description}</p>
          <p className="mt-4 text-sm text-gray-500">
            Added: {new Date(book.dateAdded).toLocaleDateString()}
          </p>
          <BorrowButton bookId={id} copies={book.copies} />
        </div>
      </div>
    </main>
  );
}
