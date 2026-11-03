import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "BookNook | Login",
  description:
    "Log in to your BookNook account with email & password or Google.",
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
