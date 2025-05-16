
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  Users,
  BarChart2,
  Calendar,
  MessageSquare,
  CreditCard,
  Zap,
  Mail,
  Bot,
  X,
  Menu,
  ChevronRight,
  BookOpen,
  FileText,
  Download,
  TrendingUp,
  LogOut,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { persistor, RootState } from "@/store/store"
import { logout } from "@/store/authSlice"

interface Community {
  community_id?: number
  id?: number
  total_members?: number
  community_name?: string
  name?: string
  community_logo?: string
  image?: string
  role?: string
  members?: string
  current?: boolean
}

interface CommunityData {
  community_id: number
  community_name: string
  community_logo: string
}

const navItems = [
  { name: "Features", href: "", hasDropdown: false },
  { name: "Digital Resources", href: "", hasDropdown: true },
  { name: "Discover", href: "/discover", hasDropdown: false },
  { name: "Pricing", href: "", hasDropdown: false },
  { name: "About", href: "/about", hasDropdown: false },
]

const features = [
  { icon: <Users className="h-6 w-6" />, title: "Discussions", description: "Hold engaging conversations" },
  { icon: <BarChart2 className="h-6 w-6" />, title: "Analytics", description: "Get all your community data" },
  { icon: <Calendar className="h-6 w-6" />, title: "Events", description: "Host virtual events, anywhere" },
  { icon: <Bot className="h-6 w-6" />, title: "Community AI", description: "AI-powered connections, and learning" },
  { icon: <MessageSquare className="h-6 w-6" />, title: "Chat", description: "Engage members with discussions" },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Marketing Hub",
    description: "Email, CRM, & marketing automation",
    isNew: true,
  },
  { icon: <CreditCard className="h-6 w-6" />, title: "Payments", description: "Charge for your community and content" },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI Agents",
    description: "Guide, support, and coach your members 24/7",
    isNew: true,
  },
  { icon: <Zap className="h-6 w-6" />, title: "Workflows", description: "Automate personalized experiences" },
]

const plusFeatures = [
  {
    title: "Branded apps",
    description: "Launch a fully-branded community app",
    image: "/user-profile-dashboard.png",
  },
  {
    title: "Headless",
    description: "Add pre-built community features to your app or site",
    image: "/website-skyprint.png",
  },
]

const resourcesItems = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learning Guides",
    description: "Comprehensive guides to enhance your learning journey",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Documentation",
    description: "Detailed documentation for platform features",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Forums",
    description: "Connect with other learners and instructors",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Webinars & Events",
    description: "Join live sessions and educational events",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Teaching Resources",
    description: "Templates and tools for course creation",
    isNew: true,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Success Stories",
    description: "Learn from our top instructors and students",
  },
]

const resourcesFeatures = [
  {
    title: "Instructor Academy",
    description: "Free courses on how to create engaging educational content",
    image: "/online-instructor-explaining.png",
  },
  {
    title: "Student Resources",
    description: "Tools and guides to maximize your learning experience",
    image: "/focused-student.png",
  },
]

