import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, FileText, Video, HelpCircle, MessageSquare, LifeBuoy } from "lucide-react"
import Footer from "@/section/footer"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import { useEffect } from "react"

export default function HelpCenterPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="flex  bg-white text-black min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Center</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Find answers, tutorials, and resources to help you get the most out of Discover+.
                </p>
              </div>
              <div className="w-full max-w-md relative mt-6">
                <Input
                  type="search"
                  placeholder="Search for help..."
                  className="w-full py-6 pl-4 pr-10 rounded-full border-gray-200 bg-white"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">Browse by Category</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CategoryCard
                title="Getting Started"
                description="New to Discover+? Learn the basics and set up your account."
                icon={<BookOpen className="h-6 w-6 text-sky-600" />}
                articles={12}
              />
              <CategoryCard
                title="Account & Billing"
                description="Manage your account settings, subscriptions, and payments."
                icon={<FileText className="h-6 w-6 text-sky-600" />}
                articles={18}
              />
              <CategoryCard
                title="Community Features"
                description="Learn how to use and customize your community features."
                icon={<MessageSquare className="h-6 w-6 text-sky-600" />}
                articles={24}
              />
              <CategoryCard
                title="Creator Tools"
                description="Resources for community creators and administrators."
                icon={<Video className="h-6 w-6 text-sky-600" />}
                articles={15}
              />
              <CategoryCard
                title="Troubleshooting"
                description="Solutions for common issues and technical problems."
                icon={<HelpCircle className="h-6 w-6 text-sky-600" />}
                articles={20}
              />
              <CategoryCard
                title="Safety & Privacy"
                description="Learn about our safety features and privacy controls."
                icon={<LifeBuoy className="h-6 w-6 text-sky-600" />}
                articles={10}
              />
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Popular Articles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <ArticleCard title="How to Create Your First Community" category="Getting Started" views="5.2K" />
              <ArticleCard
                title="Setting Up Payment Methods for Your Community"
                category="Account & Billing"
                views="4.8K"
              />
              <ArticleCard title="Customizing Your Community Profile" category="Community Features" views="4.3K" />
              <ArticleCard title="Managing Member Permissions and Roles" category="Creator Tools" views="3.9K" />
              <ArticleCard title="Troubleshooting Login Issues" category="Troubleshooting" views="3.7K" />
              <ArticleCard title="Understanding Community Analytics" category="Creator Tools" views="3.5K" />
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Video Tutorials</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <VideoCard
                title="Getting Started with Discover+"
                duration="5:32"
                thumbnail="/placeholder.svg?height=400&width=600"
              />
              <VideoCard
                title="Creating Engaging Community Content"
                duration="8:17"
                thumbnail="/placeholder.svg?height=400&width=600"
              />
              <VideoCard
                title="Advanced Community Management"
                duration="12:45"
                thumbnail="/placeholder.svg?height=400&width=600"
              />
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Still need help?</h2>
              <p className="text-gray-500 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-sky-600 hover:bg-sky-700">Contact Support</Button>
                <Button variant="outline">Submit a Ticket</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Support */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join our support community</h2>
                <p className="text-gray-500 md:text-lg">
                  Connect with other Discover+ users, share tips, and get help from our community experts.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-sky-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="font-medium">Get answers from the community</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-sky-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="font-medium">Share your knowledge and experiences</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-sky-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="font-medium">Connect with community experts</p>
                  </div>
                </div>
                <Button className="bg-sky-600 hover:bg-sky-700">Join the Community</Button>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Support community"
                  
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

function CategoryCard({
  title,
  description,
  icon,
  articles,
}: {
  title: string
  description: string
  icon: React.ReactNode
  articles: number
}) {
  return (
    <Link to="#" className="flex flex-col space-y-3 rounded-xl border bg-white p-6 hover:border-sky-600">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <span className="text-xs bg-gray-100 px-2.5 py-0.5 rounded-full">{articles} articles</span>
      </div>
    </Link>
  )
}

function ArticleCard({ title, category, views }: { title: string; category: string; views: string }) {
  return (
    <Link to="#" className="flex items-center gap-4 rounded-xl border bg-white p-4 hover:border-sky-600">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
        <FileText className="h-5 w-5 text-sky-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">{category}</span>
          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{views} views</span>
        </div>
      </div>
    </Link>
  )
}

function VideoCard({ title, duration, thumbnail }: { title: string; duration: string; thumbnail: string }) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-sky-600"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium group-hover:text-sky-600">{title}</h3>
        <p className="text-sm text-gray-500">Learn how to use this feature with our step-by-step tutorial</p>
      </div>
    </div>
  )
}
