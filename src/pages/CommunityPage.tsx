import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/section/footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Assuming shadcn/ui dialog component
import { Input } from "@/components/ui/input";

interface Community {
  id: number;
  logo?: string;
  logoText?: string;
  banner_image: string | null;
  title: string;
  author: string;
  price: string;
  bgColor?: string;
  category: string | null;
  description: string;
  features: string[];
  profile_picture?: string | null;
  bio?: string;
  user_membership_status: string | null;
  ask_joining_questions: boolean; // Added for joining questions
  joining_questions: { id: number; question: string }[]; // Added for joining questions
}

interface JoinAnswer {
  question: number;
  answer_text: string;
}

export default function CommunityPage() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // State for popup
  const [joinAnswers, setJoinAnswers] = useState<JoinAnswer[]>([]); // State for answers
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCommunity = async () => {
        try {
          const response = await fetch(
            `https://edlern.toolsfactory.tech/api/v1/community/client/community-detail-page-data/${id}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken || ""}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Unauthorized: Please log in to view community details");
            }
            throw new Error("Failed to fetch community details");
          }
          const result = await response.json();
          if (result.data) {
            const communityData = result.data.community_data;
            const pricingData = result.data.pricing_data;
            setCommunity({
              id: communityData.id,
              logo: communityData.community_logo || "/placeholder.svg",
              logoText: communityData.name,
              banner_image: communityData.banner_image || "/placeholder.svg",
              title: communityData.name,
              author: result.data.creator_name,
              price: result.data.is_free
                ? "FREE"
                : `$${pricingData.pricings[0]?.price || "0.00"} / ${pricingData.pricings[0]?.billing_cycle || "month"}`,
              bgColor: communityData.theme_color || "bg-gray-900",
              category: communityData.category || "General",
              description: communityData.description,
              features: communityData.features || [],
              profile_picture: result.data.profile_picture || "/placeholder.svg?height=100&width=100",
              bio: result.data.bio || `Expert in ${communityData.category || "community engagement"} with years of experience helping people achieve their goals.`,
              user_membership_status: result.data.user_membership_status,
              ask_joining_questions: result.data.ask_joining_questions, // Added
              joining_questions: result.data.joining_questions || [], // Added
            });
            // Initialize answers for joining questions
            setJoinAnswers(
              (result.data.joining_questions || []).map((q: { id: number; question: string }) => ({
                question: q.id,
                answer_text: "",
              }))
            );
          } else {
            throw new Error(result.message || "API request failed");
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchCommunity();
    }
  }, [id, accessToken]);

  const handleJoinRequest = async () => {
    if (!community || !accessToken) {
      setError("Please log in to join the community");
      return;
    }

    try {
      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/community/${community.id}/free-community-join-request/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(community.ask_joining_questions ? joinAnswers : []),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token");
        }
        throw new Error("Failed to send join request");
      }

      const result = await response.json();
      if (result.success) {
        // Update membership status to reflect the request
        setCommunity({
          ...community,
          user_membership_status: community.ask_joining_questions ? "pending" : "member",
        });
        if (community.ask_joining_questions) {
          setIsJoinModalOpen(false); // Close modal after successful submission
        }
      } else {
        throw new Error(result.message || "Failed to join community");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while joining");
      }
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setJoinAnswers((prev) =>
      prev.map((item) =>
        item.question === questionId ? { ...item, answer_text: answer } : item
      )
    );
  };

  const handleJoinClick = () => {
    if (community?.ask_joining_questions) {
      setIsJoinModalOpen(true); // Open popup for joining questions
    } else {
      handleJoinRequest(); // Send join request directly
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">Loading community details...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">{error || "Community not found"}</h2>
              <Link to="/discover" className="text-sky-600 hover:underline flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Discover
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Determine button text based on user_membership_status
  let buttonText = "Join Now";
  if (community.user_membership_status === "member") {
    buttonText = "Already Joined";
  } else if (community.user_membership_status === "pending") {
    buttonText = "Requested";
  } else if (community.user_membership_status === "rejected") {
    buttonText = "Rejected";
  }

  return (
    <>
      <Header />
      <div className="flex bg-white text-black min-h-screen flex-col">
        <main className="flex-1 max-w-7xl mx-auto overflow-hidden mt-4 lg:mt-6">
          <div className={`relative w-full overflow-hidden rounded-2xl h-64 md:h-96 ${community.bgColor}`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="container max-w-7xl mx-auto relative h-full flex flex-col justify-end px-4 py-8 md:px-6">
              <Link to="/discover" className="text-white mb-4 hover:underline flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Discover
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={community.logo}
                  alt={community.logoText || community.title}
                  width={50}
                  height={50}
                  className="h-10 w-auto object-contain bg-white p-1 rounded-md"
                />
                <span className="text-white text-sm px-3 py-1 bg-sky-600 rounded-full">{community.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{community.title}</h1>
              <p className="text-white/80">By {community.author}</p>
            </div>
          </div>

          <div className="container px-4 py-12 md:px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About this community</h2>
                  <p className="text-gray-700">{community.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">What you'll get</h2>
                  <ul className="space-y-3">
                    {community.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Meet your host</h2>
                  <div className="flex items-start gap-4">
                    <img
                      src={community.profile_picture ?? "/placeholder.svg"}
                      alt={community.author}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{community.author}</h3>
                      <p className="text-gray-700">{community.bio}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 bg-white rounded-xl border p-6 shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">{community.price}</h3>
                    <p className="text-gray-500 text-sm">Join today and transform your life</p>
                  </div>
                  <Button
                    className="w-full bg-sky-600 hover:bg-sky-700 mb-4"
                    disabled={community.user_membership_status === "member" || community.user_membership_status === "pending" || community.user_membership_status === "rejected"}
                    onClick={handleJoinClick}
                  >
                    {buttonText}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By joining, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Joining Questions Popup */}
      <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Join {community?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {community?.joining_questions.map((question) => (
              <div key={question.id} className="space-y-4">
                <label className="text-sm py-2 font-medium">{question.question}</label>
                <Input
                  value={joinAnswers.find((a) => a.question === question.id)?.answer_text || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Your answer"
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsJoinModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleJoinRequest}
              disabled={joinAnswers.some((a) => !a.answer_text.trim())} // Disable if any answer is empty
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
