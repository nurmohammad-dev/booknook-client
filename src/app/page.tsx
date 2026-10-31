import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";

export default function HomePage() {
  return (
    <main className="bg-slate-950">
      <div className="relative">
        <Navbar />
        <HeroBanner />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      </section>
    </main>
  );
}