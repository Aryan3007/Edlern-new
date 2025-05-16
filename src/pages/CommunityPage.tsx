
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "@/section/footer"

// Sample data for communities
const communities = [
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
    description:
      "Join the Productivity Lab and learn how to optimize your workflow, manage your time effectively, and achieve more with less stress.",
    features: [
      "Weekly live sessions with Ali",
      "Exclusive productivity templates",
      "Private community forum",
      "Monthly Q&A sessions",
      "Access to all courses and workshops",
    ],
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
    description:
      "Ness Labs is a community of curious minds. We help knowledge workers develop mindful productivity habits and make the most of their creative potential.",
    features: [
      "Weekly neuroscience-based insights",
      "Access to the Ness Labs community",
      "Mental models database",
      "Exclusive events and workshops",
      "Research-backed articles and resources",
    ],
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
    description:
      "Join the Auggie Community to connect with like-minded individuals focused on personal growth, wellness, and balanced living.",
    features: [
      "Free access to community forums",
      "Weekly lifestyle challenges",
      "Monthly virtual meetups",
      "Resource library for personal growth",
      "Exclusive discounts on premium content",
    ],
  },
  {
    id: "golf-swing",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "Golf Swing Simplified",
    author: "Tom Saguto, PGA",
    price: "From $19 / month",
    category: "sports",
    description:
      "Learn the fundamentals of a great golf swing from PGA professional Tom Saguto. This community is perfect for beginners and intermediate golfers looking to improve their game.",
    features: [
      "Weekly swing analysis videos",
      "Personalized feedback on your swing",
      "Drills and practice routines",
      "Access to the golf community forum",
      "Monthly live Q&A sessions",
    ],
  },
  {
    id: "the-collective",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    title: "The Collective",
    author: "Allison Venditti",
    price: "$897 / year",
    category: "business",
    description:
      "The Collective is a premium business community for entrepreneurs and professionals looking to scale their impact and income through strategic networking and collaboration.",
    features: [
      "Mastermind groups with like-minded professionals",
      "Monthly business strategy sessions",
      "Access to exclusive business resources",
      "Networking opportunities with industry leaders",
      "Quarterly business planning workshops",
    ],
  },
]

export default function CommunityPage() {
  const params = useParams()
  interface Community {
    id: string;
    logo?: string;
    logoText?: string;
    image: string;
    title: string;
    author: string;
    price: string;
    bgColor?: string;
    category: string;
    description: string;
    features: string[];
  }

  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (params.id) {
      const foundCommunity = communities.find((c) => c.id === params.id)
      setCommunity(foundCommunity || null)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">Loading community details...</div>
          </div>
        </main>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Community not found</h2>
              <Link to="/discover" className="text-sky-600 hover:underline flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Discover
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
     <Header />
     <div className="flex bg-white text-black min-h-screen flex-col">
     
      <main className="flex-1 max-w-7xl mx-auto  overflow-hidden mt-4 lg:mt-6 ">
        <div className={`relative w-full overflow-hidden rounded-2xl h-64 md:h-96 ${community.bgColor || "bg-gray-900"}`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="container max-w-7xl mx-auto relative h-full flex flex-col justify-end px-4 py-8 md:px-6">
            <Link to="/discover" className="text-white mb-4 hover:underline flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Discover
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <img
                src={community.logo || "/placeholder.svg"}
                alt={community.logoText || community.title}
                width={50}
                height={50}
                className="h-10 w-auto object-contain bg-white p-1 rounded-md"
              />
              <span className="text-white text-sm px-3 py-1 bg-sky-600 rounded-full">{community.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{community.title}</h1>
            <p className="text-white/80">By {community.author}</p>
          </div>
        </div>

        <div className="container px-4 py-12 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About this community</h2>
                <p className="text-gray-700">{community.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What you'll get</h2>
                <ul className="space-y-3">
                  {community.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Meet your host</h2>
                <div className="flex items-start gap-4">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt={community.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{community.author}</h3>
                    <p className="text-gray-700">
                      Expert in {community.category} with years of experience helping people achieve their goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24 bg-white rounded-xl border p-6 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{community.price}</h3>
                  <p className="text-gray-500 text-sm">Join today and transform your life</p>
                </div>
                <Button className="w-full bg-sky-600 hover:bg-sky-700 mb-4">
                  {community.price === "FREE" ? "Join Now" : "Subscribe Now"}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By joining, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
    <Footer/>
    </>
   
  )
}
