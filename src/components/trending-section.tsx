import { useState, useEffect } from "react";

interface Community {
  _id: string;
  cover_image?: string;
  title: string;
  creator: {
    first_name: string;
    last_name: string;
  };
  is_paid: boolean;
  category_name?: string;
  price: string;
}

interface TrendingSectionProps {
  communities: Community[];
}

export default function TrendingSection({ communities }: TrendingSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  // Since API category is null, we'll use a fallback or skip category filtering
  useEffect(() => {
    if (selectedCategory) {
      setFilteredCommunities(
        communities.filter((community) => community.category_name === selectedCategory)
      );
    } else {
      setFilteredCommunities(communities);
    }
  }, [selectedCategory, communities]);

  // Get unique categories (since API returns null, this will be empty or limited)
  const categories = Array.from(
    new Set(communities.map((c) => c.category_name).filter((c): c is string => c !== undefined))
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredCommunities(
        communities.filter((community) => community.category_name === category)
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
              className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedCategory === null ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${selectedCategory === category
                  ? "bg-sky-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community) => (
            <div key={community._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <CommunityCard community={community} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CommunityCard = ({ community }: { community: Community }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={community.cover_image || '/placeholder.jpg'}
          alt={community.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{community.title}</h3>
        <p className="text-gray-600 mb-2">
          {community.creator.first_name} {community.creator.last_name}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">
            {community.is_paid ? `$${community.price}` : 'Free'}
          </span>
          <span className="text-sm text-gray-500">{community.category_name || 'General'}</span>
        </div>
      </div>
    </div>
  );
};