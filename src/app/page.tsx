import HeroBanner from "@/components/HeroBanner";
import NewArrivals from "@/components/home/NewArrivals";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroBanner />
        <NewArrivals />
        <HowBorrowingWorks />
        <TopCategories />
      </main>
    </>
  )
}