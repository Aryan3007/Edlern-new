// src/components/TabImageViewer.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type TabName = "Welcome" | "Community" | "Classroom" | "Amalytics" | "Events" | "Chat";

interface Tab {
  name: TabName;
  label: string;
  image: string;
}

// Mock data for tabs and images
const tabs: Tab[] = [
  {
    name: "Welcome",
    label: "Nature",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  },
  {
    name: "Community",
    label: "City",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  },
  {
    name: "Classroom",
    label: "Abstract",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  }, {
    name: "Amalytics",
    label: "Abstract",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  }, {
    name: "Events",
    label: "Abstract",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  }, {
    name: "Chat",
    label: "Abstract",
    image: "/placeholder.svg?height=80&width=80&text=Thumb+1",
  },
];

// Component
const TabsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Welcome");

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // Animation variants for the tab
  const tabVariants = {
    inactive: { scale: 1, color: "#6b7280" },
    active: { scale: 1.05, color: "#0284c7" },
    hover: { scale: 1.1, color: "#0ea5e9" },
  };

  // Find the current tab's image
  const currentTab = tabs.find((tab) => tab.name === activeTab);
  const currentImage = currentTab?.image || "";

  return (
    <div className="h-full pt-12 bg-white">
      {/* Header */}
      <header className=" py-4 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
      
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4">

          {/* Tabs */}
          <nav className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.name}
                variants={tabVariants}
                initial="inactive"
                animate={activeTab === tab.name ? "active" : "inactive"}
                whileHover="hover"
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${activeTab === tab.name
                    ? " text-white  shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                aria-label={`Switch to ${tab.label} tab`}
              >
                {tab.name}
              </motion.button>
            ))}
          </nav>

        </div>
      </header>

      {/* Image Section */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full h-full sm:h-full aspect-video rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={currentImage}
                alt={`${activeTab} category`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default TabsSection;