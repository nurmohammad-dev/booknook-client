"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
      name: string;
      email: string;
      password: string;
      image: string;
    };

    console.log(user);

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
        redirect('/')
    }

    if (error) {
      console.error("Error registering user:", error);
      setErrorMessage(error.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">ImageURL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter your image URL"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;

                    setPassword(value);
                    setPasswordError(validatePassword(value));
                  }}
                  required
                />

                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </Field>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <Field>
                <Button type="submit">Register</Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Login
                  </Link>
                </FieldDescription>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Register with Google
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
