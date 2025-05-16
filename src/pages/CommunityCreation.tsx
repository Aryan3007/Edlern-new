"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"

export default function CommunityCreation() {
  const [open, setOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [communityName, setCommunityName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 2 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Create Your Community",
      description: "Set up your community in minutes with customizable templates and branding options.",
      icon: <Users className="h-10 w-10 text-sky-600" />,
      color: "bg-sky-100",
      stats: "5 minutes setup",
    },
    {
      title: "Share Your Knowledge",
      description: "Upload courses, host live sessions, and engage with your audience through discussions.",
      icon: <Sparkles className="h-10 w-10 text-purple-600" />,
      color: "bg-purple-100",
      stats: "Unlimited content",
    },
    {
      title: "Grow Your Income",
      description: "Set subscription tiers, offer premium content, and track your earnings in real-time.",
      icon: <TrendingUp className="h-10 w-10 text-green-600" />,
      color: "bg-green-100",
      stats: "Average $5,400/month",
    },
  ]



  const handleStepClick = (index: number): void => {
    setActiveStep(index)
  }

  interface CreateCommunityResponse {
    detail?: string;
    data?: {
      community_id: string;
    };
  }

  const handleCreateCommunity = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!communityName.trim()) {
      setError("Please enter a community name");
      toast.error("Community name is required", {
        description: "Please provide a valid community name to proceed.",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    setError("");
    toast("Creating your community...", {
      description: "Please wait while we set up your community.",
      duration: 5000,
    });

    try {
      const response = await axios.post(
        'https://edlern.weepul.in.net/api/v1/community/',
        { name: communityName },
        {
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data: CreateCommunityResponse = response.data;

      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.detail || 'Failed to create community');
      }

      toast.success("Community created successfully!", {
        description: "Your community has been created. Redirecting to the success page...",
        duration: 5000,
      });

      const communityId = data?.data?.community_id;
      navigate(`/community-creation/successfull/${communityId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      toast.error("Failed to create community", {
        description: err instanceof Error ? err.message : "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <main className="h-screen w-full flex flex-col items-center justify-between bg-white overflow-hidden">
      <div className="container px-4 flex flex-col h-full justify-center">
        <div className="text-center my-6">
          <img className="h-12 mx-auto" src="/logo.png" alt="" />

          <h2 className="text-3xl font-bold text-gray-800 mt-4 tracking-tight">
            Build a community around your passion.
          </h2>
          <p className="text-xl text-gray-600 mt-2">Make money doing what you love.</p>
        </div>

        <motion.div
          className="relative w-full max-w-4xl mx-auto my-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Step Indicators */}
          <div className="flex justify-center mb-8">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                className={`flex items-center mx-2 sm:mx-4 group`}
                onClick={() => handleStepClick(index)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeStep === index ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 hidden sm:block transition-colors duration-300 ${
                    activeStep === index ? "text-sky-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {step.title.split(" ")[0]}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div className="relative h-[350px] overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-white to-sky-50">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 p-8 flex flex-col md:flex-row items-center transition-all duration-500 ${
                  activeStep === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeStep === index ? 1 : 0,
                  x: activeStep === index ? 0 : 100,
                  transition: { duration: 0.5 },
                }}
              >
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <motion.div
                    className={`inline-flex items-center justify-center p-4 rounded-2xl ${step.color} mb-4`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: activeStep === index ? 1 : 0.8,
                      opacity: activeStep === index ? 1 : 0,
                      transition: { delay: 0.2, duration: 0.4 },
                    }}
                  >
                    {step.icon}
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: activeStep === index ? 0 : 20,
                      opacity: activeStep === index ? 1 : 0,
                      transition: { delay: 0.3, duration: 0.4 },
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: activeStep === index ? 0 : 20,
                      opacity: activeStep === index ? 1 : 0,
                      transition: { delay: 0.4, duration: 0.4 },
                    }}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: activeStep === index ? 0 : 20,
                      opacity: activeStep === index ? 1 : 0,
                      transition: { delay: 0.5, duration: 0.4 },
                    }}
                  >
                    <Badge className="bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 px-3 py-1.5">
                      {step.stats}
                    </Badge>
                  </motion.div>
                </div>

                <motion.div
                  className="md:w-1/2 flex items-center justify-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: activeStep === index ? 1 : 0.9,
                    opacity: activeStep === index ? 1 : 0,
                    transition: { delay: 0.3, duration: 0.5 },
                  }}
                >
                  <div
                    className={`relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-lg ${step.color}`}
                  >
                    <img
                      src={`/placeholder.svg?text=Step ${index + 1}&fontsize=32&bg=${step.color.replace("bg-", "")}&textcolor=white`}
                      alt={step.title}
                      
                      className="object-cover h-full w-full transition-transform duration-500 transform hover:scale-105"
                      style={{ filter: "blur(0px)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center p-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                        <p className="font-medium text-gray-800">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

       
        </motion.div>

        <motion.div
          className="flex justify-center mt-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => setOpen(true)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-8 py-6 text-lg rounded-lg shadow-lg transition-all group"
          >
            CREATE YOUR COMMUNITY
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6">
            <DialogHeader className="pb-2">
              <div className="text-center mb-2">
                <img className="h-12 mx-auto" src="/logo.png" alt="" />
              </div>
              <DialogTitle className="text-center text-xl font-bold tracking-tight">Create your community</DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                14-day free trial, then $99/month. Cancel anytime.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form onSubmit={handleCreateCommunity} className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="group-name" className="text-sm font-medium">
                Community name
              </Label>
              <Input
                id="group-name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Enter your group name"
                className="h-11 rounded-lg border-gray-200 focus:border-sky-500 focus:ring-sky-500"
              />
              <p className="text-xs text-gray-500 flex justify-between">
                <span>You can change this later</span>
                <span>{communityName.length} / 30</span>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number" className="text-sm font-medium">
                Card number
              </Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="Card number"
                  className="pl-10 h-11 rounded-lg border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                  disabled // Disabled as per requirement to only use community name
                />
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute right-1 top-1 h-9 bg-white text-sky-600 hover:text-sky-700 hover:bg-gray-50 font-medium"
                  disabled
                >
                  Autofill
                </Button>
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <Button 
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 h-11 rounded-lg font-medium transition-all hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "CREATING..." : "START FREE TRIAL"}
            </Button>
            
            <p className="text-xs mt-4 text-gray-500 text-center">
              1st charge will be on May 18, 2025 for $99. We'll email you 3-days before to remind you. You can cancel
              anytime with 1-click.{" "}
              <a href="#" className="text-sky-600 hover:underline font-medium">
                Terms
              </a>
              .
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}