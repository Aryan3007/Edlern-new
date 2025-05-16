"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Calendar, Play, X, ShoppingCart, Heart, Share2, Star, Check, MessageSquare, Info } from "lucide-react"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import Navbar from "@/components/Navbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SellerInfo {
  first_name: string
  last_name: string
  email: string
  profile_picture: string
}

interface DigitalProduct {
  id: number
  seller_info: SellerInfo
  created_at: string
  updated_at: string
  title: string
  description: string
  file: string
  preview_file: string
  thumbnail: string
  price: string
  protection_grade: string
  is_locked: boolean
  is_active: boolean
  is_deleted: boolean
  seller: string
}

// Mock data for the product details that would normally come from the API
const mockProductDetails = {
  fileSize: "245 MB",
  fileFormat: "PDF, MP4, ZIP",
  lastUpdate: "2 weeks ago",
  language: "English",
  requirements: ["Modern web browser", "PDF reader", "Video player"],
  features: [
    "Comprehensive course materials",
    "Lifetime access",
    "Certificate of completion",
    "24/7 support",
    "Mobile-friendly content",
  ],
  faqs: [
    {
      question: "How long do I have access to this product?",
      answer: "You will have lifetime access to this product after purchase.",
    },
    {
      question: "Can I download the content for offline use?",
      answer: "Yes, all materials can be downloaded for offline viewing.",
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with the product.",
    },
    {
      question: "How do I access the content after purchase?",
      answer:
        "After purchase, you'll receive immediate access to download the files or access the online course platform.",
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-05-15",
      comment:
        "Excellent resource! The content is well-structured and easy to follow. I've learned so much in just a few days.",
    },
    {
      id: 2,
      user: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-04-22",
      comment:
        "Very comprehensive material. The only reason I'm not giving 5 stars is because I wish there were more practical examples.",
    },
    {
      id: 3,
      user: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-03-10",
      comment:
        "Worth every penny! The instructor is knowledgeable and explains complex concepts in an easy-to-understand way.",
    },
  ],
}

