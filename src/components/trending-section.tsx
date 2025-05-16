
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Sample data for trending communities
const trendingCommunities = [
  {
    id: "golf-swing",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Golf Swing Simplified",
    author: "Tom Saguto, PGA",
    price: "From $19 / month",
    category: "sports",
  },
  {
    id: "the-collective",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Collective",
    author: "Allison Venditti",
    price: "$897 / year",
    category: "business",
  },
  {
    id: "the-lab",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Lab",
    author: "Jay Clouse",
    price: "$699 / year",
    category: "creativity",
  },
  {
    id: "troophr",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "TroopHR Membership",
    author: "Tracy Avin",
    price: "$700 / year",
    category: "career",
  },
  {
    id: "auggie-community",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Auggie Community",
    author: "Lily Walla",
    price: "FREE",
    category: "lifestyle",
  },
  {
    id: "web-designer-pro",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Web Designer Pro™ - Coaching",
    author: "Josh Hall",
    price: "From $199 / month",
    category: "design",
  },
]

export default function TrendingSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredCommunities, setFilteredCommunities] = useState(trendingCommunities)

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCommunities(trendingCommunities.filter((community) => community.category === selectedCategory))
    } else {
      setFilteredCommunities(trendingCommunities)
    }
  }, [selectedCategory])

  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Trending</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === null ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {Array.from(new Set(trendingCommunities.map((c) => c.category))).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                  selectedCategory === category
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
            <TrendingCard
              key={community.id}
              id={community.id}
              image={community.image}
              title={community.title}
              author={community.author}
              price={community.price}
              category={community.category}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrendingCard({
  id,
  image,
  title,
  author,
  price,
  category,
}: {
  id: string
  image: string
  title: string
  author: string
  price: string
  category: string
}) {
  return (
    <Link to={`/community-details/${id}`} className="group flex items-start gap-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg border bg-gray-100">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <div className="mb-1">
          <span className="text-xs font-medium text-gray-500 capitalize">{category}</span>
        </div>
        <h3 className="font-bold text-lg group-hover:text-sky-600">{title}</h3>
        <p className="text-gray-500 text-sm">{author}</p>
        <p className="text-sm mt-1">{price}</p>
      </div>
    </Link>
  )
}
