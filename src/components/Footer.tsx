"use client"

import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="BookNook Home">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
                <BookOpen size={18} strokeWidth={2.5} />
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">BookNook</span>
            </a>
            <p className="text-xs leading-relaxed text-white/45 max-w-xs">
              A small neighbourhood library on the web. Share the books on your shelf and borrow the ones you have been meaning to read.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href="mailto:hello@booknook.app" className="inline-flex items-center gap-2.5 hover:text-emerald-300 transition-colors">
                  <Mail size={14} className="text-emerald-400 shrink-0" />
                  hello@booknook.app
                </a>
              </li>
              <li>
                <a href="tel:+8801700000000" className="inline-flex items-center gap-2.5 hover:text-emerald-300 transition-colors">
                  <Phone size={14} className="text-emerald-400 shrink-0" />
                  +880 1700 000 000
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2.5">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  12 Reading Lane, Dhaka
                </span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 mb-4">Follow us</h3>
            <div className="flex gap-3">
              {["X", "Facebook", "Instagram"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-400/10"
                >
                  {label === "X" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  )}
                  {label === "Facebook" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  )}
                  {label === "Instagram" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-[11px] text-white/30 tracking-wide">
          © 2026 BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}