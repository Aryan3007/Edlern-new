
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"

// Sample data for featured communities
const featuredCommunities = [
  {
    id: "productivity-lab",
    logo: "/placeholder.svg?height=50&width=50",
    logoText: "Productivity Lab",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     title: "Productivity Lab",
    author: "Ali Abdaal",
    price: "$997 / year",
    bgColor: "bg-gray-900",
    category: "productivity",
  },
  {
    id: "ness-labs",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "NESS LABS",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Ness Labs Community",
    author: "Anne-Laure Le Cunff",
    price: "$49 / year",
    bgColor: "bg-gray-900",
    category: "productivity",
  },
  {
    id: "auggie-community",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "auggie",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Auggie Community",
    author: "Lily Walla",
    price: "FREE",
    bgColor: "bg-green-900",
    category: "lifestyle",
  },
  {
    id: "second-brain",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Second Brain",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Second Brain Membership",
    author: "Tiago Forte",
    price: "$225 / quarter",
    bgColor: "bg-blue-900",
    category: "productivity",
  },
  {
    id: "freedom-club",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Freedom",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "The Freedom Club",
    author: "Austin Lovell",
    price: "FREE",
    bgColor: "bg-red-900",
    category: "entrepreneurship",
  },
  {
    id: "troophr",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "TroopHR",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "TroopHR Membership",
    author: "Tracy Avin",
    price: "$700 / year",
    bgColor: "bg-purple-900",
    category: "business",
  },
]

export default function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleItems < featuredCommunities.length ? prev + 1 : prev))
  }

  const displayedCommunities = featuredCommunities.slice(currentIndex, currentIndex + visibleItems)

  return (
    <section className="w-full text-black py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Show ({currentIndex + 1}-{Math.min(currentIndex + visibleItems, featuredCommunities.length)} of{" "}
              {featuredCommunities.length})
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
                className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex + visibleItems >= featuredCommunities.length ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleNext}
                disabled={currentIndex + visibleItems >= featuredCommunities.length}
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
              logo={community.logo}
              logoText={community.logoText}
              image={community.image}
              title={community.title}
              author={community.author}
              price={community.price}
              bgColor={community.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
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
}: {
  id: string
  logo: string
  logoText: string
  image: string
  title: string
  author: string
  price: string
  bgColor: string
}) {
  return (
    <Link
      to={`/community-details/${id}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className={`relative h-80 w-full overflow-hidden ${bgColor}`}>
        <div className="absolute top-4 left-4 z-10">
          <img
            src={logo || "/placeholder.svg"}
            alt={logoText}
            width={100}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </div>
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{author}</p>
        <p className="text-sm mt-1">{price}</p>
      </div>
    </Link>
  )
}
