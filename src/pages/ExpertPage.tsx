
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Twitter, Instagram, Linkedin, Globe } from "lucide-react"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Footer from "@/section/footer"

// Sample data for experts
const experts = [
  {
    id: "brendon-burchard",
    image: "/placeholder.svg?height=400&width=300",
    name: "Brendon Burchard",
    role: "High performance coach",
    bgColor: "bg-blue-600",
    bio: "Brendon Burchard is the world's leading high performance coach, a 3-time New York Times bestselling author, and one of the most-watched, quoted, and followed personal development trainers in history.",
    expertise: ["High Performance", "Motivation", "Leadership", "Personal Development"],
    communities: [
      {
        id: "high-performance-academy",
        title: "High Performance Academy",
        price: "$997 / year",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "experts-academy",
        title: "Experts Academy",
        price: "$1,997 / year",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "3-time New York Times bestselling author",
      "Founder of the High Performance Institute",
      "One of the Top 100 Most Followed Public Figures on Facebook",
      "Named one of the most influential leaders in personal growth by Oprah Winfrey",
    ],
  },
  {
    id: "jay-shetty",
    image: "/placeholder.svg?height=400&width=300",
    name: "Jay Shetty",
    role: "Life coach",
    bgColor: "bg-gray-200",
    bio: "Jay Shetty is a British-American author, life coach, and former monk. He hosts the podcast 'On Purpose', which is one of the most popular health podcasts in the world. Prior to creating his own content, Shetty produced videos for the Huffington Post.",
    expertise: ["Mindfulness", "Purpose", "Wellness", "Relationships"],
    communities: [
      {
        id: "genius-coaching",
        title: "Genius Coaching & Mentorship",
        price: "$499 / month",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "New York Times bestselling author of 'Think Like a Monk'",
      "Forbes 30 Under 30",
      "Host of the 'On Purpose' podcast with over 300 million downloads",
      "Over 50 million followers across social platforms",
    ],
  },
  {
    id: "dana-malstaff",
    image: "/placeholder.svg?height=400&width=300",
    name: "Dana Malstaff",
    role: "Business woman",
    bgColor: "bg-purple-200",
    bio: "Dana Malstaff is the founder and CEO of Boss Mom, a company that provides resources and community for entrepreneur mothers. She is a mother, author, business strategist, podcaster, and content creator.",
    expertise: ["Business Strategy", "Content Marketing", "Community Building", "Work-Life Balance"],
    communities: [
      {
        id: "boss-mom",
        title: "Boss Mom+",
        price: "$47 / month",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "Author of 'Boss Mom: The Ultimate Guide to Raising a Business & Nurturing Your Family Like a Pro'",
      "Host of the Boss Mom podcast",
      "Built a community of over 100,000 entrepreneur mothers",
      "Featured in Forbes, Huffington Post, and Entrepreneur",
    ],
  },
  {
    id: "pat-flynn",
    image: "/placeholder.svg?height=400&width=300",
    name: "Pat Flynn",
    role: "Entrepreneur",
    bgColor: "bg-gray-900",
    bio: "Pat Flynn is an entrepreneur, podcast host, and author known for his website Smart Passive Income. He is known for his transparency in business and his focus on serving his audience first.",
    expertise: ["Passive Income", "Podcasting", "Online Business", "Digital Marketing"],
    communities: [
      {
        id: "spi-pro",
        title: "SPI Pro",
        price: "$99 / month",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "power-up-podcasting",
        title: "Power-Up Podcasting",
        price: "$799 one-time",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "Wall Street Journal bestselling author",
      "Host of the Smart Passive Income podcast with over 65 million downloads",
      "Built multiple 7-figure businesses",
      "Featured in Forbes, The New York Times, and Entrepreneur",
    ],
  },
  {
    id: "james-clear",
    image: "/placeholder.svg?height=400&width=300",
    name: "James Clear",
    role: "Author",
    bgColor: "bg-green-600",
    bio: "James Clear is an author, entrepreneur, and photographer known for his focus on habits, decision-making, and continuous improvement. He is the author of the #1 New York Times bestseller 'Atomic Habits'.",
    expertise: ["Habit Formation", "Productivity", "Self-Improvement", "Decision Making"],
    communities: [
      {
        id: "atomic-habits",
        title: "Atomic Habits Academy",
        price: "$499 one-time",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "#1 New York Times bestselling author of 'Atomic Habits'",
      "Over 5 million copies sold worldwide",
      "Translated into over 50 languages",
      "Over 1 million subscribers to his 3-2-1 newsletter",
    ],
  },
  {
    id: "marie-forleo",
    image: "/placeholder.svg?height=400&width=300",
    name: "Marie Forleo",
    role: "Business coach",
    bgColor: "bg-pink-400",
    bio: "Marie Forleo is an entrepreneur, writer, and philanthropist. Named by Oprah as a thought leader for the next generation, she's the star of the award-winning show MarieTV and host of The Marie Forleo Podcast.",
    expertise: ["Business Strategy", "Marketing", "Mindset", "Productivity"],
    communities: [
      {
        id: "b-school",
        title: "B-School",
        price: "$2,499 one-time",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "the-copy-cure",
        title: "The Copy Cure",
        price: "$997 one-time",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    socialMedia: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://website.com",
    },
    achievements: [
      "Author of the #1 New York Times bestseller 'Everything is Figureoutable'",
      "Creator of B-School, which has helped over 60,000 entrepreneurs",
      "Named by Oprah as a thought leader for the next generation",
      "Host of the award-winning MarieTV with over 54 million views",
    ],
  },
]

export default function ExpertPage() {
  const params = useParams()
  interface Expert {
    id: string;
    image: string;
    name: string;
    role: string;
    bgColor: string;
    bio: string;
    expertise: string[];
    communities: {
      id: string;
      title: string;
      price: string;
      image: string;
    }[];
    socialMedia: {
      twitter?: string;
      instagram?: string;
      linkedin?: string;
      website?: string;
    };
    achievements: string[];
  }

  const [expert, setExpert] = useState<Expert | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  useEffect(() => {
    if (params.id) {
      const foundExpert = experts.find((e) => e.id === params.id)
      setExpert(foundExpert || null)
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">Loading expert details...</div>
          </div>
        </main>
      </div>
    )
  }
  if (!expert) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Expert not found</h2>
              <Link to="/" className="text-sky-600 hover:underline flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex bg-white text-black min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden mt-4 lg:mt-6">
        <div className={`relative w-full overflow-hidden h-64 md:h-96 rounded-2xl max-w-7xl mx-auto bg-gradient-to-br from-sky-500 to-sky-700`}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="container  max-w-7xl mx-auto overflow-hidden relative h-full flex flex-col justify-end px-4 py-8 md:px-6">
            <Link to="/" className="text-white mb-4 hover:underline flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{expert.name}</h1>
            <p className="text-white/80">{expert.role}</p>
          </div>
        </div>

        <div className=" max-w-7xl mx-auto overflow-hidden px-4 py-12 md:px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-gray-700">{expert.bio}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise?.map((area: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                <ul className="space-y-3">
                  {expert.achievements?.map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Communities & Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expert.communities?.map((community: { id: string; title: string; price: string; image: string }) => (
                    <Link
                      key={community.id}
                      to={`/community/${community.id}`}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={community.image || "/placeholder.svg"}
                        alt={community.title}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{community.title}</h3>
                        <p className="text-sm text-gray-500">{community.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <div className="flex justify-center mb-4">
                    <img
                      src={expert.image || "/placeholder.svg"}
                      alt={expert.name}
                      width={150}
                      height={150}
                      className="rounded-full bg-sky-900 "
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{expert.name}</h3>
                  <p className="text-gray-500 text-center mb-4">{expert.role}</p>
                  <div className="flex justify-center gap-3 mb-6">
                    {expert.socialMedia?.twitter && (
                      <Link
                        to={expert.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                    {expert.socialMedia?.instagram && (
                      <Link
                        to={expert.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </Link>
                    )}
                    {expert.socialMedia?.linkedin && (
                      <Link
                        to={expert.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {expert.socialMedia?.website && (
                      <Link
                        to={expert.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Globe className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                  <Button className="w-full bg-sky-600 text-white hover:bg-sky-700">Follow</Button>
                </div>

                {expert.communities && expert.communities.length > 0 && (
                  <div className="bg-white rounded-xl border p-6 shadow-sm">
                    <h3 className="font-bold mb-4">Featured Community</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={expert.communities[0].image || "/placeholder.svg"}
                        alt={expert.communities[0].title}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{expert.communities[0].title}</h4>
                        <p className="text-sm text-gray-500">{expert.communities[0].price}</p>
                      </div>
                    </div>
                    <Link to={`/community/${expert.communities[0].id}`}>
                      <Button className="w-full bg-sky-600 text-white hover:bg-sky-700">View Community</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
