"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Minus, MessageSquare, HelpCircle, CheckCircle, AlertCircle, DollarSign, User } from 'lucide-react'
import { Input } from "@/components/ui/input"

// FAQ data
const faqCategories = [
  { 
    id: "general", 
    name: "General", 
    icon: <HelpCircle className="h-5 w-5" /> 
  },
  { 
    id: "account", 
    name: "Account", 
    icon: <User className="h-5 w-5" /> 
  },
  { 
    id: "features", 
    name: "Features", 
    icon: <CheckCircle className="h-5 w-5" /> 
  },
  { 
    id: "billing", 
    name: "Billing", 
    icon: <DollarSign className="h-5 w-5" /> 
  },
  { 
    id: "support", 
    name: "Support", 
    icon: <AlertCircle className="h-5 w-5" /> 
  },
]

const faqItems = [
  {
    id: 1,
    category: "general",
    question: "What is edLern?",
    answer:
      "edLern is a comprehensive community platform designed to help you build, manage, and grow your online community. Our platform provides tools for discussions, events, content sharing, and member management, all in one place.",
  },
  {
    id: 2,
    category: "general",
    question: "How can edLern help my organization?",
    answer:
      "edLern helps organizations by providing a centralized platform for member engagement, content delivery, event management, and community building. This leads to increased member retention, better communication, and stronger community bonds.",
  },
  {
    id: 3,
    category: "account",
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Get Started' button on our homepage, then follow the registration process. You'll need to provide your email address and create a password. You can also sign up using your Google, Facebook, or Apple account for faster registration.",
  },
  {
    id: 4,
    category: "account",
    question: "Can I have multiple administrators for my community?",
    answer:
      "Yes, edLern supports multiple administrator roles with different permission levels. You can assign roles such as Owner, Administrator, Moderator, and Content Creator, each with specific capabilities to help manage your community effectively.",
  },
  {
    id: 5,
    category: "features",
    question: "What features are included in the basic plan?",
    answer:
      "The basic plan includes community discussions, member profiles, basic analytics, event creation, and content sharing. It supports up to 1,000 members and includes our standard customer support package.",
  },
  {
    id: 6,
    category: "features",
    question: "Does edLern offer mobile apps?",
    answer:
      "Yes, edLern offers native mobile apps for both iOS and Android platforms. Members can access your community on the go, receive push notifications, and engage with content from their mobile devices.",
  },
  {
    id: 7,
    category: "billing",
    question: "How does pricing work?",
    answer:
      "Our pricing is based on the number of members in your community and the features you need. We offer monthly and annual billing options, with discounts for annual commitments. Custom enterprise plans are also available for larger organizations.",
  },
  {
    id: 8,
    category: "billing",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time through your account dashboard. When upgrading, the new features will be immediately available. When downgrading, the changes will take effect at the end of your current billing cycle.",
  },
  {
    id: 9,
    category: "support",
    question: "How can I get help if I have issues?",
    answer:
      "We offer multiple support channels including email support, live chat, and an extensive knowledge base. Premium and Enterprise plans also include dedicated support representatives and priority response times.",
  },
  {
    id: 10,
    category: "support",
    question: "Do you offer onboarding assistance?",
    answer:
      "Yes, all plans include basic onboarding assistance. Our Premium and Enterprise plans include personalized onboarding sessions with a dedicated success manager to help you set up your community for success.",
  },
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  // Filter FAQs based on category and search query
  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Find the active category icon
  const activeCategoryIcon = faqCategories.find(cat => cat.id === activeCategory)?.icon || <HelpCircle className="h-5 w-5" />

  return (
    <section className="py-16 md:py-24 bg-white :bg-[#1a1d29]" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 :text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 :text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our platform, features, and services. Can't find what you're
              looking for? Contact our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {/* Search bar */}
              <div className="relative lg:flex hidden mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 :text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 bg-gray-100 :bg-[#282c3d]/50 border-gray-200 :border-gray-700 text-gray-900 :text-white placeholder:text-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 rounded-xl"
                />
              </div>

              {/* Category tabs - vertical */}
              <div className="space-y-2 sticky lg:flex hidden flex-col top-24">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === "all"
                      ? "bg-gradient-to-br from-sky-500 to-sky-700 text-white"
                      : "bg-gray-100 :bg-[#282c3d]/50 text-gray-700 :text-gray-300 hover:bg-gray-200 :hover:bg-[#282c3d]"
                  }`}
                >
                  <HelpCircle className="h-5 w-5 mr-3" />
                  <span>All Categories</span>
                </button>
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? "bg-gradient-to-br from-sky-500 to-sky-700 text-white"
                        : "bg-gray-100 :bg-[#282c3d]/50 text-gray-700 :text-gray-300 hover:bg-gray-200 :hover:bg-[#282c3d]"
                    }`}
                  >
                    {category.icon}
                    <span className="ml-3">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {/* FAQ accordion */}
              <div className="space-y-6">
                {filteredFaqs.length > 0 ? (
                  <>
                    <div className="flex items-center mb-6">
                      <div className="p-2 rounded-full bg-sky-500/10 mr-3">
                        {activeCategoryIcon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 :text-white">
                        {activeCategory === "all" ? "All Questions" : faqCategories.find(c => c.id === activeCategory)?.name}
                      </h3>
                    </div>
                    
                    {filteredFaqs.map((faq) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white :bg-[#282c3d]/50 shadow-sm :shadow-none rounded-2xl border border-gray-100 :border-gray-700/50 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(faq.id)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-medium text-gray-900 :text-white">{faq.question}</span>
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                            expandedId === faq.id 
                              ? "bg-sky-500 text-white" 
                              : "bg-gray-100 :bg-gray-800 text-gray-500 :text-gray-400"
                          }`}>
                            {expandedId === faq.id ? (
                              <Minus className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {expandedId === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 border-t text-sm border-gray-100 :border-gray-700/50 text-gray-600 :text-gray-300 leading-relaxed">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-16 px-6 bg-white :bg-[#282c3d]/30 rounded-2xl border border-gray-100 :border-gray-700/50">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 :bg-[#282c3d] mb-4">
                      <MessageSquare className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 :text-white mb-2">No results found</h3>
                    <p className="text-gray-600 :text-gray-400">
                      We couldn't find any FAQs matching your search. Try different keywords or{" "}
                      <a href="#contact" className="text-sky-600 hover:text-[#f06292]">
                        contact support
                      </a>
                      .
                    </p>
                  </div>
                )}
              </div>

              {/* Contact support */}
              {/* <div className="mt-12 text-center">
                <p className="text-gray-600 :text-gray-300 mb-4">Still have questions?</p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-sky-500 hover:bg-sky-500 text-white rounded-lg font-medium transition-colors"
                >
                  Contact Support
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
