
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Globe, Award } from "lucide-react"
import Navbar from "@/components/Navbar";
import Footer from "@/section/footer";
import { useEffect } from "react";

export default function CompanyAboutPage() {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <div className="flex  bg-white text-black min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto">
        <section className="w-full bg-white flex items-center mt-12 py-16 md:py-24">
            <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                About edLern
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
                At edLern, we are passionate about creating a world where learning is accessible, engaging, and community-driven. Discover how we are redefining education for the digital age.
            </p>
              </div>
              <div className="space-x-4">
            <Button className="bg-sky-600 rounded-full hover:bg-sky-700 px-6 py-3">
                Learn More About Us
            </Button>
            <Button variant="outline" className="px-6 rounded-full py-3">
                Explore Our Mission
            </Button>
              </div>
          </div>
            </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1">
                  <span className="text-xs font-medium text-sky-800">Our Mission</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Empowering growth through community</h2>
                <p className="text-gray-500 md:text-lg">
                  At edLern, we believe that the best learning happens in community. Our mission is to connect
                  curious minds with the world's best digital communities, courses, and memberships, making
                  transformative learning experiences accessible to everyone.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Curated quality content from trusted creators</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Community-driven learning experiences</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-sky-600" />
                    <p className="font-medium">Accessible knowledge for personal and professional growth</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="People collaborating"
           
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Story</h2>
              <p className="text-gray-500 md:text-lg">
                edLern was founded in 2021 by a group of lifelong learners who were frustrated with the fragmented
                nature of online education. We saw that the most transformative learning experiences happened in
                communities, not just through passive content consumption.
              </p>
              <p className="text-gray-500 md:text-lg">
                We built edLern to be the destination for finding and joining the best digital communities and
                learning experiences. Our platform brings together creators, experts, and learners in a space designed
                for growth, connection, and transformation.
              </p>
              <p className="text-gray-500 md:text-lg">
                Today, we're proud to host hundreds of communities across diverse topics, connecting thousands of
                learners with the knowledge and people they need to achieve their goals.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                  <Users className="h-6 w-6 text-sky-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-3xl font-bold">50K+</h3>
                  <p className="text-sm text-gray-500">Active Members</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                  <Globe className="h-6 w-6 text-sky-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-3xl font-bold">500+</h3>
                  <p className="text-sm text-gray-500">Communities</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 bg-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100">
                  <Award className="h-6 w-6 text-sky-600" />
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-3xl font-bold">200+</h3>
                  <p className="text-sm text-gray-500">Expert Creators</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 bg-white">
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
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-3xl font-bold">$2M+</h3>
                  <p className="text-sm text-gray-500">Creator Earnings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet Our Team</h2>
              <p className="text-gray-500 md:text-lg">
                We're a diverse team of lifelong learners, community builders, and technology enthusiasts dedicated to
                making learning more connected and impactful.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Sarah Johnson" role="Co-Founder & CEO" />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Michael Chen" role="Co-Founder & CTO" />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Aisha Patel" role="Head of Community" />
              <TeamMember
                image="/placeholder.svg?height=300&width=300"
                name="David Rodriguez"
                role="Head of Creator Success"
              />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Emma Wilson" role="Head of Product" />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="James Taylor" role="Head of Marketing" />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Olivia Kim" role="Head of Design" />
              <TeamMember image="/placeholder.svg?height=300&width=300" name="Marcus Brown" role="Head of Operations" />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
              <p className="text-gray-500 md:text-lg">These core principles guide everything we do at edLern.</p>
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

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl bg-sky-600">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-4">
                    Join the edLern community
                  </h2>
                  <p className="text-white/80 mb-6">
                    Start your journey today and connect with the world's best digital communities and learning
                    experiences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-white text-sky-600 hover:bg-gray-100 w-fit">Explore Communities</Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 w-fit">
                      Become a Creator
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Community collage"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

function TeamMember({ image, name, role }: { image: string; name: string; role: string }) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative h-40 w-40 overflow-hidden rounded-full">
        <img src={image || "/placeholder.svg"} alt={name} className="object-cover" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
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
