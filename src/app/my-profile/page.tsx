"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MyProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const profile = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    const { data, error } = await authClient.updateUser({
      ...profile,
    });

    if (data) {
      setSuccessMessage("Profile updated successfully");
    }

    if (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(error.message || "Failed to update profile");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-400">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <Card className="border-white/10 bg-slate-900 text-white">
          <CardHeader className="px-6 pb-3 pt-5 text-center">
            <div className="mx-auto mb-2">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={user.image || ""}
                  alt={user.name}
                />
                <AvatarFallback className="bg-emerald-500 text-xl text-slate-950">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <CardTitle className="text-2xl">{user.name}</CardTitle>

            <CardDescription className="text-sm text-slate-400">
              {user.email}
            </CardDescription>

            <p className="text-xs text-slate-500">
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm text-slate-200">
                  Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name || ""}
                  placeholder="Enter your name"
                  className="h-9 border-white/10 bg-slate-950 text-sm text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="image" className="text-sm text-slate-200">
                  Image URL
                </Label>

                <Input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image || ""}
                  placeholder="Enter your photo URL"
                  className="h-9 border-white/10 bg-slate-950 text-sm text-white"
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              {successMessage && (
                <p className="text-sm text-emerald-400">
                  {successMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="h-9 w-full cursor-pointer bg-emerald-500 text-sm text-slate-950 hover:bg-emerald-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
