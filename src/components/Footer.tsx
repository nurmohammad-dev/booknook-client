import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { X, Facebook, Instagram } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 ring-1 ring-emerald-500/30">
                <BookOpen size={17} className="text-emerald-400" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                BookNook
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-400">
              A small neighbourhood library on the web. Share the books on your
              shelf and borrow the ones you have been meaning to read.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="mailto:hello@booknook.app"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-emerald-400"
                >
                  <Mail size={13} className="shrink-0" />
                  hello@booknook.app
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801700000000"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-emerald-400"
                >
                  <Phone size={13} className="shrink-0" />
                  +880 1700 000 000
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin size={13} className="shrink-0" />
                12 Reading Lane, Dhaka
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="text-sm font-semibold text-white">Follow us</h3>
            <div className="mt-4 flex gap-3">
              {[
                { label: "X (Twitter)", icon: X },
                { label: "Facebook", icon: Facebook },
                { label: "Instagram", icon: Instagram },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-emerald-400"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/5 pt-5 text-center text-[11px] text-slate-500">
          © 2026 BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
