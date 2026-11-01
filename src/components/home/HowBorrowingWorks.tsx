import { BookOpen, RotateCcw, Search } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover your next read",
    description:
      "Explore our collection and find a book that matches your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow with ease",
    description:
      "Choose your favorite book and borrow it with just a few simple clicks.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Read and return",
    description:
      "Enjoy your book and return it when you're finished. It's that simple.",
    icon: RotateCcw,
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="border-t border-white/5 bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {/* Intro */}
        <div>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
            Simple process
          </span>

          <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
            Borrowing a book should feel effortless.
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
            From discovering a new story to returning it after you&apos;ve finished,
            BookNook keeps the entire borrowing experience simple.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-8 bottom-8 hidden w-px bg-emerald-400/20 sm:block" />

          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex gap-5 rounded-2xl p-4 transition-colors hover:bg-white/[0.03] sm:gap-6"
                >
                  {/* Number / Icon */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-slate-900 text-emerald-300 transition-colors group-hover:border-emerald-300/50 group-hover:bg-emerald-300 group-hover:text-slate-950">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="pt-0.5">
                    <div className="mb-1 text-xs font-medium tracking-widest text-emerald-300/70">
                      STEP {step.number}
                    </div>

                    <h3 className="text-lg font-medium text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/40">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}