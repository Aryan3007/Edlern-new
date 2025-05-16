"use client"

import { RootState } from "@/store/store"
import { ChevronRight, Compass } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

// import { motion } from "framer-motion"
// import { ArrowRight, Users, Calendar, Info } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

export default function HeroSection() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const user = useSelector((state: RootState) => state.auth.user as { first_name: string } | null)

  console.log(isAuthenticated);

  return (
    <div className="bg-white">

      <section className=" bg-opacity-30 min-h-screen py-32 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-sky-600 uppercase">A social media for learners</p>
              <h1 className="mt-4 text-5xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-7xl"> Build your best community starting from here.</h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-lg">Meet and communicate with the best people to run projects, events or other activities in a more effective and fun way.</p>
             <div className="flex flex-col mt-6 gap-4 sm:flex-row">
              {!isAuthenticated ? (
                <Link to="/login" className="inline-flex gap-2 w-fit items-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full lg:mt-16 hover:bg-sky-500/80 focus:bg-sky-500/60" role="button">
                  Join For Free
                  <ChevronRight />
                </Link>
              ) : (
                <Link to="/create-community-page" className="inline-flex gap-2 w-fit items-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full lg:mt-16 hover:bg-sky-500/80 focus:bg-sky-500/60" role="button">
                  Create Community
                  <ChevronRight />
                </Link>
              )}
                <Link to={"/discover"} className="inline-flex gap-2 w-fit items-center px-6 py-3  font-semibold  transition-all duration-200 border-sky-500 border text-sky-600 rounded-full lg:mt-16 " role="button">
                Explore
                <Compass />
              </Link>        
              </div>
               
              {/* <Link to="/community/dashboard" className="inline-flex gap-2 items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full lg:mt-16 hover:bg-sky-500/80 focus:bg-sky-500/60" role="button">
            Join for free
           <ChevronRight/>
          </Link> */}
                {isAuthenticated && (
                <p className="mt-5 text-gray-600">Welcome back! <span className="font-medium">{user?.first_name}</span> Ready to<Link to="/discover" className="text-black transition-all duration-200 hover:underline"> explore? </Link></p>
                )}
            </div>
            <div>
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 rounded-2xl overflow-hidden">
        <video autoPlay loop muted  className="aspect-video rounded-2xl " src="https://edlern.com/wp-content/uploads/2025/03/IMG_1505.mp4"></video>
      </div> */}
    </div>


  )
}