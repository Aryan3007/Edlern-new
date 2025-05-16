
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Footer from "@/section/footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function CareersPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="flex bg-white  text-black min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="w-full bg-white flex items-center mt-12 py-16 md:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                            Join Our Team
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
                            Be part of a mission-driven team shaping the future of digital communities. Together, we can transform how people learn and connect online.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <Button className="bg-sky-600 rounded-full hover:bg-sky-700 px-6 py-3">
                            View Open Positions
                        </Button>
                        <Button variant="outline" className="px-6 rounded-full py-3 ">
                            Learn About Our Culture
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* About Working Here */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                  <span className="text-xs font-medium text-sky-800">Our Culture</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Life at edLern</h2>
                <p className="text-gray-500 md:text-lg">
                  We're a diverse team of lifelong learners, community builders, and technology enthusiasts dedicated to
                  making learning more connected and impactful. At edLern, we practice what we preach by fostering a
                  culture of curiosity, growth, and collaboration.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Remote-first with team retreats</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Flexible working hours</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Competitive compensation and equity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Comprehensive health benefits</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Learning and development budget</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Team working together"

                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                <span className="text-xs font-medium text-sky-800">Our Values</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What drives us</h2>
              <p className="text-gray-500 md:text-lg">
                These core principles guide everything we do at edLern, including how we work together as a team.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ValueCard
                title="Community First"
                description="We believe in the power of community to transform learning experiences and create lasting impact."
              />
              <ValueCard
                title="Quality Over Quantity"
                description="We carefully curate our platform to ensure every community meets our high standards for content and engagement."
              />
              <ValueCard
                title="Accessibility"
                description="We're committed to making transformative learning experiences accessible to everyone, regardless of background."
              />
              <ValueCard
                title="Creator Success"
                description="We empower creators with the tools, resources, and support they need to build thriving communities."
              />
              <ValueCard
                title="Continuous Learning"
                description="We practice what we preach by fostering a culture of curiosity and growth within our own team."
              />
              <ValueCard
                title="Transparency"
                description="We believe in honest communication with our community members, creators, and stakeholders."
              />
            </div>
          </div>
        </section>

      

        {/* Team Photos */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Life at edLern</h2>
              <p className="text-gray-500 md:text-lg">
                Get a glimpse of our team culture and what it's like to work with us.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/placeholder.svg?height=400&width=400" alt="Team photo" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What our team says</h2>
              <p className="text-gray-500 md:text-lg">
                Hear directly from our team members about their experience working at edLern.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="Working at edLern has been the highlight of my career. The culture of continuous learning and the impact we're making on creators' lives is incredibly fulfilling."
                name="Alex Johnson"
                role="Senior Engineer"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="I love that we practice what we preach. We're building community tools, and our team feels like a true community where everyone's voice is valued."
                name="Maya Patel"
                role="Product Designer"
                image="/placeholder.svg?height=100&width=100"
              />
              <TestimonialCard
                quote="The remote-first culture at edLern gives me the flexibility I need while still feeling connected to an amazing team that's changing how people learn online."
                name="Carlos Rodriguez"
                role="Community Manager"
                image="/placeholder.svg?height=100&width=100"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-sky-500 rounded-2xl to-sky-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tighter md:text-4xl">Ready to join us?</h2>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Explore our open positions and become part of a team that's transforming digital communities.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white hover:bg-white text-black">View Open Positions</Button>
                <Button variant="outline" className="bg-transparent border-0 text-white">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
     <Footer/>
    </div>
  )
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col space-y-3 rounded-xl border bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100">
        <CheckCircle className="h-5 w-5 text-sky-600" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}



function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string
  name: string
  role: string
  image: string
}) {
  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-white p-6">
      <div className="flex-1">
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
          className="h-8 w-8 text-sky-200 mb-2"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
        <p className="text-gray-500">{quote}</p>
      </div>
      <div className="flex items-center gap-3">
        <img src={image || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-full" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}
