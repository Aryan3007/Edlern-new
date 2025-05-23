import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

interface Community {
  id: number;
  name: string;
  banner_image: string | null; // Updated to match API
  community_logo: string | null;
  description: string;
  category: string | null;
  creator_info: {
    id: string;
    first_name: string;
    last_name: string;
  };
  community_type: string;
  is_free: boolean;
  monthly_pricing: number;
  yearly_pricing: number;
}

interface FeaturedSectionProps {
  communities: Community[];
}

export default function FeaturedSection({ communities }: FeaturedSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleItems < communities.length ? prev + 1 : prev));
  };

  const displayedCommunities = communities.slice(currentIndex, currentIndex + visibleItems);

  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Show ({currentIndex + 1}-{Math.min(currentIndex + visibleItems, communities.length)} of{" "}
              {communities.length})
            </span>
            <div className="flex gap-1">
              <button
                className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex + visibleItems >= communities.length ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleNext}
                disabled={currentIndex + visibleItems >= communities.length}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCommunities.map((community) => (
            <FeaturedCard
              key={community.id}
              id={community.id}
              logo={community.community_logo || "/placeholder.svg"}
              logoText={community.name}
              image={community.banner_image || "/placeholder.svg"} // Updated to banner_image
              title={community.name}
              author={`${community.creator_info.first_name} ${community.creator_info.last_name}`}
              price={community.is_free ? 0 : community.monthly_pricing}
              bgColor="bg-blue-600"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CommunityCardProps {
  id: number;
  logo: string;
  logoText: string;
  image: string;
  title: string;
  author: string;
  price: number;
  bgColor: string;
}

function FeaturedCard({
  id,
  logo,
  logoText,
  image,
  title,
  author,
  price,
  bgColor,
}: CommunityCardProps) {
  return (
    <Link
      to={`/community-details/${id}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className={`relative h-80 w-full overflow-hidden ${bgColor}`}>
        <div className="absolute top-4 left-4 z-10">
          <img
            src={logo}
            alt={logoText}
            width={100}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </div>
        <img
          src={image}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{author}</p>
        <p className="text-sm mt-1">{price === 0 ? "Free" : `$${price}/month`}</p>
      </div>
    </Link>
  );
}