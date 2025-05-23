import { useState, useEffect } from "react";

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

interface TrendingSectionProps {
  communities: Community[];
}

export default function TrendingSection({ communities }: TrendingSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCommunities(
        communities.filter((community) => community.category === selectedCategory)
      );
    } else {
      setFilteredCommunities(communities);
    }
  }, [selectedCategory, communities]);

  // Handle null categories by providing a fallback
  const categories = Array.from(
    new Set(communities.map((c) => c.category || "Uncategorized").filter((c): c is string => c !== null))
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category && category !== "Uncategorized") {
      setFilteredCommunities(
        communities.filter((community) => community.category === category)
      );
    } else {
      setFilteredCommunities(communities);
    }
  };

  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Trending</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === null ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${selectedCategory === category ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={community.banner_image || "/placeholder.jpg"} // Updated to banner_image
          alt={community.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{community.name}</h3>
        <p className="text-gray-600 mb-2">
          {community.creator_info.first_name} {community.creator_info.last_name}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">
            {community.is_free ? "Free" : `$${community.monthly_pricing}/month`}
          </span>
          <span className="text-sm text-gray-500">{community.category || "Uncategorized"}</span>
        </div>
      </div>
    </div>
  );
}