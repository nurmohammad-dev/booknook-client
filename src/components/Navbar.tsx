"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Left — Logo + Desktop Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 ring-1 ring-emerald-500/30">
              <BookOpen size={18} className="text-emerald-400" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              BookNook
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — Auth */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="ml-auto flex h-10 w-10 items-center justify-center text-slate-200 md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/5 bg-slate-950 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/5 py-3.5 text-sm font-medium ${
                  isActive(link.href) ? "text-emerald-400" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="py-3.5 text-sm font-medium text-slate-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="my-3 rounded-full bg-emerald-500 py-2.5 text-center text-sm font-semibold text-slate-950"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
