import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Predefined background colors to cycle through
const bgColors = [
  "bg-blue-600",
  "bg-gray-200",
  "bg-purple-200",
  "bg-gray-900",
  "bg-green-600",
  "bg-pink-400",
];

interface Creator {
  id: number;
  communities?: { comunity_logo?: string }[];
  first_name?: string;
  last_name?: string;
  image: string;
  name: string;
  role: string;
  bgColor: string;
}

interface LearnSectionProps {
  creators: Creator[];
}

export default function LearnSection({ creators }: LearnSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
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
    setCurrentIndex((prev) => (prev + visibleItems < creators.length ? prev + 1 : prev));
  };

  const displayedCreators = creators.slice(currentIndex, currentIndex + visibleItems);

  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Learn from the best</h2>
          <div className="flex gap-1">
            <button
              className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex + visibleItems >= creators.length ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleNext}
              disabled={currentIndex + visibleItems >= creators.length}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedCreators.map((creator, index) => (
            <ExpertCard
              key={creator.id || `creator-${index}`} // Fallback ID
              id={String(creator.id || `creator-${index}`)} // Convert to string
              image={creator.communities?.[0]?.comunity_logo || "/placeholder.svg"} // Use community logo or placeholder
              name={`${creator.first_name ?? ""} ${creator.last_name ?? ""}`}
              role="Community Creator" // Fallback role
              bgColor={bgColors[index % bgColors.length]} // Cycle through colors
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertCard({
  id,
  image,
  name,
  role,
  bgColor,
}: {
  id: string;
  image: string;
  name: string;
  role: string;
  bgColor: string;
}) {
  return (
    <Link to={`/expert/${id}`} className="group overflow-hidden rounded-xl">
      <div className={`relative h-80 w-full overflow-hidden ${bgColor}`}>
        <img
          src={image}
          alt={name}
          width={300}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-sm text-gray-200">{role}</p>
        </div>
      </div>
    </Link>
  );
}