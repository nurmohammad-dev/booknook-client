"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const links = [
  { href: "/", label: "Home", private: false },
  { href: "/books", label: "All Books", private: false },
  { href: "/add-book", label: "Add Book", private: true },
  { href: "/my-books", label: "My Books", private: true },
  { href: "/my-borrows", label: "My Borrows", private: true },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Assignment: private routes (Add Book, My Books, My Borrows) are only
  // shown when the user is logged in
  const visibleLinks = links.filter((link) => !link.private || user);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-10 px-4 sm:px-6 lg:px-8">
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
            {visibleLinks.map((link) => (
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
        <div className="ml-auto hidden items-center gap-6 md:flex cursor-pointer">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent className="w-52 border border-slate-700 bg-slate-950 p-0 text-white">
                <PopoverHeader className="border-b border-slate-800 p-3">
                  <PopoverTitle className="text-sm font-medium text-white">
                    {user?.name}
                  </PopoverTitle>

                  <PopoverDescription className="mt-1 text-xs text-slate-400">
                    {user?.email}
                  </PopoverDescription>
                </PopoverHeader>

                <div>
                  <Link
                    href="/my-profile"
                    className="block rounded-md px-2 py-2 text-sm text-slate-300 transition-colors hover:bg-orange-400 hover:text-slate-950"
                  >
                    My Profile
                  </Link>
                </div>

                <div className="border-t border-slate-800" />

                <div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start rounded-md px-2 py-2 text-sm font-normal text-slate-300 hover:bg-orange-400 hover:text-slate-950 cursor-pointer"
                  >
                    Log Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
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
            </>
          )}
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
          <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
            {visibleLinks.map((link) => (
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
