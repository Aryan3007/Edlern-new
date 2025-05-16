import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import FeaturedSection from "@/components/featured-section"
import TrendingSection from "@/components/trending-section"
import LearnSection from "@/components/learn-section"
import PopularSection from "@/components/popular-section"
import SubscribeSection from "@/components/subscribe-section"
import Header from "@/components/header"
import { Link } from "react-router-dom"
import Footer from "@/section/footer"
import { useEffect, useState } from "react"
import SearchModal from "@/components/SearchModal"

export default function DiscoverPage() {
  const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <div className="bg-white">
      <Header />
      <div className="flex max-w-7xl mx-auto min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-12">
            <div className="max-7xl mx-auto px-4 md:px-6">
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1">
                  <span className="text-xs font-medium text-sky-600 mr-2">New</span>
                  <Link to="#" className="text-xs font-medium text-gray-700 hover:underline">
                    Read the announcement
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2 max-w-5xl">
                  <h1 className="text-3xl font-bold tracking-tighter text-black sm:text-5xl md:text-6xl">
                    Discover the best <span className="text-sky-600"> digital experiences</span> curated just for you
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Transform yourself with leading communities, courses, memberships, and more
                  </p>
                </div>
                <div aria-label="Search" onClick={() => setIsOpen(true)} className="w-full max-w-md relative mt-6">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10 py-6 rounded-full border-gray-200 bg-white"
                  />
                </div>
                <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
              </div>
            </div>
          </section>

          <FeaturedSection />
          <TrendingSection />
          <LearnSection />
          <PopularSection />
          <SubscribeSection />
        </main>
      </div>
      <Footer />
    </div>

  )
}