const CURRENT_COMMUNITY_KEY = "edlern_current_community"
const USER_COMMUNITIES_KEY = "edlern_user_communities"

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [userCommunities, setUserCommunities] = useState<Community[]>([])
  const [currentCommunity, setCurrentCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const loadCommunitiesFromStorage = () => {
    try {
      const storedCommunitiesString = localStorage.getItem(USER_COMMUNITIES_KEY)
      const storedCurrentCommunityString = localStorage.getItem(CURRENT_COMMUNITY_KEY)

      if (storedCommunitiesString && storedCurrentCommunityString) {
        const storedCommunities = JSON.parse(storedCommunitiesString) as Community[]
        const storedCurrentCommunity = JSON.parse(storedCurrentCommunityString) as Community

        if (storedCommunities.length > 0 && storedCurrentCommunity) {
          const updatedCommunities = storedCommunities.map((comm) => ({
            ...comm,
            current:
              comm.community_id === storedCurrentCommunity.community_id ||
              comm.id === storedCurrentCommunity.id,
          }))
          setUserCommunities(updatedCommunities)
          setCurrentCommunity(storedCurrentCommunity)
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Error loading communities from localStorage:", error)
      return false
    }
  }

  const saveCommunitiesToStorage = (communities: Community[], current: Community | null) => {
    try {
      if (communities.length > 0) {
        localStorage.setItem(USER_COMMUNITIES_KEY, JSON.stringify(communities))
      }
      if (current) {
        localStorage.setItem(CURRENT_COMMUNITY_KEY, JSON.stringify(current))
      }
    } catch (error) {
      console.error("Error saving communities to localStorage:", error)
    }
  }

  const getUserCommunities = async (accessToken: string) => {
    try {
      if (!accessToken) {
        setLoading(false)
        return []
      }

      const response = await fetch("https://edlern.toolsfactory.tech/api/v1/accounts/my-communities/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      const storedCurrentCommunityString = localStorage.getItem(CURRENT_COMMUNITY_KEY)
      let storedCurrentCommunityId: number | undefined

      if (storedCurrentCommunityString) {
        const storedCurrentCommunity = JSON.parse(storedCurrentCommunityString) as Community
        storedCurrentCommunityId = storedCurrentCommunity.community_id || storedCurrentCommunity.id
      }

      const formattedCommunities = result.data.map((community: CommunityData, index: number) => {
        const communityId = community.community_id
        const isCurrent = storedCurrentCommunityId
          ? communityId === storedCurrentCommunityId
          : index === 0
        return {
          ...community,
          id: community.community_id,
          name: community.community_name,
          image: community.community_logo,
          current: isCurrent,
        }
      })

      setUserCommunities(formattedCommunities)
      const newCurrentCommunity = formattedCommunities.find((c: Community) => c.current) || formattedCommunities[0]
      if (newCurrentCommunity) {
        setCurrentCommunity(newCurrentCommunity)
        saveCommunitiesToStorage(formattedCommunities, newCurrentCommunity)
      } else {
        console.warn("No communities found")
      }

      return formattedCommunities
    } catch (error) {
      console.error("Failed to fetch communities:", error)
      const defaultCommunities = [
        {
          id: 1,
          community_id: 1,
          name: "Default Community",
          community_name: "Default Community",
          image: "/placeholder.svg",
          community_logo: "/placeholder.svg",
          members: "24",
          total_members: 24,
          current: true,
          role: "member",
        },
      ]
      setUserCommunities(defaultCommunities)
      setCurrentCommunity(defaultCommunities[0])
      saveCommunitiesToStorage(defaultCommunities, defaultCommunities[0])
      return defaultCommunities
    } finally {
      setLoading(false)
    }
  }

  const handleCommunityChange = (community: Community) => {
    const updatedCommunities = userCommunities.map((comm) => ({
      ...comm,
      current: comm.id === community.id || comm.community_id === community.community_id,
    }))
    setUserCommunities(updatedCommunities)
    setCurrentCommunity(community)
    saveCommunitiesToStorage(updatedCommunities, community)
    const communityId = community.community_id || community.id
    navigate(`/${communityId}/community/feed`)
    setActiveDropdown(null)
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const initializeCommunities = async () => {
      setLoading(true)
      const hasStoredData = loadCommunitiesFromStorage()
      if (hasStoredData) {
        setLoading(false)
        return
      }
      if (accessToken) {
        await getUserCommunities(accessToken)
      } else {
        const defaultCommunities = [
          {
            id: 1,
            community_id: 1,
            name: "Default Community",
            community_name: "Default Community",
            image: "/placeholder.svg",
            community_logo: "/placeholder.svg",
            members: "24",
            total_members: 24,
            current: true,
            role: "member",
          },
        ]
        setUserCommunities(defaultCommunities)
        setCurrentCommunity(defaultCommunities[0])
        saveCommunitiesToStorage(defaultCommunities, defaultCommunities[0])
      }
      setLoading(false)
    }
    initializeCommunities()
  }, [accessToken])

  useEffect(() => {
    if (!userCommunities.length || !currentCommunity) return
    const paths = window.location.pathname.split("/")
    if (paths.length > 1 && !isNaN(Number(paths[1]))) {
      const urlCommunityId = Number(paths[1])
      if (
        currentCommunity.community_id !== urlCommunityId &&
        currentCommunity.id !== urlCommunityId
      ) {
        const communityFromUrl = userCommunities.find(
          (c) => c.community_id === urlCommunityId || c.id === urlCommunityId
        )
        if (communityFromUrl) {
          handleCommunityChange(communityFromUrl)
        }
      }
    }
  }, [userCommunities, currentCommunity])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    setActiveDropdown(null)
  }

  const toggleMobileSubmenu = (name: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === name ? null : name)
  }

  const handleLogout = () => {
    dispatch(logout())
    persistor.purge()
    navigate("/login")
  }

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
  }

  const smoothScrollToSection = (sectionName: string) => {
    navigate("/")
    const sectionElement = document.getElementById(sectionName)
    if (sectionElement) {
      setTimeout(() => {
        sectionElement.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 bg-white mx-auto text-gray-800 left-0 right-0 z-50 transition-all duration-300",
          scrolled && "border-b"
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-2xl">
              <img src="/logo.png" className="w-24" alt="edLern" />
            </Link>
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.name.toLowerCase() === "features" || item.name.toLowerCase() === "pricing") {
                      smoothScrollToSection(item.name.toLowerCase())
                    } else if (item.hasDropdown) {
                      toggleDropdown(item.name)
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-md hover:text-sky-500 flex items-center gap-1 transition-colors",
                    activeDropdown === item.name && "text-sky-600"
                  )}
                >
                  <Link to={item.href} className="flex items-center capitalize gap-1">
                    {item.name}
                  </Link>
                  {item.hasDropdown &&
                    (activeDropdown === item.name ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </button>
              ))}
            </nav>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="text-red-600 flex justify-between items-center gap-2 hover:text-red-500"
                >
                  Signout
                  <LogOut className="text-xs h-4 w-4" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("Communities")}
                    className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-full px-6 py-2 font-medium transition hover:bg-sky-500 flex items-center gap-1"
                  >
                    My Communities
                    {activeDropdown === "Communities" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "Communities" && (
                      <motion.div
                        className="absolute top-12 right-0 bg-white shadow-xl rounded-xl w-64 z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-2 border border-gray-200 rounded-xl">
                          {loading ? (
                            <p className="text-gray-500 px-4 py-2">Loading communities...</p>
                          ) : userCommunities.length > 0 ? (
                            userCommunities.map((community) => (
                              <button
                                key={community.community_id || community.id}
                                onClick={() => handleCommunityChange(community)}
                                className="flex items-center gap-3 w-full text-left px-2 py-2 hover:bg-sky-100 rounded-md"
                              >
                                <img
                                  src={community.community_logo || community.image || "/placeholder.svg"}
                                  alt={community.community_name || community.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-gray-800">
                                  {community.community_name || community.name}
                                </span>
                              </button>
                            ))
                          ) : (
                            <p className="text-gray-500 px-4 py-2">No communities found</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-sky-500">
                  Log in
                </Link>
                <Link to="/login">
                  <button className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-full px-6 py-2 font-medium transition hover:bg-sky-500">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 fixed top-5 right-5 w-6 z-[100]" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {(activeDropdown === "Product" || activeDropdown === "Digital Resources") && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDropdown(null)}
            />
            <motion.div
              className="fixed top-20 max-w-7xl mx-auto h-fit px-4 py-6 rounded-xl left-0 right-0 bg-white shadow-xl z-40 overflow-y-auto hidden lg:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="container mx-auto text-gray-800 px-4">
                {activeDropdown === "Product" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium mb-6">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex gap-4 group cursor-pointer"
                          >
                            <div className="mt-1 text-gray-600 group-hover:text-sky-500 transition-colors">
                              {feature.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800 group-hover:text-sky-500 transition-colors">
                                  {feature.title}
                                </h4>
                                {feature.isNew && (
                                  <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-6">Premium</h3>
                      <div className="space-y-6">
                        {plusFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (features.length + index) * 0.05 }}
                            className="bg-sky-100 rounded-xl p-4 text-gray-800 cursor-pointer"
                          >
                            <h4 className="font-medium mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeDropdown === "Digital Resources" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                      <h3 className="text-lg font-medium mb-6">Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {resourcesItems.map((item, index) => (
                          <Link to="/digital-products" key={item.title}>
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="flex gap-4 group cursor-pointer"
                            >
                              <div className="mt-1 text-gray-500 group-hover:text-sky-500 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium group-hover:text-sky-500 transition-colors">
                                    {item.title}
                                  </h4>
                                  {item.isNew && (
                                    <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                      New
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-6">Featured Resources</h3>
                      <div className="space-y-6">
                        {resourcesFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: (resourcesItems.length + index) * 0.05 }}
                            className="bg-sky-100 rounded-xl p-4 text-gray-800 cursor-pointer"
                          >
                            <h4 className="font-medium mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-4 flex justify-between items-center">
                <Link to="/" className="font-bold text-2xl">
                  <span className="text-sky-500">ed</span>Lern
                </Link>
              </div>
              <div className="p-4 space-y-4 bg-white mx-auto text-gray-800 pt-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 pb-4">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => toggleMobileSubmenu(item.name)}
                          className="flex items-center justify-between w-full py-2 text-lg font-medium"
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileSubmenuOpen === item.name && "rotate-90"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileSubmenuOpen === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="py-4 pl-4">
                                {item.name === "Digital Resources" && (
                                  <div className="space-y-4">
                                    {resourcesItems.map((resource) => (
                                      <Link to="/digital-products" key={resource.title}>
                                        <div className="flex gap-4 py-2">
                                          <div className="mt-1 text-gray-500">{resource.icon}</div>
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <h4 className="font-medium">{resource.title}</h4>
                                              {resource.isNew && (
                                                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                                                  New
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-sm text-gray-500">{resource.description}</p>
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                    <div className="pt-4">
                                      <h4 className="font-medium mb-4">Featured Resources</h4>
                                      {resourcesFeatures.map((feature) => (
                                        <div key={feature.title} className="bg-sky-100 rounded-xl p-4 mb-4">
                                          <h5 className="font-medium mb-1">{feature.title}</h5>
                                          <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={item.href} className="block py-2 text-lg font-medium">
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                {isAuthenticated && (
                  <div className="border-b border-gray-100 pb-4">
                    <button
                      onClick={() => toggleMobileSubmenu("Communities")}
                      className="flex items-center justify-between w-full py-2 text-lg font-medium"
                    >
                      <span>My Communities</span>
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 transition-transform",
                          mobileSubmenuOpen === "Communities" && "rotate-90"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenuOpen === "Communities" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="py-4 pl-4">
                            {loading ? (
                              <p className="text-gray-500 px-4 py-2">Loading communities...</p>
                            ) : userCommunities.length > 0 ? (
                              userCommunities.map((community) => (
                                <button
                                  key={community.community_id || community.id}
                                  onClick={() => handleCommunityChange(community)}
                                  className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-sky-100 rounded-md"
                                >
                                  <img
                                    src={community.community_logo || community.image || "/placeholder.svg"}
                                    alt={community.community_name || community.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <span className="text-gray-800">
                                    {community.community_name || community.name}
                                  </span>
                                </button>
                              ))
                            ) : (
                              <p className="text-gray-500 px-4 py-2">No communities found</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
                <div className="pt-4 space-y-4">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center py-3 text-red-600 border border-red-600 rounded-md hover:bg-red-100 transition"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-center py-3 text-sky-500 border border-sky-700 rounded-md hover:bg-sky-100 transition"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/login"
                        className="block w-full text-center py-3 text-white bg-sky-500 rounded-md hover:bg-sky-600 transition"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar