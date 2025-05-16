"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from 'react';
interface Testimonial {
  id: number
  content: string
  author: string
  role: string
  company: string
  avatar: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "edLern transformed how we deliver professional development. Our team engagement increased by 78% since we started using the platform.",
    author: "Sarah Johnson",
    role: "Head of Learning & Development",
    company: "TechCorp Inc.",
    avatar: "/placeholder.svg?key=mtepx",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1744309544231-b3e8ab25ba10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content:
      "The community features combined with structured courses is exactly what we needed. Our students feel connected even in a remote learning environment.",
    author: "Michael Chen",
    role: "Online Education Director",
    company: "Global University",
    avatar: "/placeholder.svg?key=eux8t",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1744309544231-b3e8ab25ba10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content:
      "As a course creator, edLern gave me the tools to not just teach, but build a thriving community around my content. My course completion rates have doubled!",
    author: "Elena Rodriguez",
    role: "Independent Course Creator",
    company: "Design Masterclass",
    avatar: "/placeholder.svg?key=xu0xg",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1744309544231-b3e8ab25ba10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content:
      "The gamification elements keep our team motivated. The leaderboard has created a friendly competition that drives learning outcomes.",
    author: "David Wilson",
    role: "Training Manager",
    company: "Innovate Solutions",
    avatar: "/placeholder.svg?key=pnm66",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1744309544231-b3e8ab25ba10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    content:
      "We've tried several learning platforms, but edLern's focus on community building alongside education makes it stand out. It's been a game-changer for our organization.",
    author: "Priya Patel",
    role: "Community Manager",
    company: "CreativeLabs",
    avatar: "/placeholder.svg?key=9qer6",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1744309544231-b3e8ab25ba10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function TestimonialsSection(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [autoplay, setAutoplay] = useState<boolean>(true)
  const [slideDirection, setSlideDirection] = useState<number>(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const controls = useAnimation()

  // Handle autoplay
  useEffect(() => {
    if (!isInView || !autoplay) return

    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % testimonials.length
      setSlideDirection(1) // Move forward for autoplay
      setActiveIndex(newIndex)
    }, 6000)

    return () => clearInterval(interval)
  }, [isInView, autoplay, activeIndex])

  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const nextTestimonial = (): void => {
    setAutoplay(false)
    setSlideDirection(1) // Forward
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = (): void => {
    setAutoplay(false)
    setSlideDirection(-1) // Backward
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number): void => {
    setAutoplay(false)
    // Determine direction based on current and target index
    const direction = index > activeIndex ? 1 : -1
    setSlideDirection(index === activeIndex ? 0 : direction)
    setActiveIndex(index)
  }

  // Generate star rating
  const renderStars = (rating: number): JSX.Element[] => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "text-sky-500 fill-sky-500" : "text-neutral-300")} />
      ))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section ref={ref} id="testimonials-section" className="py-12 bg-white md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <motion.div variants={itemVariants} className="inline-block text-black"></motion.div>
          <h2 className="heading-2 text-[#0a2540] text-3xl md:text-5xl font-bold mb-4 text-secondary-500">
            Loved by learning communities
          </h2>
          <h3 className="text-2xl md:text-4xl font-semibold text-sky-600 :text-sky-600 mb-4 md:mb-8">
            worldwide
          </h3>
          <p className="text-lg text-gray-600 :text-gray-300">
            See what educators, organizations, and learners are saying about their experience with edLern.
          </p>
        </motion.div>

        {/* Main testimonial showcase */}
        <div className="relative max-w-6xl mx-auto">
          {/* Testimonial content */}
          <div className="relative min-h-[450px] md:min-h-[400px]">
            <AnimatePresence custom={slideDirection} mode="wait">
              <motion.div
                key={activeIndex}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-center h-full">
                  {/* Testimonial image */}
                  <div className="relative h-44 lg:h-64 md:h-full rounded-2xl overflow-hidden shadow-xl order-1 md:order-1">
                    <img
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      alt={testimonials[activeIndex].author}
                      className="w-full h-full object-cover"
                    />

                    {/* Floating quote */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                    >
                      <Quote className="h-6 w-6 text-sky-500" />
                    </motion.div>
                  </div>

                  {/* Testimonial text */}
                  <div className="order-2 md:order-">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="bg-white text-black rounded-2xl p-6 md:p-8 shadow-lg relative"
                    >
                      <div className="flex mb-4">{renderStars(testimonials[activeIndex].rating)}</div>
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-lg md:text-2xl font-medium text-secondary-500 mb-6 relative"
                      >
                        "{testimonials[activeIndex].content}"
                      </motion.blockquote>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex items-center"
                      >
                        <div className="relative w-12 h-12 md:w-14 md:h-14 mr-4 overflow-hidden rounded-full border-2 border-sky-100">
                          <img
                            src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                            alt={testimonials[activeIndex].author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-500">{testimonials[activeIndex].author}</h4>
                          <p className="text-sm text-neutral-500">
                            {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                          </p>
                        </div>
                      </motion.div>

                      {/* Decorative element */}
                      <div className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-sky-200"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls - improved placement and responsiveness */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 lg:mt-6 gap-4">
            <div className="flex space-x-2 order-2 md:order-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    activeIndex === index ? "bg-sky-500 w-8" : "bg-neutral-300 hover:bg-sky-300",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3 order-1 md:order-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-sky-600 hover:bg-sky-700 duration-200 text-white border border-neutral-200 hover:border-sky-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-sky-600 hover:bg-sky-700 duration-200 text-white border border-neutral-200 hover:border-sky-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.8,
                duration: 0.6,
              },
            },
          }}
          className="mt-12 md:mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <CounterStat value={10000} suffix="+" label="Active Communities" />
            <CounterStat value={50000} suffix="+" label="Course Creators" />
            <CounterStat value={1000000} suffix="+" label="Learners" />
            <CounterStat value={98} suffix="%" label="Satisfaction Rate" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface CounterStatProps {
  value: number
  suffix?: string
  label: string
}

// Animated counter component
function CounterStat({ value, suffix = "", label }: CounterStatProps): JSX.Element {
  const [count, setCount] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const duration = 2000
    const startTime = Date.now()

    // Don't use requestAnimationFrame for very large numbers
    const useRAF = value < 100000

    let timer: NodeJS.Timeout | undefined

    if (useRAF) {
      // For smaller numbers, use smooth animation
      const animateCount = (): void => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const currentCount = Math.floor(progress * end)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animateCount)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(animateCount)
    } else {
      // For larger numbers, use stepped animation
      const steps = 20
      const increment = Math.ceil(end / steps)
      const interval = duration / steps

      timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, interval)
    }

    return () => {
      if (!useRAF && timer) {
        clearInterval(timer)
      }
    }
  }, [isInView, value])

  // Format large numbers with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <div ref={ref} className="text-center">
      <div className="text-xl md:text-3xl font-bold text-black flex items-center justify-center">
        <span>{formattedCount}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm md:text-base text-sky-700 mt-1">{label}</p>
    </div>
  )
}
