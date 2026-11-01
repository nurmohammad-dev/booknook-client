import { Atom, BookOpen, Baby, Landmark } from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Novels, stories and imaginative worlds.",
    books: "240+ books",
    icon: BookOpen,
  },
  {
    name: "Science",
    description: "Discover how the world works.",
    books: "128+ books",
    icon: Atom,
  },
  {
    name: "History",
    description: "Stories and lessons from the past.",
    books: "96+ books",
    icon: Landmark,
  },
  {
    name: "Kids",
    description: "Fun and educational books for young readers.",
    books: "74+ books",
    icon: Baby,
  },
];

export default function TopCategories() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
            Browse by interest
          </span>
          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Find a shelf that feels like yours.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/40">
            Whether you seek fiction, science, or stories from the past — there is something worth turning the page for.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.name}
                href={`/books?category=${category.name.toLowerCase()}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.06]"
              >
                <div className="absolute top-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/3 rounded-full bg-emerald-400/[0.06] blur-[40px]" aria-hidden="true" />

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-emerald-300 shadow-sm shadow-black/20 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 group-hover:text-emerald-200">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="text-[11px] font-medium text-white/25">{category.books}</span>
                </div>

                <div className="relative z-10 mt-6 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {category.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-emerald-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}