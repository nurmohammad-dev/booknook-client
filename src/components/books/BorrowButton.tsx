"use client";

interface BorrowButtonProps {
  bookId: string;
}

export default function BorrowButton({
  bookId,
}: BorrowButtonProps) {
  const handleBorrow = async () => {
    const res = await fetch(
      `http://localhost:8000/books/${bookId}/borrow`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    console.log(data);
  };

  return (
    <button
      type="button"
      onClick={handleBorrow}
      className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
    >
      Borrow This Book
    </button>
  );
}