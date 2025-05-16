"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Lock, Calendar, User, Search, Filter, Star, ShoppingCart, X } from "lucide-react"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import Navbar from "@/components/Navbar"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

interface FilterOptions {
  priceRange: [number, number]
  isLocked: boolean | null
  categories: string[]
  sortBy: string
}

interface PaginationInfo {
  next: string | null
  previous: string | null
  count: number
  limit: number
  current_page: number
  total_pages: number
}

export default function DigitalProductsPage() {
  const [products, setProducts] = useState<DigitalProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<DigitalProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    priceRange: [0, 1000],
    isLocked: null,
    categories: [],
    sortBy: "newest",
  })
  const [pagination, setPagination] = useState<PaginationInfo>({
    next: null,
    previous: null,
    count: 0,
    limit: 20,
    current_page: 1,
    total_pages: 1,
  })
  const [maxPrice, setMaxPrice] = useState(1000)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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

  const fetchProducts = useCallback(
    async (url: string) => {
      try {
        setLoading(true)
        const response = await axios.get(url, {
          headers: getAuthHeaders(),
        })
        const { results, ...paginationInfo } = response.data.data
        setProducts(results)
        setPagination(paginationInfo)
        // Find the highest price for the price filter
        if (results.length > 0) {
          const highestPrice = Math.max(...results.map((p: DigitalProduct) => Number.parseFloat(p.price)))
          setMaxPrice(Math.ceil(highestPrice))
          setFilterOptions((prev) => ({
            ...prev,
            priceRange: [0, Math.ceil(highestPrice)],
          }))
        }
      } catch (err) {
        setError("Failed to fetch digital products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [accessToken]
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    fetchProducts("https://edlern.toolsfactory.tech/api/v1/digital-product/")
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...products]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
    }

    // Apply price filter
    result = result.filter((product) => {
      const price = Number.parseFloat(product.price)
      return price >= filterOptions.priceRange[0] && price <= filterOptions.priceRange[1]
    })

    // Apply locked filter
    if (filterOptions.isLocked !== null) {
      result = result.filter((product) => product.is_locked === filterOptions.isLocked)
    }

    // Apply categories filter (placeholder, as API lacks category data)
    if (filterOptions.categories.length > 0) {
      // No category data in API, so no filtering applied
    }

    // Apply sorting
    switch (filterOptions.sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "price-low":
        result.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-high":
        result.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        result.sort(( b) => b.title.localeCompare(b.title))
        break
    }

    setFilteredProducts(result)
  }, [products, searchQuery, filterOptions])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }, [])



  const resetFilters = () => {
    setFilterOptions({
      priceRange: [0, maxPrice],
      isLocked: null,
      categories: [],
      sortBy: "newest",
    })
    setSearchQuery("")
  }

  const handlePageChange = (page: number | "next" | "prev") => {
    let url = "https://edlern.toolsfactory.tech/api/v1/digital-product/"
    if (page === "next" && pagination.next) {
      url = pagination.next
    } else if (page === "prev" && pagination.previous) {
      url = pagination.previous
    } else if (typeof page === "number") {
      url = `https://edlern.toolsfactory.tech/api/v1/digital-product/?page=${page}`
    }
    fetchProducts(url)
  }

  const renderProductCard = (product: DigitalProduct) => {

    return (
      <Card
        key={product.id}
        className="overflow-hidden bg-white text-black group h-full pt-0 flex flex-col border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={product.thumbnail || "/placeholder.svg?height=200&width=300"}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
      
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-lg line-clamp-1">{product.title}</h3>
            {product.is_locked && (
              <Badge variant="outline" className="bg-sky-100 text-sky-600 ml-2 shrink-0">
                <Lock className="h-3 w-3 mr-1" />
                Locked
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 flex-grow">{product.description}</p>
          <div className="mt-3 flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">
              {product.seller_info.first_name} {product.seller_info.last_name}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(product.created_at)}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-semibold">${Number.parseFloat(product.price).toFixed(2)}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 text-yellow-400"
                  fill={star <= 4 ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link to={`/digital-products/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-100">
                Details
              </Button>
            </Link>
            <Button className="flex-1 bg-sky-600 hover:bg-sky-700">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.is_locked ? "Unlock" : "Buy Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderProductListItem = (product: DigitalProduct) => {

    return (
      <Card
        key={product.id}
        className="overflow-hidden group bg-white text-black border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-1/4">
            <div className="aspect-video sm:aspect-square w-full overflow-hidden">
              <img
                src={product.thumbnail || "/placeholder.svg?height=200&width=200"}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          
          </div>
          <CardContent className="p-4 sm:w-3/4 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-lg">{product.title}</h3>
              {product.is_locked && (
                <Badge variant="outline" className="bg-sky-100 text-sky-600 ml-2">
                  <Lock className="h-3 w-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{product.description}</p>
            <div className="flex flex-wrap justify-between mt-3">
              <div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  <span>
                    {product.seller_info.first_name} {product.seller_info.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(product.created_at)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-semibold">
                  ${Number.parseFloat(product.price).toFixed(2)}
                </span>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400"
                      fill={star <= 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:justify-end">
              <Link to={`/digital-products/${product.id}`}>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                  Details
                </Button>
              </Link>
              <Button className="bg-sky-600 hover:bg-sky-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.is_locked ? "Unlock" : "Buy Now"}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card
        key={index}
        className="overflow-hidden bg-white border border-gray-200"
      >
        <div className="aspect-video w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-4 w-1/3 mb-3" />
          <Skeleton className="h-6 w-1/4 mb-3" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="bg-white h-full text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 bg-white text-black">
        {/* Hero Banner */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-sky-700 to-sky-800 text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center"></div>
          <div className="relative z-10 p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Digital Learning Resources
            </h1>
            <p className="max-w-2xl mb-4">
              Discover premium digital courses, templates, and resources to enhance your skills and boost your productivity.
            </p>
            
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search digital products..."
              className="pl-10 border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] p-4 sm:w-[400px] overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, maxPrice]}
                        max={maxPrice}
                        step={1}
                        value={filterOptions.priceRange}
                        onValueChange={(value) =>
                          setFilterOptions((prev) => ({
                            ...prev,
                            priceRange: value as [number, number],
                          }))
                        }
                        className="my-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">${filterOptions.priceRange[0]}</span>
                        <span className="text-sm">${filterOptions.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Product Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="locked"
                          checked={filterOptions.isLocked === true}
                          onCheckedChange={(checked) =>
                            setFilterOptions((prev) => ({
                              ...prev,
                              isLocked: checked ? true : null,
                            }))
                          }
                        />
                        <Label htmlFor="locked">Locked</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="unlocked"
                          checked={filterOptions.isLocked === false}
                          onCheckedChange={(checked) =>
                            setFilterOptions((prev) => ({
                              ...prev,
                              isLocked: checked ? false : null,
                            }))
                          }
                        />
                        <Label htmlFor="unlocked">Unlocked</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="space-y-2">
                      {["Courses", "Templates", "E-books", "Software", "Graphics"].map(
                        (category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={filterOptions.categories.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFilterOptions((prev) => ({
                                    ...prev,
                                    categories: [...prev.categories, category],
                                  }))
                                } else {
                                  setFilterOptions((prev) => ({
                                    ...prev,
                                    categories: prev.categories.filter((c) => c !== category),
                                  }))
                                }
                              }}
                            />
                            <Label htmlFor={category}>{category}</Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button className="bg-sky-600 hover:bg-sky-700">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={filterOptions.sortBy}
              onValueChange={(value) =>
                setFilterOptions((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="w-[180px] border-gray-300">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="title-asc">Title: A-Z</SelectItem>
                <SelectItem value="title-desc">Title: Z-A</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 1H6.5V6H1.5V1ZM8.5 1H13.5V6H8.5V1ZM1.5 8H6.5V13H1.5V8ZM8.5 8H13.5V13H8.5V8Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none "
                onClick={() => setViewMode("list")}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 3H13.5V4.5H1.5V3ZM1.5 6.75H13.5V8.25H1.5V6.75ZM1.5 10.5H13.5V12H1.5V10.5Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        {(searchQuery ||
          filterOptions.isLocked !== null ||
          filterOptions.categories.length > 0 ||
          filterOptions.priceRange[0] > 0 ||
          filterOptions.priceRange[1] < maxPrice) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100 text-gray-800"
              >
                Search: {searchQuery}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filterOptions.isLocked !== null && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100 text-gray-800"
              >
                {filterOptions.isLocked ? "Locked" : "Unlocked"}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() =>
                    setFilterOptions((prev) => ({ ...prev, isLocked: null }))
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {filterOptions.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100 text-gray-800"
              >
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() =>
                    setFilterOptions((prev) => ({
                      ...prev,
                      categories: prev.categories.filter((c) => c !== category),
                    }))
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}

            {(filterOptions.priceRange[0] > 0 || filterOptions.priceRange[1] < maxPrice) && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-gray-100 text-gray-800"
              >
                Price: ${filterOptions.priceRange[0]} - ${filterOptions.priceRange[1]}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() =>
                    setFilterOptions((prev) => ({ ...prev, priceRange: [0, maxPrice] }))
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 text-gray-600 hover:text-gray-900"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="mb-8">

          {loading ? (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                  : ""
              } gap-6`}
            >
              {renderSkeletons()}
            </div>
          ) : error ? (
            <div className="py-6 text-center text-red-600 bg-red-50 rounded-lg">
              <p>Error: {error}</p>
              <Button
                variant="outline"
                className="mt-2 border-gray-300 hover:bg-gray-100"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">No products found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any products matching your criteria.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) =>
                viewMode === "grid"
                  ? renderProductCard(product)
                  : renderProductListItem(product)
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-8 mb-12">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={!pagination.previous}
                onClick={() => handlePageChange("prev")}
                className="border-gray-300 hover:bg-gray-100"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, pagination.current_page - 3),
                  Math.min(pagination.total_pages, pagination.current_page + 2)
                )
                .map((page) => (
                  <Button
                    key={page}
                    variant={pagination.current_page === page ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      pagination.current_page === page
                        ? "bg-black"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              <Button
                variant="outline"
                size="icon"
                disabled={!pagination.next}
                onClick={() => handlePageChange("next")}
                className="border-gray-300 hover:bg-gray-100"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.1584 3.13514C5.95694 3.32401 5.94673 3.64042 6.13559 3.84188L9.565 7.49991L6.13559 11.1579C5.94673 11.3594 5.95694 11.6758 6.1584 11.8647C6.35986 12.0535 6.67627 12.0433 6.86514 11.8419L10.6151 7.84188C10.7954 7.64955 10.7954 7.35027 10.6151 7.15794L6.86514 3.15794C6.67627 2.95648 6.35986 2.94628 6.1584 3.13514Z"
                    fill="currentColor"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}