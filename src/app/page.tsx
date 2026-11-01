import HeroBanner from "@/components/HeroBanner";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroBanner />
        <HowBorrowingWorks />
        <TopCategories />
      </main>
    </>
  )
}