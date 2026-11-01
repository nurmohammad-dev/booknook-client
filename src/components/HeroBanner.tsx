import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[680px] overflow-hidden bg-slate-950">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/70" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[100px]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">

        <div className="max-w-3xl">

          {/* Small Label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur-md">
            <Sparkles size={14} />
            Your next great read starts here
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Stories worth
            <span className="block text-emerald-300">
              discovering.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Explore a growing collection of books, discover new authors,
            and borrow your next favorite story from our digital library.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/books"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              <BookOpen size={18} />

              Browse Books

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Join the Library
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">

            <div>
              <p className="text-2xl font-bold text-white">1,200+</p>
              <p className="mt-1 text-xs text-white/45">
                Books available
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-2xl font-bold text-white">350+</p>
              <p className="mt-1 text-xs text-white/45">
                Active readers
              </p>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div>
              <p className="text-2xl font-bold text-white">25+</p>
              <p className="mt-1 text-xs text-white/45">
                Categories
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}