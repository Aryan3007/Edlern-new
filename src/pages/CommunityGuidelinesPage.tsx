import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, Shield } from "lucide-react"
import Footer from "@/section/footer"
import Navbar from "@/components/Navbar"
import { useEffect } from "react";

export default function CommunityGuidelinesPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="flex bg-white text-black min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-white flex items-center mt-12 py-16 md:py-24">
            <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
                <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                    Welcome to edLern
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
                    edLern is your gateway to vibrant communities, meaningful connections, and shared knowledge. Join us in building a safe and inclusive space for everyone.
                </p>
                </div>
                <div className="space-x-4">
                <Button className="bg-sky-600 rounded-full hover:bg-sky-700 px-6 py-3">
                    Join the Community
                </Button>
                <Button variant="outline" className="px-6 rounded-full py-3">
                    Learn More
                </Button>
                </div>
            </div>
            </div>
        </section>

        {/* Introduction */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-7xl space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Introduction</h2>
                <p className="text-gray-500">
                  At edLern, we believe that digital communities thrive when members feel safe, respected, and
                  empowered to share ideas and connect with others. These Community Guidelines outline the behaviors and
                  content that are encouraged and prohibited on our platform.
                </p>
                <p className="text-gray-500">
                  By joining edLern, you agree to follow these guidelines in all interactions, content creation, and
                  community participation. These guidelines apply to all users, including community members, creators,
                  and administrators.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Our Core Principles</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <CheckCircle className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Respect and Inclusivity</h3>
                      <p className="text-gray-500">
                        Treat all community members with respect, regardless of background, identity, or beliefs.
                        edLern is committed to fostering inclusive environments where everyone feels welcome.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <CheckCircle className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Authenticity and Honesty</h3>
                      <p className="text-gray-500">
                        Be genuine in your interactions and content. Misrepresentation, false information, and deceptive
                        practices harm the community and violate our guidelines.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <CheckCircle className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Safety and Privacy</h3>
                      <p className="text-gray-500">
                        Protect your own privacy and respect the privacy of others. Do not share personal information
                        without consent or engage in behaviors that compromise anyone's safety.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <CheckCircle className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Constructive Communication</h3>
                      <p className="text-gray-500">
                        Engage in thoughtful, constructive discussions. Disagreements are natural, but they should be
                        expressed respectfully and with the goal of mutual understanding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Prohibited Content and Behavior</h2>
                <p className="text-gray-500">
                  The following content and behaviors are prohibited on edLern and may result in content removal,
                  account suspension, or permanent ban:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Harassment and Bullying</h3>
                      <p className="text-gray-500">
                        Any form of harassment, bullying, intimidation, or behavior that creates a hostile environment
                        for others. This includes targeted insults, threats, and persistent unwanted contact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Hate Speech</h3>
                      <p className="text-gray-500">
                        Content that promotes hatred, violence, or discrimination against individuals or groups based on
                        attributes such as race, ethnicity, religion, gender, sexual orientation, disability, or
                        nationality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Explicit or Harmful Content</h3>
                      <p className="text-gray-500">
                        Sexually explicit content, graphic violence, content that promotes self-harm, suicide, or
                        dangerous activities that could lead to physical harm.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Misinformation and Scams</h3>
                      <p className="text-gray-500">
                        Deliberately false or misleading information, scams, phishing attempts, or content designed to
                        deceive others for personal gain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Intellectual Property Violations</h3>
                      <p className="text-gray-500">
                        Unauthorized sharing of copyrighted material, plagiarism, or any content that infringes on
                        others' intellectual property rights.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Spam and Excessive Promotion</h3>
                      <p className="text-gray-500">
                        Unsolicited advertising, excessive self-promotion, or any content that disrupts the community
                        experience through repetitive or irrelevant posting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Guidelines for Creators</h2>
                <p className="text-gray-500">
                  Community creators and administrators have additional responsibilities to ensure their communities are
                  safe, welcoming, and valuable for members:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <Shield className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Clear Community Rules</h3>
                      <p className="text-gray-500">
                        Establish clear, specific rules for your community that align with these platform-wide
                        guidelines. Make these rules easily accessible to all members.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <Shield className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Consistent Moderation</h3>
                      <p className="text-gray-500">
                        Moderate content and behavior consistently according to your community rules. Apply rules fairly
                        and without discrimination.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <Shield className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Transparent Communication</h3>
                      <p className="text-gray-500">
                        Communicate clearly with your community about expectations, changes to rules or policies, and
                        moderation decisions when appropriate.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100">
                      <Shield className="h-5 w-5 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Value Delivery</h3>
                      <p className="text-gray-500">
                        Deliver the value promised to your community members. Be transparent about what members can
                        expect from your community and strive to meet those expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Enforcement and Reporting</h2>
                <p className="text-gray-500">
                  edLern takes violations of these guidelines seriously. We use a combination of automated systems,
                  human review, and community reporting to identify and address violations.
                </p>
                <p className="text-gray-500">
                  If you encounter content or behavior that violates these guidelines, please report it using the
                  reporting tools available on the platform. Reports are confidential, and we appreciate your help in
                  keeping our communities safe and welcoming.
                </p>
                <p className="text-gray-500">
                  Enforcement actions may include content removal, warnings, temporary suspension, or permanent banning,
                  depending on the severity and frequency of violations.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Changes to These Guidelines</h2>
                <p className="text-gray-500">
                  These guidelines may be updated periodically to address new challenges, incorporate feedback, or
                  reflect changes in our policies. We will notify users of significant changes through platform
                  announcements and direct communication when appropriate.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
                <p className="text-gray-500">
                  If you have questions about these guidelines or need to report a violation that cannot be addressed
                  through our standard reporting tools, please contact our Trust & Safety team at
                  safety@discoverplus.com.
                </p>
              </div>

              <div className="border-t pt-6 text-center">
                <p className="text-gray-500 mb-4">
                  By using edLern, you agree to follow these Community Guidelines. Thank you for helping us create a
                  positive and enriching environment for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-sky-600 hover:bg-sky-700">Report a Violation</Button>
                  <Button variant="outline">Contact Trust & Safety</Button>
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
