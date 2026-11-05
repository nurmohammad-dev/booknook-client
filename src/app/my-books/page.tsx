"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Edit, Trash2, Upload } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { FALLBACK_BOOK_IMAGE } from "@/lib/book-image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  description: string;
  image: string;
  addedBy: string;
  addedByEmail: string;
  dateAdded: string;
}

interface EditForm {
  title: string;
  author: string;
  category: string;
  copies: number;
  description: string;
}

const categories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export default function MyBooksPage() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit
  const [editingBook, setEditingBook] = useState<Book | null>(
    null
  );

  const [editForm, setEditForm] = useState<EditForm>({
    title: "",
    author: "",
    category: "",
    copies: 1,
    description: "",
  });

  const [editImage, setEditImage] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);

  // Delete
  const [deletingBook, setDeletingBook] = useState<Book | null>(
    null
  );

  const [deleting, setDeleting] = useState(false);

  // Fetch user's books
  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const fetchMyBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/books`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to fetch books"
          );
        }

        const myBooks = data.filter(
          (book: Book) =>
            book.addedByEmail === user.email
        );

        setBooks(myBooks);
      } catch (error) {
        console.error(error);
        setError("Failed to load your books.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [user?.email]);

  // Open edit dialog
  const handleEdit = (book: Book) => {
    setEditingBook(book);

    setEditForm({
      title: book.title,
      author: book.author,
      category: book.category,
      copies: book.copies,
      description: book.description,
    });

    setEditImage(null);
    setError("");
    setSuccess("");
  };

  // Update form
  const updateEditForm = (
    field: keyof EditForm,
    value: string | number
  ) => {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Update book
  const handleUpdate = async () => {
    if (!editingBook) {
      return;
    }

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      let imageUrl = editingBook.image;

      // Upload new image if selected
      if (editImage) {
        const imageFormData = new FormData();

        imageFormData.append("image", editImage);

        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const imageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageFormData,
          }
        );

        const imageData = await imageResponse.json();

        if (!imageResponse.ok) {
          throw new Error(
            imageData.message || "Image upload failed"
          );
        }

        imageUrl = imageData.imageUrl;
      }

      const bookData = {
        title: editForm.title,
        author: editForm.author,
        category: editForm.category,
        copies: editForm.copies,
        description: editForm.description,
        image: imageUrl,
      };

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editingBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update book"
        );
      }

      // Update UI
      setBooks((current) =>
        current.map((book) =>
          book._id === editingBook._id
            ? {
                ...book,
                ...bookData,
              }
            : book
        )
      );

      setEditingBook(null);
      setEditImage(null);

      setSuccess("Book updated successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update book."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Delete book
  const handleDelete = async () => {
    if (!deletingBook) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${deletingBook._id}`,
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
          data.message || "Failed to delete book"
        );
      }

      // Remove from UI
      setBooks((current) =>
        current.filter(
          (book) => book._id !== deletingBook._id
        )
      );

      setDeletingBook(null);

      setSuccess("Book deleted successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete book."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#060e0c] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardContent className="flex min-h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-emerald-500" />
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060e0c] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Card className="rounded-2xl border border-white/[0.08] bg-[#0a1012]/90 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              My Books
            </CardTitle>

            <CardDescription className="text-white/40">
              Manage the books you have added to the library.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success */}
            {success && (
              <div className="mb-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* No books */}
            {books.length === 0 ? (
              <div className="flex min-h-[250px] flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.08] text-center">
                <h2 className="text-lg font-semibold text-white">
                  No books found
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  You have not added any books yet.
                </p>
              </div>
            ) : (
              /* Books Table */
              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <Table className="text-white">
                  <TableHeader>
                    <TableRow className="border-white/[0.08] hover:bg-transparent">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Book</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Title</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Author</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Category</TableHead>
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">Copies</TableHead>
                      <TableHead className="text-right text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-300/80">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {books.map((book) => (
                      <TableRow
                        key={book._id}
                        className="border-white/[0.06] hover:bg-white/[0.03]"
                      >
                        {/* Image */}
                        <TableCell>
                          <div className="relative h-16 w-12 overflow-hidden rounded-md">
                            <Image
                              src={book.image || FALLBACK_BOOK_IMAGE}
                              alt={book.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </TableCell>

                        {/* Title */}
                        <TableCell>
                          <span className="font-medium">
                            {book.title}
                          </span>
                        </TableCell>

                        {/* Author */}
                        <TableCell>
                          {book.author}
                        </TableCell>

                        {/* Category */}
                        <TableCell>
                          {book.category}
                        </TableCell>

                        {/* Copies */}
                        <TableCell>
                          {book.copies}
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleEdit(book)
                              }
                              className="cursor-pointer rounded-lg border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>

                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setDeletingBook(book)
                              }
                              className="cursor-pointer rounded-lg"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
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


      {/* ================= EDIT DIALOG ================= */}

<Dialog
  open={!!editingBook}
  onOpenChange={(open) => {
    if (!open) {
      setEditingBook(null);
      setEditImage(null);
    }
  }}
>
  <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0a1012] text-white shadow-2xl sm:max-w-2xl">
    <DialogHeader className="border-b border-white/[0.06] pb-5">
      <DialogTitle className="text-2xl font-bold tracking-tight text-white">
        Edit Book
      </DialogTitle>

      <DialogDescription className="text-white/40">
        Update the information of your book and save your changes.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-6 py-2">
      {/* Title + Author */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Title */}
        <div className="space-y-2">
          <Label
            htmlFor="edit-title"
            className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
          >
            Book Title
          </Label>

          <Input
            id="edit-title"
            value={editForm.title}
            onChange={(event) =>
              updateEditForm("title", event.target.value)
            }
            className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-emerald-500"
            placeholder="Enter book title"
          />
        </div>

        {/* Author */}
        <div className="space-y-2">
          <Label
            htmlFor="edit-author"
            className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
          >
            Author Name
          </Label>

          <Input
            id="edit-author"
            value={editForm.author}
            onChange={(event) =>
              updateEditForm("author", event.target.value)
            }
            className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-emerald-500"
            placeholder="Enter author name"
          />
        </div>
      </div>

      {/* Category + Copies */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90">
            Category
          </Label>

          <Select
            value={editForm.category}
            onValueChange={(value) =>
              updateEditForm("category", value ?? "")
            }
          >
            <SelectTrigger className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white focus:ring-emerald-500">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-white/[0.1] bg-[#0a1012] text-white">
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Copies */}
        <div className="space-y-2">
          <Label
            htmlFor="edit-copies"
            className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
          >
            Total Copies
          </Label>

          <Input
            id="edit-copies"
            type="number"
            min={0}
            value={editForm.copies}
            onChange={(event) =>
              updateEditForm(
                "copies",
                Number(event.target.value)
              )
            }
            className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label
          htmlFor="edit-description"
          className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
        >
          Short Description
        </Label>

        <Textarea
          id="edit-description"
          rows={5}
          value={editForm.description}
          onChange={(event) =>
            updateEditForm(
              "description",
              event.target.value
            )
          }
          className="resize-none rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-emerald-500"
          placeholder="Write a short description about the book..."
        />
      </div>

      {/* Book Image */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90">
          Book Image
        </Label>

        <div className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
          {/* Current Image */}
          {editingBook?.image && (
            <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-lg border border-white/[0.1]">
              <Image
                src={editingBook.image}
                alt={editingBook.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
          )}

          {/* Upload */}
          <label
            htmlFor="edit-image"
            className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-white/[0.12] px-4 py-3 text-sm text-white/50 transition hover:border-emerald-400/30 hover:bg-emerald-400/[0.03] hover:text-emerald-300"
          >
            <Upload className="h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium">
                {editImage
                  ? editImage.name
                  : "Choose a new image"}
              </p>

              <p className="mt-0.5 text-xs text-white/25">
                Leave empty to keep the current image
              </p>
            </div>

            <input
              id="edit-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) =>
                setEditImage(
                  event.target.files?.[0] ?? null
                )
              }
            />
          </label>
        </div>
      </div>
    </div>

    {/* Footer */}
    <DialogFooter className="border-t border-white/[0.06] pt-5">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setEditingBook(null);
          setEditImage(null);
        }}
        disabled={updating}
        className="rounded-xl border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
      >
        Cancel
      </Button>

      <Button
        type="button"
        onClick={handleUpdate}
        disabled={updating}
        className="rounded-xl bg-emerald-500 px-6 font-semibold text-[#04100c] hover:bg-emerald-400"
      >
        {updating ? "Updating..." : "Save Changes"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



      {/* ================= DELETE DIALOG ================= */}

      <AlertDialog
        open={!!deletingBook}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setDeletingBook(null);
          }
        }}
      >
        <AlertDialogContent className="border border-white/[0.08] bg-[#0a1012] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete this book?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-white/50">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deletingBook?.title}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              className="rounded-lg border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.08] hover:text-white"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}