"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Activity, Users, MessageSquare, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginSuccess } from "@/store/authSlice"
import { RootState } from "@/store/store"
import { SERVER_URL } from "../config/config"
import { toast } from "sonner"

// Community statistics data
const communityStats = [
  { label: "Active Members", values: [8426, 8427, 8429, 8432, 8436], icon: <Users className="h-5 w-5" /> },
  { label: "Online Now", values: [342, 339, 345, 351, 348], icon: <Activity className="h-5 w-5" /> },
  { label: "Daily Conversations", values: [1267, 1268, 1270, 1272, 1275], icon: <MessageSquare className="h-5 w-5" /> },
  { label: "Events This Month", values: [24, 25, 25, 26, 26], icon: <Star className="h-5 w-5" /> },
]

const testimonials = [
  {
    quote: "This community helped me connect with like-minded professionals and grow my network exponentially.",
    author: "Sarah Johnson",
    role: "Marketing Director",
  },
  {
    quote: "I found my co-founder through this platform. Best decision I ever made for my startup journey.",
    author: "Michael Chen",
    role: "Tech Entrepreneur",
  },
  {
    quote: "The events and resources here have been invaluable for my professional development.",
    author: "Priya Sharma",
    role: "UX Designer",
  },
  {
    quote: "Finally, a community platform that actually delivers on its promise to foster meaningful connections.",
    author: "James Wilson",
    role: "Community Manager",
  },
]

// API URLs
const API_BASE_URL = SERVER_URL
const SIGNUP_URL = `${API_BASE_URL}/api/v1/auth/signup/`
const LOGIN_URL = `${API_BASE_URL}/api/v1/auth/login/`
const GOOGLE_AUTH_URL = `${API_BASE_URL}/api/v1/auth/google/login/`

export default function AuthPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    return () => {
      // Cleanup logic if needed
    };
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  // Dynamic data state
  const [statIndex, setStatIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  // Update data at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((prevIndex) => (prevIndex + 1) % 5)
    }, 5000)

    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(testimonialInterval)
    }
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id in errors) {
      setFormData({
        ...formData,
        [id]: value
      })

      // Clear error when user starts typing
      setErrors({
        ...errors,
        [id]: ""
      })
    }
  }

  // Validate form data
  const validateForm = () => {
    const newErrors = { ...errors }
    let isValid = true

    // Reset errors
    Object.keys(newErrors).forEach(key => {
      newErrors[key as keyof typeof errors] = ""
    })

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Additional signup validations
    if (activeTab === "signup") {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "First name is required"
        isValid = false
      }

      if (!formData.last_name.trim()) {
        newErrors.last_name = "Last name is required"
        isValid = false
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        dispatch(loginSuccess(data.data))
        toast.success("Login Successful", {
          description: "You have successfully logged in. Redirecting to the dashboard...",
        })
        navigate("/")
      } else {
        toast.error("Login Failed", {
          description: data.message || "Please check your credentials and try again.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again later.",
      })
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signup
  const handleSignup = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Signup Successful", {
          description: data.message || "Please check your email for verification instructions.",
        })
        setActiveTab("login")
        setFormData({
          ...formData,
          first_name: "",
          last_name: "",
          password: "",
          confirmPassword: ""
        })
      } else {
        toast.error("Signup Failed", {
          description: data.message || "An error occurred during signup. Please try again.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again later.",
      })
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google authentication
  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      const redirectUri = "http://localhost:5173/domain/api/v1/auth/google/login-callback";
      const response = await fetch(`${GOOGLE_AUTH_URL}?redirect=${(redirectUri)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Redirect to the Google authentication URL
        window.location.href = data.data.url;
      } else {
        toast.error("Google Auth Failed", {
          description: data.message || "Failed to initiate Google authentication.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred during Google authentication.",
      })
      console.error("Google auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission
  interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }

  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Dynamic Community Data */}
      <div className="w-full md:w-1/2 bg-white relative overflow-hidden hidden lg:flex flex-col items-center justify-center p-6 md:p-12 shadow-md">
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Community Pulse</h2>
              <p className="text-gray-600">Live updates from our thriving community platform</p>
            </motion.div>
          </div>

          {/* Live statistics */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-gray-700 font-medium text-sm">{stat.label}</h3>
                  <div className="p-1.5 bg-sky-600 rounded-full text-gray-100 shadow-sm">{stat.icon}</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-end gap-2"
                  >
                    <span className="text-2xl font-bold text-gray-900">{stat.values[statIndex].toLocaleString()}</span>
                    <span className="text-sky-500 text-sm pb-0.5">+{Math.floor(Math.random() * 10)}</span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-sky-500 mr-2" />
              <h3 className="text-gray-800 font-medium">Member Spotlight</h3>
            </div>
            <div className="min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-600 italic mb-4">"{testimonials[testimonialIndex].quote}"</p>
                  <div>
                    <p className="text-gray-800 font-medium">{testimonials[testimonialIndex].author}</p>
                    <p className="text-gray-500 text-sm">{testimonials[testimonialIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 lg:p-20">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {activeTab === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-gray-500 mb-8">
              {activeTab === "login"
                ? "Enter your credentials to access your account"
                : "Fill in the form to create your account"}
            </p>

            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`pb-3 px-4 font-medium text-sm transition-colors ${activeTab === "login"
                  ? "text-gray-900 border-b-2 border-sky-500"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                disabled={isLoading}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`pb-3 px-4 font-medium text-sm transition-colors ${activeTab === "signup"
                  ? "text-gray-900 border-b-2 border-sky-500"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {activeTab === "signup" && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            id="first_name"
                            type="text"
                            placeholder="John"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className={`pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 ${errors.first_name ? "border-red-500" : ""
                              }`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            id="last_name"
                            type="text"
                            placeholder="Doe"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className={`pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 ${errors.last_name ? "border-red-500" : ""
                              }`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>}
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 ${errors.email ? "border-red-500" : ""
                          }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      {activeTab === "login" && (
                        <a href="#" className="text-sm text-sky-600 hover:text-sky-500">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 ${errors.password ? "border-red-500" : ""
                          }`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                  </div>

                  {activeTab === "signup" && (
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500 focus:ring-opacity-50 ${errors.confirmPassword ? "border-red-500" : ""
                            }`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {activeTab === "login" && (
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-white text-sky-600 focus:ring-sky-500 focus:ring-opacity-50"
                        disabled={isLoading}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-sky-500 to-sky-600 text-white py-6 rounded-md text-base font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : (
                      activeTab === "login" ? "Sign in" : "Create account"
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="bg-white gap-2 hover:bg-gray-50 py-2 px-4 rounded-md border border-gray-300 flex justify-center shadow-sm"
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-2">
                    {activeTab === "login" ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("signup")}
                          className="text-sky-600 hover:text-sky-500 font-medium"
                          disabled={isLoading}
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("login")}
                          className="text-sky-600 hover:text-sky-500 font-medium"
                          disabled={isLoading}
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}