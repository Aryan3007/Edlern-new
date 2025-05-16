import type React from "react"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Footer from "@/section/footer"
import Navbar from "@/components/Navbar"
import { useEffect } from "react"

export default function FeaturesPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="flex bg-white text-black min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-6xl">
                  Features that empower communities
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-2xl">
                  Everything you need to discover, join, and build thriving digital communities.
                </p>
              </div>
              <div className="space-x-6">
                <Button className="bg-sky-600 rounded-full px-4 hover:bg-sky-700">Get Started</Button>
                <Button className="rounded-full px-4" variant="outline">View Pricing</Button>
              </div>
            </div>
          </div>
        </section>

        {/* For Community Members */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                <span className="text-xs font-medium text-sky-800">For Community Members</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Discover and connect</h2>
              <p className="text-gray-500 md:text-lg">
                Find the perfect communities to join and engage with like-minded people.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Curated Discovery"
                description="Browse hand-picked communities across various categories, tailored to your interests."
                icon={
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                }
              />
              <FeatureCard
                title="Unified Dashboard"
                description="Access all your communities in one place with a personalized dashboard."
                icon={
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
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                }
              />
              <FeatureCard
                title="Event Calendar"
                description="Never miss an event with our integrated calendar across all your communities."
                icon={
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                }
              />
              <FeatureCard
                title="Discussion Forums"
                description="Engage in meaningful conversations with community members through threaded discussions."
                icon={
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                }
              />
              <FeatureCard
                title="Resource Library"
                description="Access exclusive content, guides, and resources shared within your communities."
                icon={
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
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                }
              />
              <FeatureCard
                title="Direct Messaging"
                description="Connect one-on-one with community members and creators through private messages."
                icon={
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
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* For Creators */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                <span className="text-xs font-medium text-sky-800">For Creators</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Build and grow</h2>
              <p className="text-gray-500 md:text-lg">
                Powerful tools to create, manage, and monetize your digital community.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Community Builder"
                description="Easy-to-use tools to set up and customize your community in minutes."
                icon={
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 3 3 7-7" />
                  </svg>
                }
              />
              <FeatureCard
                title="Flexible Monetization"
                description="Choose from subscription, one-time payment, or free membership models."
                icon={
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                }
              />
              <FeatureCard
                title="Member Management"
                description="Comprehensive tools to manage members, permissions, and access levels."
                icon={
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />
              <FeatureCard
                title="Analytics Dashboard"
                description="Detailed insights into member engagement, revenue, and growth metrics."
                icon={
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
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                }
              />
              <FeatureCard
                title="Content Management"
                description="Organize and schedule content, events, and announcements with ease."
                icon={
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                }
              />
              <FeatureCard
                title="Integration Ecosystem"
                description="Connect with your favorite tools through our extensive integration marketplace."
                icon={
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
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <line x1="3" x2="21" y1="9" y2="9" />
                    <line x1="3" x2="21" y1="15" y2="15" />
                    <line x1="9" x2="9" y1="3" y2="21" />
                    <line x1="15" x2="15" y1="3" y2="21" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                <span className="text-xs font-medium text-sky-800">Platform Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Built for everyone</h2>
              <p className="text-gray-500 md:text-lg">
                Core platform features that make Discover+ the best place for digital communities.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
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
                        <path d="M20 7h-9" />
                        <path d="M14 17H5" />
                        <circle cx="17" cy="17" r="3" />
                        <circle cx="7" cy="7" r="3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Seamless Payments</h3>
                    <p className="text-gray-500">
                      Secure payment processing with support for multiple currencies and payment methods. Creators
                      receive payouts quickly and reliably.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Multiple payment methods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Automatic recurring billing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Fast creator payouts</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Enterprise-Grade Security</h3>
                    <p className="text-gray-500">
                      Your data and your members' information is protected with industry-leading security practices and
                      regular audits.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>End-to-end encryption</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>GDPR compliant</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Regular security audits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
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
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        <path d="M19 3v4" />
                        <path d="M23 7h-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">White-Label Customization</h3>
                    <p className="text-gray-500">
                      Make your community truly yours with extensive customization options for branding, layout, and
                      design.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Custom domain support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Brand color and logo customization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Flexible layout options</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
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
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Comprehensive Documentation</h3>
                    <p className="text-gray-500">
                      Extensive guides, tutorials, and API documentation to help you get the most out of the platform.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Detailed user guides</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Video tutorials</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-sky-600" />
                        <span>Developer API documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to get started?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Join thousands of creators and community members on Discover+ today.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-sky-600 hover:bg-sky-700">Create Your Community</Button>
                <Button variant="outline">Explore Communities</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-3 rounded-xl border bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
