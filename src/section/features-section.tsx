"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Users,
  Calendar,
  UserPlus,
  CreditCard,
  ShoppingBag,
  Video,
  ArrowRight,
  MessageSquare,
  BarChart,
} from "lucide-react"

const features = [
  {
    id: "community",
    title: "Build Your Community",
    description: "Create a personalized space for your audience to connect and engage.",
    icon: <Users className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "events",
    title: "Host & Attend Events",
    description: "Organize virtual or in-person events with powerful management tools.",
    icon: <Calendar className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "join",
    title: "Join Communities",
    description: "Discover and connect with communities that share your interests and passions.",
    icon: <UserPlus className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "monetize",
    title: "Monetize Memberships",
    description: "Generate recurring revenue with flexible membership options for your community.",
    icon: <CreditCard className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "products",
    title: "Sell Digital Products",
    description: "Create and sell digital products directly to your community members.",
    icon: <ShoppingBag className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "live",
    title: "Go Live & Engage",
    description: "Stream high-quality live video and interact with your audience in real-time.",
    icon: <Video className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "analytics",
    title: "Powerful Analytics",
    description: "Gain insights into your community's engagement and growth with detailed analytics.",
    icon: <BarChart className="h-5 w-5" />,
    color: "#8bd41d",
  },
  {
    id: "messaging",
    title: "Messaging System",
    description: "Enable seamless communication between members with our robust messaging system.",
    icon: <MessageSquare className="h-5 w-5" />,
    color: "#8bd41d",
  },
]

export default function FeaturesSectionPro() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="features" ref={sectionRef} className="py-16 md:py-24 bg-white :bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 :text-white mb-4">
            Everything You Need to Build a 
          </h2>
          <h3 className="text-2xl md:text-4xl font-semibold text-sky-600 :text-sky-500 mb-6">
            Thriving Community
          </h3>
          <p className="text-lg text-gray-600 :text-gray-300">
            Our platform provides all the tools you need to create, grow, and monetize your online community.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
              className="group relative"
            >
              <div className="h-full rounded-xl bg-white :bg-gray-800 border border-sky-700 :border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-5">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center mr-4" 
                         style={{ backgroundColor: feature.color + "15" }}>
                      <div className="text-sky-600 :text-sky-500">{feature.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 :text-white">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 :text-gray-300 mb-6">
                    {feature.description}
                  </p>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: activeFeature === feature.id ? 1 : 0,
                      y: activeFeature === feature.id ? 0 : 10 
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sky-600 :text-sky-500 font-medium flex items-center text-sm"
                  >
                    Learn more
                    <motion.div
                      animate={{ 
                        x: activeFeature === feature.id ? 5 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: activeFeature === feature.id ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                  className="h-0.5 bg-sky-500 absolute bottom-0 left-0 right-0"
                /> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}