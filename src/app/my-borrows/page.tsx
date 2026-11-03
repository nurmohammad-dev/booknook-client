"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BookOpen, CircleCheck, CircleX } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Borrow } from "@/lib/type/Borrow";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function MyBorrowsPage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const fetchBorrows = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `http://localhost:8000/borrows?email=${encodeURIComponent(
            user.email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch borrowed books"
          );
        }

        setBorrows(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load your borrowed books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [user?.email]);

  const handleReturn = async (borrowId: string) => {
    try {
      setReturningId(borrowId);
      setError("");
      setSuccess("");

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `http://localhost:8000/borrows/${borrowId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to return book"
        );
      }

      setBorrows((prev) =>
        prev.filter((borrow) => borrow._id !== borrowId)
      );

      setSuccess("Book returned successfully.");
    } catch (error) {
      console.error(error);
      setError("Failed to return the book. Please try again.");
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#060e0c] px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardContent className="flex min-h-[300px] items-center justify-center">
              <Spinner className="size-10 text-emerald-500" />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060e0c] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              My Borrows
            </CardTitle>

            <CardDescription>
              Books you have currently borrowed.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success Message */}
            {success && (
              <Alert className="mb-6 border-emerald-200 bg-emerald-50 text-emerald-700">
                <CircleCheck />
                <AlertTitle>{success}</AlertTitle>
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <CircleX />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            {/* Empty State */}
            {borrows.length === 0 ? (
              <Empty className="rounded-lg border bg-card">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BookOpen />
                  </EmptyMedia>

                  <EmptyTitle>No borrowed books</EmptyTitle>

                  <EmptyDescription>
                    You have not borrowed any books yet.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead className="text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {borrows.map((borrow) => (
                      <TableRow key={borrow._id}>
                        {/* Book Image */}
                        <TableCell>
                          <div className="relative h-16 w-12 overflow-hidden rounded-md">
                            <Image
                              src={borrow.bookImage}
                              alt={borrow.bookTitle}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </TableCell>

                        {/* Book Title */}
                        <TableCell className="font-medium">
                          {borrow.bookTitle}
                        </TableCell>

                        {/* Borrow Date */}
                        <TableCell>
                          {formatDate(borrow.borrowDate)}
                        </TableCell>

                        {/* Return Date */}
                        <TableCell>
                          {formatDate(borrow.returnDate)}
                        </TableCell>

                        {/* Return Button */}
                        <TableCell className="text-right">
                          <Button
                            type="button"
                            onClick={() =>
                              handleReturn(borrow._id)
                            }
                            disabled={
                              returningId === borrow._id
                            }
                            className="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                          >
                            {returningId === borrow._id
                              ? "Returning..."
                              : "Return Book"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}