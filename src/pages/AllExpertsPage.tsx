
import Header from "@/components/header"
import Footer from "@/section/footer"
import { useEffect } from "react";

import { Link } from "react-router-dom"

// Sample data for all experts
const allExperts = [
  {
    id: "brendon-burchard",
    image: "/placeholder.svg?height=400&width=300",
    name: "Brendon Burchard",
    role: "High performance coach",
    bgColor: "bg-blue-600",
    categories: ["Personal Development", "Business"],
  },
  {
    id: "jay-shetty",
    image: "/placeholder.svg?height=400&width=300",
    name: "Jay Shetty",
    role: "Life coach",
    bgColor: "bg-gray-200",
    categories: ["Mindfulness", "Wellness"],
  },
  {
    id: "dana-malstaff",
    image: "/placeholder.svg?height=400&width=300",
    name: "Dana Malstaff",
    role: "Business woman",
    bgColor: "bg-purple-200",
    categories: ["Business", "Parenting"],
  },
  {
    id: "pat-flynn",
    image: "/placeholder.svg?height=400&width=300",
    name: "Pat Flynn",
    role: "Entrepreneur",
    bgColor: "bg-gray-900",
    categories: ["Business", "Marketing"],
  },
  {
    id: "james-clear",
    image: "/placeholder.svg?height=400&width=300",
    name: "James Clear",
    role: "Author",
    bgColor: "bg-green-600",
    categories: ["Productivity", "Personal Development"],
  },
  {
    id: "marie-forleo",
    image: "/placeholder.svg?height=400&width=300",
    name: "Marie Forleo",
    role: "Business coach",
    bgColor: "bg-pink-400",
    categories: ["Business", "Marketing"],
  },
  {
    id: "tim-ferriss",
    image: "/placeholder.svg?height=400&width=300",
    name: "Tim Ferriss",
    role: "Author & Investor",
    bgColor: "bg-blue-800",
    categories: ["Productivity", "Business", "Health"],
  },
  {
    id: "mel-robbins",
    image: "/placeholder.svg?height=400&width=300",
    name: "Mel Robbins",
    role: "Motivational Speaker",
    bgColor: "bg-red-600",
    categories: ["Motivation", "Personal Development"],
  },
]

export default function AllExpertsPage() {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  
  return (
    <div className="flex bg-white text-black min-h-screen flex-col">
      <Header />
      <main className="flex-1">
      <main className="flex-1">
          <section className="w-full py-12 md:py-12">
            <div className="max-7xl mx-auto px-4 md:px-6">
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
                    Meet the <span className="text-sky-600">world's top experts</span> in their fields
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Explore insights, guidance, and expertise from renowned professionals across various domains
                  </p>
                </div>
               
              </div>
            </div>
          </section>

        </main>

        <div className=" max-w-7xl mx-auto overflow-hidden px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allExperts.map((expert) => (
              <Link key={expert.id} to={`/expert/${expert.id}`} className="group overflow-hidden rounded-xl">
                <div className={`relative h-80 w-full overflow-hidden ${expert.bgColor || "bg-gray-900"}`}>
                  <img
                    src={expert.image || "/placeholder.svg"}
                    alt={expert.name}
                    width={300}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-2xl font-bold">{expert.name}</h3>
                    <p className="text-sm text-gray-200">{expert.role}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {expert.categories.slice(0, 2).map((category, index) => (
                        <span key={index} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
