"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { API_BASE, getAuthToken, authHeaders } from "@/lib/api";

interface BorrowButtonProps {
  bookId: string;
  copies: number;
}

export default function BorrowButton({
  bookId,
  copies,
}: BorrowButtonProps) {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    // Assignment: a logged-out user clicking "Borrow" must be sent to Login
    // and come back to this page after logging in
    if (!user?.email) {
      router.push(`/login?redirect=/books/${bookId}`);
      return;
    }

    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isBorrowing) return;

    setError("");
    setIsModalOpen(false);
  };

  const handleBorrow = async () => {
    if (!user?.email) {
      setError("Please login first to borrow this book.");
      return;
    }

    try {
      setIsBorrowing(true);
      setError("");

      const res = await fetch(`${API_BASE}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeaders(await getAuthToken()) as Record<string, string>),
        },
        body: JSON.stringify({
          bookId,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to borrow this book.");
        return;
      }

      console.log("Borrow successful:", data);

      setIsModalOpen(false);

      // Refresh book details so available copies update
      router.refresh();
    } catch (error) {
      console.error("Borrow error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <>
      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={openModal}
          disabled={copies === 0}
          className="flex-1 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300 disabled:opacity-60"
        >
          {copies === 0 ? "Not Available" : "Borrow This Book"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/books")}
          className="flex-1 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to All Books
        </button>
      </div>

      {/* Borrow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Borrow This Book
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Confirm your information before borrowing this book.
            </p>

            <div className="mt-6 space-y-4">
              {/* User Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  User Name
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isBorrowing}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleBorrow}
                  disabled={isBorrowing || !user?.email}
                  className="flex-1 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isBorrowing ? "Borrowing..." : "Confirm Borrow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}