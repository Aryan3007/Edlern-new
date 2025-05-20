import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import FeaturedSection from "@/components/featured-section";
import TrendingSection from "@/components/trending-section";
import LearnSection from "@/components/learn-section";
import PopularSection from "@/components/popular-section";
import SubscribeSection from "@/components/subscribe-section";
import Header from "@/components/header";
import { Link } from "react-router-dom";
import Footer from "@/section/footer";
import { useEffect, useState } from "react";
import SearchModal from "@/components/SearchModal";

export default function DiscoverPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [communities, setCommunities] = useState({
    featured_communities: [],
    trending_communities: [],
    popular_communities: [],
    best_creators: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fetch API data
    const fetchCommunities = async () => {
      try {
        const response = await fetch(
          "https://edlern.toolsfactory.tech/api/v1/community/client/discover-communities/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const result = await response.json();
        if (result.success) {
          setCommunities(result.data);
        } else {
          throw new Error(result.message || "API request failed");
        }
      } catch (err) {
        setError(null);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className="bg-white">
        <Header />
        <div className="flex max-w-7xl mx-auto min-h-screen flex-col">
          <main className="flex-1">
            <section className="w-full py-12 md:py-12">
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex justify-center mb-8">
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2 max-w-5xl">
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <Skeleton className="h-6 w-1/2 mx-auto" />
                  </div>
                  <div className="w-full max-w-md relative mt-6">
                    <Skeleton className="h-12 w-full rounded-full" />
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Section Skeleton */}
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                  <Skeleton className="h-8 w-40" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="rounded-xl border bg-white shadow-sm">
                      <Skeleton className="h-80 w-full rounded-t-xl" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Trending Section Skeleton */}
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                  <Skeleton className="h-8 w-40" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, index) => (
                      <Skeleton key={index} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Skeleton className="h-24 w-24 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Learn Section Skeleton */}
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                  <Skeleton className="h-8 w-40" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="rounded-xl">
                      <Skeleton className="h-80 w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Popular Section Skeleton */}
            <section className="w-full py-12">
              <div className="container px-4 md:px-6">
                <Skeleton className="h-8 w-40 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="space-y-4">
                      <Skeleton className="h-60 w-full rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <Header />
      <div className="flex max-w-7xl mx-auto min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
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

          <FeaturedSection communities={communities.featured_communities} />
          <TrendingSection communities={communities.trending_communities} />
          <LearnSection creators={communities.best_creators} />
          <PopularSection communities={communities.popular_communities} />
          <SubscribeSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}