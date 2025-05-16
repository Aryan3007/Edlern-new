"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, ChevronLeft, ChevronRight, Globe, ImageIcon, Upload, Users } from "lucide-react"

// Interfaces for API data
interface Category {
  id: number
  name: string
  description: string
  image: string | null
  is_active: boolean
  is_deleted: boolean
  parent_category: number | null
}

interface CategoriesResponse {
  message: string
  success: boolean
  data: {
    next: string | null
    previous: string | null
    count: number
    limit: number
    current_page: number
    total_pages: number
    results: Category[]
  }
}

interface CommunityFormValues {
  basicInfo: {
    name: string
    description: string
    category: string // Stores category ID as string
  }
  settings: {
    privacy: "public" | "private"
    memberApproval: boolean
    allowInvitations: boolean
    contentCreation: "1" | "2" | "3" | "4"
    commentPermission: "1" | "2" | "3" | "4"
    directMessages: "1" | "2" | "3" | "4"
  }
  branding: {
    logo?: File | null
    banner?: File | null
  }
}

// Access level choices
const ACCESS_LEVELS = [
  { value: "1", label: "All Members" },
  { value: "2", label: "Level 3+ Members" },
  { value: "3", label: "Level 5+ Members" },
  { value: "4", label: "Admin Only" },
]

