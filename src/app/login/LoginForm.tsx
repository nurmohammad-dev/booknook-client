"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function validatePassword(value: string) {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }

    return "";
  }

  const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
    });

    if (data) {
      router.replace(redirectTo);
    }

    if (error) {
      console.error("Error logging in:", error);
      setErrorMessage(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    });
  };

  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="mb-8 flex flex-col items-center gap-2.5 text-center">
          <Link
            href="/"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 ring-1 ring-emerald-500/30 transition-colors hover:ring-emerald-500/60"
            aria-label="BookNook home"
          >
            <BookOpen size={20} className="text-emerald-400" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="text-sm text-white/45">
            Log in to continue to your BookNook library.
          </p>
        </div>

        {/* Card */}
        <Card className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-lg shadow-black/40">
          <CardContent className="px-6 py-8 sm:px-8">
            <form onSubmit={handleLoginSubmit}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 transition-colors focus-visible:border-emerald-400/60 focus-visible:ring-emerald-400/20"
                    required
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm font-medium text-slate-300"
                    >
                      Password
                    </FieldLabel>

                    <Link
                      href="#"
                      className="ml-auto text-sm text-white/45 underline-offset-4 transition-colors hover:text-emerald-400 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;

                      setPassword(value);
                      setPasswordError(validatePassword(value));
                    }}
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 transition-colors focus-visible:border-emerald-400/60 focus-visible:ring-emerald-400/20"
                    required
                  />

                  {passwordError && (
                    <p className="text-sm text-red-400">{passwordError}</p>
                  )}
                </Field>

                {errorMessage && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    {errorMessage}
                  </p>
                )}

                <Field className="gap-4">
                  <Button
                    type="submit"
                    className="h-11 w-full cursor-pointer rounded-xl bg-emerald-500 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/25 transition-colors hover:bg-emerald-400 focus-visible:ring-emerald-400/40"
                  >
                    Login
                  </Button>

                  <p className="text-center text-sm text-white/45">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-slate-900">
                  Or
                </FieldSeparator>

                <Field>
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    type="button"
                    className="h-11 w-full cursor-pointer rounded-xl border-white/10 bg-white/[0.03] text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:ring-emerald-400/40"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path
                        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.26 2C7.06 2 3 6.26 3 12c0 5.86 4.78 10 9.6 10 5 0 8.8-3.6 8.8-9 0-1.48-.05-1.9-.05-1.9z"
                        fill="#4285F4"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* Mobile-only footer link */}
        <p className="mt-6 text-center text-sm text-white/45 sm:hidden">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
