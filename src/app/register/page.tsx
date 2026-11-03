import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "BookNook | Register",
  description:
    "Create a BookNook account to add books and borrow from the library.",
};

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
