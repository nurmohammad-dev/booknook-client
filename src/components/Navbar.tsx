"use client";

import Link from "next/link";
import { BookOpen, Menu, X, Sun, LogIn } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl sm:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
              <BookOpen size={21} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                BookNook
              </h1>
              <p className="hidden text-[10px] uppercase tracking-[0.2em] text-white/50 sm:block">
                Digital Library
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white/70 transition hover:text-emerald-300"
            >
              Home
            </Link>

            <Link
              href="/books"
              className="text-sm font-medium text-white/70 transition hover:text-emerald-300"
            >
              All Books
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-white/70 transition hover:text-emerald-300"
            >
              About
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Theme */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Sun size={16} />
            </button>

            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <LogIn size={16} />
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                Home
              </Link>

              <Link
                href="/books"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                All Books
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                About
              </Link>

              <div className="my-2 h-px bg-white/10" />

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}