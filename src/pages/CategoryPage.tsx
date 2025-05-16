
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "@/section/footer"

// Sample data for communities by category
const allCommunities = [
  {
    id: "productivity-lab",
    logo: "/placeholder.svg?height=50&width=50",
    logoText: "Productivity Lab",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Productivity Lab",
    author: "Ali Abdaal",
    price: "$997 / year",
    bgColor: "bg-gray-900",
    category: "productivity",
  },
  {
    id: "ness-labs",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "NESS LABS",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Ness Labs Community",
    author: "Anne-Laure Le Cunff",
    price: "$49 / year",
    bgColor: "bg-gray-900",
    category: "productivity",
  },
  {
    id: "second-brain",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Second Brain",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Second Brain Membership",
    author: "Tiago Forte",
    price: "$225 / quarter",
    bgColor: "bg-blue-900",
    category: "productivity",
  },
  {
    id: "auggie-community",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "auggie",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Auggie Community",
    author: "Lily Walla",
    price: "FREE",
    bgColor: "bg-green-900",
    category: "lifestyle",
  },
  {
    id: "running-channel",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Running Channel",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Running Channel Club",
    author: "Steuart B.",
    price: "From $6 / month",
    bgColor: "bg-yellow-700",
    category: "lifestyle",
  },
  {
    id: "freedom-club",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Freedom",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Freedom Club",
    author: "Austin Lovell",
    price: "FREE",
    bgColor: "bg-red-900",
    category: "entrepreneurship",
  },
  {
    id: "pilot-institute",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Pilot Institute",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Pilot Institute Premium Drone Community",
    author: "Greg R.",
    price: "$199 / year",
    bgColor: "bg-blue-800",
    category: "entrepreneurship",
  },
  {
    id: "foundr-plus",
    logo: "/placeholder.svg?height=50&width=100",
    logoText: "Foundr+",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Foundr+",
    author: "Nathan Chan",
    price: "$499 / year",
    bgColor: "bg-gray-800",
    category: "entrepreneurship",
  },
  {
    id: "the-collective",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "The Collective",
    author: "Allison Venditti",
    price: "$897 / year",
    bgColor: "bg-green-800",
    category: "business",
  },
  {
    id: "super-data-science",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",     title: "SuperDataScience Membership",
    author: "Kirill Eremenko",
    price: "$35 / month",
    bgColor: "bg-blue-600",
    category: "technology",
  },
]

const categoryNames: Record<string, string> = {
  entrepreneurship: "Entrepreneurship",
  productivity: "Productivity",
  lifestyle: "Lifestyle",
  business: "Business",
  technology: "Technology",
  creativity: "Creativity",
  sports: "Sports",
}

export default function CategoryPage() {
  const params = useParams()
  interface Community {
    id: string;
    logo?: string;
    logoText?: string;
    image: string;
    title: string;
    author: string;
    price: string;
    bgColor: string;
    category: string;
  }

  const [communities, setCommunities] = useState<Community[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (params.id) {
      const categoryId = params.id as string
      const filtered = allCommunities.filter((c) => c.category === categoryId)
      setCommunities(filtered)
      setCategoryName(categoryNames[categoryId] || categoryId)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">Loading communities...</div>
          </div>
        </main>
      </div>
    )
  }

  return (
  <>
        <Header />
          <div className="flex min-h-screen max-w-7xl mx-auto flex-col">

      <main className="flex-1">
        <div className="py-8">
          <div className="container px-4 md:px-6">
            <Link to="/discover" className="text-sky-600 mb-4 hover:underline flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Discover
            </Link>
            <h1 className="text-3xl font-bold">{categoryName} Communities</h1>
            <p className="text-gray-500 mt-2">
              Discover the best {categoryName.toLowerCase()} communities and experiences
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 md:px-6">
          {communities.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No communities found</h2>
              <p className="text-gray-500">
                We couldn't find any communities in this category. Check back later or explore other categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <Link
                  key={community.id}
                  to={`/community-details/${community.id}`}
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className={`relative h-60 w-full overflow-hidden ${community.bgColor || "bg-gray-900"}`}>
                    {community.logo && (
                      <div className="absolute top-4 left-4 z-10">
                        <img
                          src={community.logo || "/placeholder.svg"}
                          alt={community.logoText || community.title}
                          width={100}
                          height={50}
                          className="h-10 w-auto object-contain"
                        />
                      </div>
                    )}
                    <img
                      src={community.image || "/placeholder.svg"}
                      alt={community.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{community.title}</h3>
                    <p className="text-gray-500 text-sm">{community.author}</p>
                    <p className="text-sm mt-1">{community.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    
    </div>
    <Footer/>
    </>
  
  )
}
