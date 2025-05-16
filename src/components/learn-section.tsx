
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Sample data for experts
const experts = [
  {
    id: "brendon-burchard",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Brendon Burchard",
    role: "High performance coach",
    bgColor: "bg-blue-600",
  },
  {
    id: "jay-shetty",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    name: "Jay Shetty",
    role: "Life coach",
    bgColor: "bg-gray-200",
  },
  {
    id: "dana-malstaff",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    name: "Dana Malstaff",
    role: "Business woman",
    bgColor: "bg-purple-200",
  },
  {
    id: "pat-flynn",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    name: "Pat Flynn",
    role: "Entrepreneur",
    bgColor: "bg-gray-900",
  },
  {
    id: "james-clear",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    name: "James Clear",
    role: "Author",
    bgColor: "bg-green-600",
  },
  {
    id: "marie-forleo",
    image: "https://images.unsplash.com/photo-1744922679571-e6d7e9a8804c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",    name: "Marie Forleo",
    role: "Business coach",
    bgColor: "bg-pink-400",
  },
]

export default function LearnSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
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
    setCurrentIndex((prev) => (prev + visibleItems < experts.length ? prev + 1 : prev))
  }

  const displayedExperts = experts.slice(currentIndex, currentIndex + visibleItems)

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
              className={`rounded-full p-1 border border-gray-200 bg-white ${currentIndex + visibleItems >= experts.length ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleNext}
              disabled={currentIndex + visibleItems >= experts.length}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedExperts.map((expert) => (
            <ExpertCard
              key={expert.id}
              id={expert.id}
              image={expert.image}
              name={expert.name}
              role={expert.role}
              bgColor={expert.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExpertCard({
  id,
  image,
  name,
  role,
  bgColor,
}: {
  id: string
  image: string
  name: string
  role: string
  bgColor: string
}) {
  return (
    <Link to={`/expert/${id}`} className="group overflow-hidden rounded-xl">
      <div className={`relative h-80 w-full overflow-hidden ${bgColor}`}>
        <img
          src={image || "/placeholder.svg"}
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
  )
}
