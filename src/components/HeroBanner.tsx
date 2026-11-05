"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85",
    title: "Your neighbourhood library, online",
    description:
      "Find a book that sounds interesting, and borrow it for a week.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2200&q=85",
    title: "Discover stories worth staying up for",
    description:
      "Browse curated shelves of fiction, science and history — new titles are added by members every week.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2200&q=85",
    title: "Borrow today, return in seven days",
    description:
      "Pick any available copy with a single click and return it when you're finished. No queues, no due-date stress.",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".home-hero-pagination",
          clickable: true,
        }}
        aria-label="BookNook highlights"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[190px] sm:h-[210px] lg:h-[230px]">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-slate-950/65" />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/20" />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/70 to-transparent" />

              {/* Content */}
              <div className="relative mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl">
                  {/* Eyebrow */}
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-emerald-300 sm:text-[10px]">
                    BookNook
                  </span>

                  {/* Title */}
                  <h1 className="mt-2 max-w-lg text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
                    {slide.description}
                  </p>

                  {/* Browse Books */}
                  <Link
                    href="/books"
                    className="mt-3 inline-flex items-center justify-center rounded-md border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500 hover:text-white sm:mt-4 sm:px-5 sm:text-sm"
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="home-hero-pagination absolute bottom-3 left-1/2 z-10 -translate-x-1/2" />

      {/* Pagination Styling */}
      <style jsx global>{`
        .home-hero-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .home-hero-pagination .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 10px;
          background: #34d399;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
