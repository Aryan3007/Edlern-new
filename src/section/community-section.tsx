"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, CreditCard, Video, Trophy, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  {
    id: "create",
    label: "Create",
    icon: <Users className="h-5 w-5" />,
    title: "Build Your Community",
    description:
      "Create your own community in just a few easy steps and start engaging with learners by sharing your content.",
    benefits: ["Customizable community pages", "Content management tools", "Member management", "Discussion forums"],
    image:
      "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "from-sky-500 to-sky-600",
    bgGradient: "from-sky-50 to-white",
    accentColor: "bg-sky-500",
  },
  {
    id: "monetize",
    label: "Monetize",
    icon: <CreditCard className="h-5 w-5" />,
    title: "Monetize Your Community",
    description:
      "Generate revenue through memberships, digital products, and exclusive content for your community members.",
    benefits: ["Multiple payment options", "Subscription management", "Digital product sales", "Automated billing"],
    image:
      "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "from-sky-500 to-sky-600",
    bgGradient: "from-sky-50 to-white",
    accentColor: "bg-sky-500",
  },
  {
    id: "livestream",
    label: "Live Stream",
    icon: <Video className="h-5 w-5" />,
    title: "Engage with Live Streaming",
    description:
      "Connect with your audience in real-time through high-quality live streaming and interactive sessions.",
    benefits: ["HD video streaming", "Live chat integration", "Recording capabilities", "Stream scheduling"],
    image:
      "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "from-sky-500 to-sky-600",
    bgGradient: "from-sky-50 to-white",
    accentColor: "bg-sky-500",
  },
  {
    id: "gamification",
    label: "Gamification",
    icon: <Trophy className="h-5 w-5" />,
    title: "Gamify the Experience",
    description: "Increase engagement with gamification elements like badges, points, leaderboards, and challenges.",
    benefits: ["Custom achievement badges", "Point systems", "Leaderboards", "Challenges and rewards"],
    image:
      "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    gradient: "from-sky-500 to-sky-600",
    bgGradient: "from-sky-50 to-white",
    accentColor: "bg-sky-500",
  },
]

export default function CommunitySection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const selectedFeature = features.find((feature) => feature.id === activeFeature) || features[0]

  return (
    <section className="py-16 bg-white  text-black md:py-24 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-[#0a2540]">Grow a dynamic community</span>
          </h2>
          <h3 className="text-2xl md:text-4xl font-semibold text-sky-600 :text-sky-600 mb-8">
            That reflects your vision
          </h3>
          <p className="text-lg text-gray-600 :text-gray-300">
            Our platform provides all the tools you need to build, grow, and monetize your online community.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Feature navigation */}
          <div className="md:col-span-12 flex flex-wrap justify-center gap-3 mb-2 lg:mb-8">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFeature === feature.id
                    ? `bg-gradient-to-r ${feature.gradient} text-white shadow-md`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {feature.icon}
                {feature.label}
              </button>
            ))}
          </div>

          {/* Feature content */}
          <div className="md:col-span-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={cn("rounded-3xl overflow-hidden bg-gradient-to-br")}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div>
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-white shadow-sm",
                          `text-${selectedFeature.id}-600`,
                        )}
                      >
                        {selectedFeature.icon}
                        {selectedFeature.label}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{selectedFeature.title}</h3>
                      <p className="text-gray-600">{selectedFeature.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Key Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedFeature.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm"
                          >
                            <div className={cn("flex-shrink-0 p-1 rounded-full", selectedFeature.accentColor)}>
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Button
                        className={cn(
                          "bg-gradient-to-r text-white hover:opacity-90 transition-opacity group px-6 py-2.5 rounded-full",
                          selectedFeature.gradient,
                        )}
                      >
                        Get started with {selectedFeature.label}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-lg">
                      {isClient && (
                        <img
                          src={selectedFeature.image || "/placeholder.svg"}
                          alt={selectedFeature.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                    </div>

                    {/* Decorative elements */}
                    <div
                      className={cn(
                        "absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30",
                        selectedFeature.accentColor,
                      )}
                    ></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