export default function DigitalProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<DigitalProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewContent, setPreviewContent] = useState<string>("")
  const [isVideo, setIsVideo] = useState<boolean>(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // Headers with Bearer token
  const getAuthHeaders = (isFormData = false) => {
    const headers: HeadersInit = {}
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }
    if (!isFormData) {
      headers["Content-Type"] = "application/json"
    }
    return headers
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`https://edlern.toolsfactory.tech/api/v1/digital-product/${id}`, {
          headers: getAuthHeaders(),
        })
        setProduct(response.data.data)
      } catch (err) {
        setError("Failed to fetch product details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }, [])

  const handlePreview = useCallback((product: DigitalProduct) => {
    if (product.preview_file && product.preview_file.endsWith(".mp4")) {
      setPreviewContent(product.preview_file)
      setIsVideo(true)
    } else {
      setPreviewContent(product.thumbnail)
      setIsVideo(false)
    }
    setPreviewOpen(true)
  }, [])

  const closePreview = () => {
    setPreviewOpen(false)
    setPreviewContent("")
    setIsVideo(false)
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-[200px] w-full rounded-md" />
                  <Skeleton className="h-8 w-1/3 mt-4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                  <div className="flex flex-col gap-3 mt-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                  <div>
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/2 mt-1" />
                    <Skeleton className="h-4 w-1/3 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 pb-12">
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <div className="text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Error: {error}</h2>
            <p className="text-gray-600 mb-4">We couldn't load the product details. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        </div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 pb-12">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Product not found</h2>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 pb-12">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <a href="/digital-products" className="hover:text-gray-900">
                Digital Products
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Thumbnail, Price, Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={product.thumbnail || "/placeholder.svg?height=300&width=500"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.preview_file && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-14 w-14"
                      onClick={() => handlePreview(product)}
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  )}
                </div>
                {product.is_locked && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-amber-600 text-white">
                    <Lock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold">${Number.parseFloat(product.price).toFixed(2)}</span>
                    {Number.parseFloat(product.price) > 50 && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm line-through text-gray-500 mr-2">
                          ${(Number.parseFloat(product.price) * 1.2).toFixed(2)}
                        </span>
                        <Badge variant="outline" className="bg-green-600/10 text-green-600">
                          Save 20%
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400" fill={star <= 4 ? "currentColor" : "none"} />
                    ))}
                    <span className="ml-2 text-sm font-medium">4.0</span>
                    <span className="ml-1 text-sm text-gray-500">(24)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Instant digital delivery</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {product.is_locked ? "Unlock Now" : "Buy Now"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => handlePreview(product)}
                    disabled={!product.preview_file && !product.thumbnail}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Preview
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={toggleWishlist}>
                      <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      Wishlist
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller_info.profile_picture || "/placeholder.svg?height=48&width=48"} />
                    <AvatarFallback>
                      {product.seller_info.first_name[0]}
                      {product.seller_info.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {product.seller_info.first_name} {product.seller_info.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.seller_info.email}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                      <span className="ml-1 text-xs text-gray-500">(120 reviews)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">File Size</span>
                  <span>{mockProductDetails.fileSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Format</span>
                  <span>{mockProductDetails.fileFormat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Update</span>
                  <span>{mockProductDetails.lastUpdate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Language</span>
                  <span>{mockProductDetails.language}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created</span>
                  <span>{formatDate(product.created_at)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Protection</span>
                  <span>{product.protection_grade}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Details and Preview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">{product.title}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">Published on {formatDate(product.created_at)}</span>
                </CardDescription>
              </CardHeader>

              <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="description"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Features
                    </TabsTrigger>
                    <TabsTrigger
                      value="requirements"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Requirements
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger
                      value="faq"
                      className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      FAQ
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="description" className="p-6 pt-4 m-0">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                      mollit anim id est laborum.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3">What You'll Learn</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Master the fundamentals of the subject matter</li>
                      <li>Apply practical techniques to real-world scenarios</li>
                      <li>Develop advanced skills through hands-on exercises</li>
                      <li>Understand best practices and industry standards</li>
                      <li>Create your own projects from scratch</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="p-6 pt-4 m-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockProductDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="p-6 pt-4 m-0">
                  <h3 className="text-lg font-medium mb-4">System Requirements</h3>
                  <ul className="space-y-3">
                    {mockProductDetails.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                          <Info className="h-3 w-3 text-blue-600" />
                        </div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="reviews" className="p-6 pt-4 m-0">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-5xl font-bold">4.7</div>
                        <div className="flex justify-center my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-yellow-400"
                              fill={star <= 4 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Based on 24 reviews</div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="flex items-center">
                          <span className="text-sm w-8">5★</span>
                          <Progress value={75} className="h-2 flex-1 mx-2" />
                          <span className="text-sm w-8 text-right">75%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm w-8">4★</span>
                          <Progress value={20} className="h-2 flex-1 mx-2" />
                          <span className="text-sm w-8 text-right">20%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm w-8">3★</span>
                          <Progress value={5} className="h-2 flex-1 mx-2" />
                          <span className="text-sm w-8 text-right">5%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm w-8">2★</span>
                          <Progress value={0} className="h-2 flex-1 mx-2" />
                          <span className="text-sm w-8 text-right">0%</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm w-8">1★</span>
                          <Progress value={0} className="h-2 flex-1 mx-2" />
                          <span className="text-sm w-8 text-right">0%</span>
                        </div>
                      </div>

                      <Button className="w-full mt-6">Write a Review</Button>
                    </div>

                    <div className="md:w-2/3 space-y-4">
                      {mockProductDetails.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="text-xs text-gray-500">{formatDate(review.date)}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4 text-yellow-400"
                                  fill={star <= review.rating ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="p-6 pt-4 m-0">
                  <Accordion type="single" collapsible className="w-full">
                    {mockProductDetails.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">You May Also Like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group cursor-pointer">
                      <div className="aspect-video rounded-md overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=120&width=200`}
                          alt="Related product"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium mt-2 group-hover:text-primary transition-colors">
                        Related Product {item}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold">${(19.99 * item).toFixed(2)}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3 w-3 text-yellow-400"
                              fill={star <= 4 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recently Viewed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group cursor-pointer">
                      <div className="aspect-video rounded-md overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=120&width=200`}
                          alt="Recently viewed product"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium mt-2 group-hover:text-primary transition-colors">Product {item}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold">${(24.99 * item).toFixed(2)}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3 w-3 text-yellow-400"
                              fill={star <= 4 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview: {product.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={closePreview} className="absolute right-4 top-4">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="mt-4">
            {isVideo ? (
              <video controls className="w-full h-auto rounded-md" src={previewContent}>
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={previewContent || "/placeholder.svg?height=400&width=800"}
                alt="Preview"
                className="w-full h-auto rounded-md object-contain"
              />
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-gray-500">Preview content</p>
            </div>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.is_locked ? "Unlock Now" : "Buy Now"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