export default function CreateCommunityPage() {
  const navigate = useNavigate()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CommunityFormValues>({
    basicInfo: {
      name: "",
      description: "",
      category: "",
    },
    settings: {
      privacy: "public",
      memberApproval: false,
      allowInvitations: true,
      contentCreation: "1",
      commentPermission: "1",
      directMessages: "1",
    },
    branding: {
      logo: null,
      banner: null,
    },
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const response = await fetch("https://edlern.toolsfactory.tech/api/v1/community/categories/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data: CategoriesResponse = await response.json()
        if (!data.success) {
          throw new Error(data.message)
        }
        setCategories(data.data.results)
        setCategoriesError(null)
      } catch (err) {
        setCategoriesError(err instanceof Error ? err.message : "Failed to fetch categories")
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  // Handle input changes
  const handleInputChange = <T extends keyof CommunityFormValues>(
    section: T,
    field: keyof CommunityFormValues[T],
    value: CommunityFormValues[T][typeof field]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  // Handle file uploads
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setLogoPreview(url)
      handleInputChange("branding", "logo", file)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setBannerPreview(url)
      handleInputChange("branding", "banner", file)
    }
  }

  // Navigation
  const goToNextStep = () => {
    setDirection("next")
    setStep((prevStep) => Math.min(prevStep + 1, 4))
  }

  const goToPrevStep = () => {
    setDirection("prev")
    setStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  // Form submissions
  const onBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.basicInfo.name || !formData.basicInfo.description || !formData.basicInfo.category) {
      setSubmitError("Please fill all required fields")
      return
    }
    setSubmitError(null)
    goToNextStep()
  }

  const onSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    goToNextStep()
  }

  const onBrandingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    goToNextStep()
  }

  const onFinalSubmit = async () => {
    if (!accessToken) {
      setSubmitError("Authentication token is missing")
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.basicInfo.name)
    formDataToSend.append("description", formData.basicInfo.description)
    formDataToSend.append("category", formData.basicInfo.category)
    formDataToSend.append("community_type", formData.settings.privacy)
    formDataToSend.append("require_approval", String(formData.settings.memberApproval))
    formDataToSend.append("allow_invitations", String(formData.settings.allowInvitations))
    formDataToSend.append("post_creation_access_level", formData.settings.contentCreation)
    formDataToSend.append("comment_creation_access_level", formData.settings.commentPermission)
    formDataToSend.append("direct_message_access_level", formData.settings.directMessages)
    if (formData.branding.logo) {
      formDataToSend.append("community_logo", formData.branding.logo)
    }
    if (formData.branding.banner) {
      formDataToSend.append("banner_image", formData.branding.banner)
    }

    try {
      const response = await fetch("https://edlern.toolsfactory.tech/api/v1/community/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      navigate("/community-creation/successfull")
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to create community")
    } finally {
      setSubmitting(false)
    }
  }

  // Animation variants
  const contentVariants = {
    enter: (direction: string) => ({
      x: direction === "next" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "next" ? -50 : 50,
      opacity: 0,
    }),
  }

  const getInitials = (name: string) => {
    return (
      name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "CC"
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 lg:bg-center lg:bg-no-repeat lg:bg-cover lg:bg-[url('/ttten.svg')]">
      <div className="w-full max-w-5xl h-full lg:h-[90vh] overflow-y-auto flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl bg-white">
        {/* Left Sidebar */}
        <div className="w-full md:w-72 bg-gradient-to-br from-sky-600 to-sky-700 text-white p-6 md:p-8 relative">
          <div className="space-y-8">
            <h2 className="text-xl font-bold">Create Community</h2>
            <div className="space-y-6">
              {[
                { number: 1, title: "BASIC INFO" },
                { number: 2, title: "SETTINGS" },
                { number: 3, title: "BRANDING" },
                { number: 4, title: "REVIEW" },
              ].map((item) => (
                <div key={item.number} className="flex items-center gap-3">
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step === item.number
                        ? "bg-white text-sky-600"
                        : step > item.number
                        ? "bg-sky-400 text-white"
                        : "bg-sky-800 text-white"
                    } font-bold text-sm`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {step > item.number ? <CheckCircle2 className="w-5 h-5" /> : item.number}
                  </motion.div>
                  <div className={`text-sm font-medium ${step === item.number ? "text-white" : "text-sky-200"}`}>
                    STEP {item.number}
                    <div className="font-bold">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 md:p-6 flex-1 overflow-auto" style={{ height: "600px" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                className="h-full"
              >
                {step === 1 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Basic Information</h2>
                      <p className="text-slate-500 mb-6">Please provide details about your community.</p>
                    </div>
                    {categoriesError && (
                      <div className="text-red-600 text-sm mb-4">{categoriesError}</div>
                    )}
                    <form id="basic-info-form" onSubmit={onBasicInfoSubmit} className="space-y-6 flex-1">
                      <div className="space-y-4">
                        <div className="group">
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Community Name
                          </label>
                          <Input
                            id="name"
                            placeholder="e.g., Adonis Gang"
                            value={formData.basicInfo.name}
                            onChange={(e) => handleInputChange("basicInfo", "name", e.target.value)}
                            className="w-full p-3 rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            This is how your community will appear across the platform
                          </p>
                        </div>

                        <div className="group">
                          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Description
                          </label>
                          <Textarea
                            id="description"
                            placeholder="Tell potential members what your community is about"
                            className="min-h-[100px] border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all"
                            value={formData.basicInfo.description}
                            onChange={(e) => handleInputChange("basicInfo", "description", e.target.value)}
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">Briefly describe your community's purpose and values</p>
                        </div>

                        <div className="group">
                          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                            Category
                          </label>
                          <Select
                            onValueChange={(value) => handleInputChange("basicInfo", "category", value)}
                            value={formData.basicInfo.category}
                            disabled={loadingCategories || !!categoriesError}
                          >
                            <SelectTrigger className="border-slate-300 focus:border-sky-500 focus:ring-sky-500 transition-all">
                              <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select a category"} />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-slate-500 mt-1">Categorizing your community helps with discovery</p>
                        </div>
                      </div>
                      {submitError && (
                        <div className="text-red-600 text-sm">{submitError}</div>
                      )}
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Community Settings</h2>
                      <p className="text-slate-500 mb-6">Configure privacy and access settings for your community.</p>
                    </div>
                    <form id="settings-form" onSubmit={onSettingsSubmit} className="space-y-6 flex-1">
                      <div className="space-y-6">
                        <div className="group">
                          <label className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Privacy Level
                          </label>
                          <RadioGroup
                            onValueChange={(value) => handleInputChange("settings", "privacy", value as "public" | "private")}
                            value={formData.settings.privacy}
                            className="grid grid-col-1 lg:grid-cols-2 space-y-3"
                          >
                            <motion.div
                              className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:border-sky-300 h-full hover:bg-sky-50 transition-colors"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RadioGroupItem value="public" id="privacy-public" />
                              <label htmlFor="privacy-public" className="space-y-1 cursor-pointer w-full">
                                <div className="flex items-center">
                                  <Globe className="mr-2 h-4 w-4 text-sky-600" />
                                  <span className="text-sm font-medium leading-none">Public</span>
                                </div>
                                <p className="text-xs text-slate-500">Anyone can find and join your community</p>
                              </label>
                            </motion.div>

                            <motion.div
                              className="flex items-center space-x-3 space-y-0 border p-3 rounded-md hover:border-sky-300 h-full hover:bg-sky-50 transition-colors"
                              whileHover={{ scale: 1.01 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <RadioGroupItem value="private" id="privacy-private" />
                              <label htmlFor="privacy-private" className="space-y-1 cursor-pointer w-full">
                                <div className="flex items=center">
                                  <Users className="mr-2 h-4 w-4 text-sky-600" />
                                  <span className="text-sm font-medium leading-none">Private</span>
                                </div>
                                <p className="text-xs text-slate-500">
                                  Anyone can find your community, but only approved members can join
                                </p>
                              </label>
                            </motion.div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4">
                          <motion.div
                            className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className="space-y-0.5">
                              <label htmlFor="memberApproval" className="text-sm font-medium text-slate-700">
                                Require Approval
                              </label>
                              <p className="text-xs text-slate-500">Manually approve new members before they can join</p>
                            </div>
                            <Switch
                              id="memberApproval"
                              checked={formData.settings.memberApproval}
                              onCheckedChange={(checked) => handleInputChange("settings", "memberApproval", checked)}
                              className="data-[state=checked]:bg-sky-600"
                            />
                          </motion.div>

                          <motion.div
                            className="flex flex-row items-center justify-between rounded-lg border p-4 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className="space-y-0.5">
                              <label htmlFor="allowInvitations" className="text-sm font-medium text-slate-700">
                                Allow Invitations
                              </label>
                              <p className="text-xs text-slate-500">Let members invite others to join the community</p>
                            </div>
                            <Switch
                              id="allowInvitations"
                              checked={formData.settings.allowInvitations}
                              onCheckedChange={(checked) => handleInputChange("settings", "allowInvitations", checked)}
                              className="data-[state=checked]:bg-sky-600"
                            />
                          </motion.div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-slate-800 mb-3">Content Permissions</h3>
                          <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1">
                            <div className="group w-full">
                              <label htmlFor="contentCreation" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can create posts
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "contentCreation", value as "1" | "2" | "3" | "4")}
                                value={formData.settings.contentCreation}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ACCESS_LEVELS.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="group w-full">
                              <label htmlFor="commentPermission" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can comment
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "commentPermission", value as "1" | "2" | "3" | "4")}
                                value={formData.settings.commentPermission}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ACCESS_LEVELS.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="group w-full">
                              <label htmlFor="directMessages" className="block text-sm font-medium text-slate-700 mb-1 group-hover:text-sky-600 transition-colors">
                                Who can send direct messages
                              </label>
                              <Select
                                onValueChange={(value) => handleInputChange("settings", "directMessages", value as "1" | "2" | "3" | "4")}
                                value={formData.settings.directMessages}
                              >
                                <SelectTrigger className="border-slate-300 w-full focus:border-sky-500 focus:ring-sky-500 transition-all">
                                  <SelectValue placeholder="Select permission" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ACCESS_LEVELS.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      {submitError && (
                        <div className="text-red-600 text-sm">{submitError}</div>
                      )}
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Branding</h2>
                      <p className="text-slate-500 mb-6">Customize the look and feel of your community.</p>
                    </div>
                    <form id="branding-form" onSubmit={onBrandingSubmit} className="space-y-6 flex-1">
                      <div className="space-y-6">
                        <div className="group">
                          <label htmlFor="logo" className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Community Logo
                          </label>
                          <div className="flex items-center space-x-4">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                              <Avatar className="w-16 h-16 border-2 border-sky-100">
                                {logoPreview ? (
                                  <AvatarImage src={logoPreview} alt="Community Logo" />
                                ) : (
                                  <AvatarFallback className="bg-sky-100 text-sky-600">
                                    {getInitials(formData.basicInfo.name || "")}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                            </motion.div>
                            <motion.label
                              htmlFor="logo-upload"
                              className="cursor-pointer bg-sky-50 px-4 py-2 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-100 transition-colors flex items-center"
                              whileHover={{ scale: 1.03 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <span>Upload Logo</span>
                              <Upload className="ml-2 h-4 w-4 inline" />
                              <Input
                                id="logo-upload"
                                type="file"
                                className="hidden"
                                onChange={handleLogoUpload}
                                accept="image/*"
                              />
                            </motion.label>
                            {logoPreview && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setLogoPreview(null)
                                  handleInputChange("branding", "logo", null)
                                }}
                                className="text-sky-600"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Recommended size: 192x192 pixels</p>
                        </div>

                        <div className="group">
                          <label htmlFor="banner" className="block text-sm font-medium text-slate-700 mb-3 group-hover:text-sky-600 transition-colors">
                            Community Banner (Optional)
                          </label>
                          <motion.div
                            className="relative w-full overflow-hidden rounded-md aspect-video bg-sky-50 border-2 h-44 border-dashed border-sky-200"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {bannerPreview ? (
                              <img
                                src={bannerPreview}
                                alt="Community Banner Preview"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-sky-400">
                                <ImageIcon className="h-6 w-6" />
                                <span className="ml-2 text-sm">No banner uploaded</span>
                              </div>
                            )}
                          </motion.div>
                          <div className="mt-3 flex items-center gap-3">
                            <motion.label
                              htmlFor="banner-upload"
                              className="cursor-pointer bg-sky-50 px-4 py-2 rounded-md text-sm font-medium text-sky-600 hover:bg-sky-100 transition-colors flex items-center"
                              whileHover={{ scale: 1.03 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <span>Upload Banner</span>
                              <Upload className="ml-2 h-4 w-4 inline" />
                              <Input
                                id="banner-upload"
                                type="file"
                                className="hidden"
                                onChange={handleBannerUpload}
                                accept="image/*"
                              />
                            </motion.label>
                            {bannerPreview && (
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setBannerPreview(null)
                                  handleInputChange("branding", "banner", null)
                                }}
                                className="text-sky-600"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Recommended size: 1200x300 pixels</p>
                        </div>
                      </div>
                      {submitError && (
                        <div className="text-red-600 text-sm">{submitError}</div>
                      )}
                    </form>
                  </div>
                )}

                {step === 4 && (
                  <div className="h-full flex flex-col">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Review & Submit</h2>
                      <p className="text-slate-500 mb-6">Review all the details before creating your community.</p>
                    </div>
                    <div className="space-y-6 overflow-auto flex-1 pr-2">
                      <motion.div
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Basic Information</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Name:</span> {formData.basicInfo.name}
                          </p>
                          <p>
                            <span className="font-semibold">Description:</span> {formData.basicInfo.description}
                          </p>
                          <p>
                            <span className="font-semibold">Category:</span>{" "}
                            {categories.find((cat) => String(cat.id) === formData.basicInfo.category)?.name || "Not selected"}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Settings</h3>
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Privacy:</span> {formData.settings.privacy}
                          </p>
                          <p>
                            <span className="font-semibold">Require Approval:</span>{" "}
                            {formData.settings.memberApproval ? "Yes" : "No"}
                          </p>
                          <p>
                            <span className="font-semibold">Allow Invitations:</span>{" "}
                            {formData.settings.allowInvitations ? "Yes" : "No"}
                          </p>
                          <p>
                            <span className="font-semibold">Content Creation:</span>{" "}
                            {ACCESS_LEVELS.find((level) => level.value === formData.settings.contentCreation)?.label}
                          </p>
                          <p>
                            <span className="font-semibold">Comment Permission:</span>{" "}
                            {ACCESS_LEVELS.find((level) => level.value === formData.settings.commentPermission)?.label}
                          </p>
                          <p>
                            <span className="font-semibold">Direct Messages:</span>{" "}
                            {ACCESS_LEVELS.find((level) => level.value === formData.settings.directMessages)?.label}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-sky-50 p-4 rounded-lg border border-sky-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg font-medium text-slate-800 mb-3">Branding</h3>
                        <div className="space-y-2">
                          {formData.branding.logo && (
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">Logo:</span>
                              <Avatar>
                                <AvatarImage src={logoPreview || "/placeholder.svg"} alt="Community Logo" />
                              </Avatar>
                            </div>
                          )}
                          {formData.branding.banner && <p className="font-semibold">Banner: Uploaded</p>}
                        </div>
                      </motion.div>
                    </div>
                    {submitError && (
                      <div className="text-red-600 text-sm mt-4">{submitError}</div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer with buttons */}
          <div className="p-6 border-t border-slate-200 flex justify-between items-center bg-white">
            {step > 1 ? (
              <Button
                onClick={goToPrevStep}
                variant="outline"
                className="flex items-center gap-1 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                Cancel
              </Button>
            )}

            {step < 4 ? (
              <Button
                onClick={goToNextStep}
                type="submit"
                form={
                  step === 1 ? "basic-info-form" : step === 2 ? "settings-form" : "branding-form"
                }
                className="bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1 transition-colors"
                disabled={loadingCategories || submitting}
              >
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <motion.button
                onClick={onFinalSubmit}
                className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loadingCategories || submitting}
              >
                {submitting ? "Creating..." : "Create Community"}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}