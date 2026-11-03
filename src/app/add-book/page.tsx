"use client";

import { useState } from "react";
import { BookPlus, FileText, UserCircle, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import { authClient } from "@/lib/auth-client";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    copies: 1,
    description: "",
    image: null as File | null,
  });

  const [addedTitle, setAddedTitle] = useState<string | null>(null);

  // Update form data
  const update = (
    field: keyof typeof form,
    value: string | number | File | null
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      let imageUrl = "";

      // Upload image
      if (form.image) {
        const imageFormData = new FormData();

        imageFormData.append("image", form.image);

        const imageResponse = await fetch(
          "http://localhost:8000/upload-image",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imageData = await imageResponse.json();

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image");
        }

        imageUrl = imageData.imageUrl;

        console.log("Uploaded image URL:", imageUrl);
      }

      // Book data
      const bookData = {
        title: form.title,
        author: form.author,
        category: form.category,
        copies: form.copies,
        description: form.description,
        addedBy: user?.name || "",
        addedByEmail: user?.email || "",
        image: imageUrl,
      };

      // Add book
      const res = await fetch(
        "http://localhost:8000/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      const result = await res.json();

      console.log(result);

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      setAddedTitle(form.title);

      // Reset form
      setForm({
        title: "",
        author: "",
        category: "",
        copies: 1,
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060e0c] px-4 py-20 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/4 rounded-full bg-emerald-500/[0.06] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            <BookPlus size={14} />
            Add to shelf
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Add a Book
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/35">
            Put a book from your shelf into the library so others can borrow it.
          </p>
        </div>

        {/* Success message */}
        {addedTitle && (
          <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            <span className="font-medium">{addedTitle}</span> was added
            successfully.
          </div>
        )}

        {/* Form Card */}
        <Card className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a1012]/90 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-white/[0.05] pb-6">
              <CardTitle className="text-xl font-semibold tracking-tight text-white">
                Book details
              </CardTitle>

              <CardDescription className="text-sm text-white/35">
                Fill in the details below. Required fields are marked.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-6">
              {/* Title + Author */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <Label
                    htmlFor="title"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                  >
                    Book Title
                  </Label>

                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={(event) =>
                      update("title", event.target.value)
                    }
                    required
                    placeholder="The Hobbit"
                    className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <Label
                    htmlFor="author"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                  >
                    Author Name
                  </Label>

                  <Input
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={(event) =>
                      update("author", event.target.value)
                    }
                    required
                    placeholder="J.R.R. Tolkien"
                    className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25"
                  />
                </div>
              </div>

              {/* Category + Total Copies */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <Label
                    htmlFor="category"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                  >
                    Category
                  </Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      update("category", value)
                    }
                    required
                  >
                    <SelectTrigger
                      id="category"
                      className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white"
                    >
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>

                    <SelectContent className="rounded-xl border-white/[0.1] bg-[#0a1012] text-white">
                      {categories.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Label
                    htmlFor="copies"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                  >
                    Total Copies
                  </Label>

                  <Input
                    id="copies"
                    name="copies"
                    type="number"
                    min={1}
                    value={form.copies}
                    onChange={(event) =>
                      update("copies", Number(event.target.value))
                    }
                    required
                    className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] text-white"
                  />
                </div>
              </div>

              {/* Book Image */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="cover-file"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                >
                  Book Image
                </Label>

                <label
                  htmlFor="cover-file"
                  className="group flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-4 text-sm text-white/50"
                >
                  <FileText
                    size={16}
                    className="shrink-0 text-emerald-300/70"
                  />

                  <span>Choose File</span>

                  <span className="ml-auto text-xs text-white/20">
                    {form.image ? form.image.name : "No file chosen"}
                  </span>

                  <input
                    id="cover-file"
                    name="cover-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      update(
                        "image",
                        event.target.files?.[0] ?? null
                      )
                    }
                  />
                </label>

                <span className="text-[11px] text-white/25">
                  Image will be uploaded to imgbb later.
                </span>
              </div>

              {/* Short Description */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="description"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                >
                  Short Description
                </Label>

                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  required
                  placeholder="Write a short description about the book..."
                  className="resize-none rounded-xl border-white/[0.1] bg-white/[0.03] text-white placeholder:text-white/25"
                />
              </div>

              {/* User Name */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="addedBy"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                >
                  User Name
                </Label>

                <div className="relative">
                  <UserCircle
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300/50"
                  />

                  <Input
                    id="addedBy"
                    name="addedBy"
                    value={user?.name || ""}
                    readOnly
                    placeholder="User's name"
                    className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] pl-10 text-white placeholder:text-white/25"
                  />
                </div>
              </div>

              {/* User Email */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="addedByEmail"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-300/90"
                >
                  User Email
                </Label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300/50"
                  />

                  <Input
                    id="addedByEmail"
                    name="addedByEmail"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    placeholder="User's email"
                    className="h-11 rounded-xl border-white/[0.1] bg-white/[0.03] pl-10 text-white placeholder:text-white/25"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!user}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-[#04100c] transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BookPlus size={17} />
                Add Book
              </button>
            </CardContent>
          </form>
        </Card>
      </div>
    </section>
  );
}