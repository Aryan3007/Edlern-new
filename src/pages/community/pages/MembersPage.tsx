"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar, MessageSquare, PentagonIcon, RefreshCw } from "lucide-react"
import { CommunitySidebar } from "../comps/community-sidebar"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Interface for individual member from API
interface APIMember {
  id: number
  created_at: string
  updated_at: string
  role: "creator" | "member" | "admin"
  status: "approved" | "pending" | "rejected"
  reason: string | null
  community: number
  user: string
  approved_by: string | null
  fullname: string
  profile_picture: string | null
  bio: string
}

// Interface for API response
interface APIResponse {
  message: string
  success: boolean
  data: {
    next: string | null
    previous: string | null
    count: number
    limit: number
    current_page: number
    total_pages: number
    results: APIMember[]
  }
}

// Interface for member data used in UI
interface Member {
  id: number
  name: string
  image: string
  bio: string
  role: string
  joinedDate: string
}

export default function MembersPage() {
  const { community_id } = useParams<{ community_id: string }>()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "role-asc" | "role-desc">("newest")
  const [activeTab, setActiveTab] = useState<"all" | "creator" | "admin" | "member">("all")
  const limit = 10

// Debounce function with specific type for search handler
// Debounce function with specific type for search handler
const debounce = <T extends (query: string) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return (query: string) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(query), delay)
  }
}


  const fetchMembers = useCallback(async () => {
    if (!community_id || !accessToken) {
      setError("Missing community ID or authentication token")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(searchQuery && { search: searchQuery }),
        ...(sortBy && { sort: sortBy === "newest" ? "-created_at" : sortBy === "oldest" ? "created_at" : sortBy === "role-asc" ? "role" : "-role" }),
        ...(activeTab !== "all" && { role: activeTab }),
      })

      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/community/${community_id}/members/?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data: APIResponse = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      const fetchedMembers: Member[] = data.data.results.map((member) => ({
        id: member.id,
        name: member.fullname,
        image: member.profile_picture || `/placeholder.svg?height=40&width=40&text=${member.fullname.charAt(0)}`,
        bio: member.bio || "No bio provided",
        role: member.role,
        joinedDate: new Date(member.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }))

      setMembers(fetchedMembers)
      setTotalPages(data.data.total_pages)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch members")
    } finally {
      setLoading(false)
    }
  }, [community_id, accessToken, page, searchQuery, sortBy, activeTab])

  // Fetch members when dependencies change
  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  // Debounced search handler
  const handleSearch = debounce((value: string) => {
    setSearchQuery(value)
    setPage(1) // Reset to first page on search
  }, 300)

  // Handle sort change
  const handleSortChange = (value: "newest" | "oldest" | "role-asc" | "role-desc") => {
    setSortBy(value)
    setPage(1)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (["all", "creator", "admin", "member"].includes(value)) {
      setActiveTab(value as "creator" | "member" | "admin" | "all")
      setPage(1)
    }
  }
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Retry on error
  const handleRetry = () => {
    setError(null)
    fetchMembers()
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-[97px]">
            <CommunitySidebar communityId={community_id || "exit"} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Members</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name or bio..."
                    className="pl-10"
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search members"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="role-asc">Role (A-Z)</SelectItem>
                      <SelectItem value="role-desc">Role (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2" disabled>
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Tabs for Role Filtering */}
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                <TabsList className="grid grid-cols-3 w-full max-w-md">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="creator">Creators</TabsTrigger>
                  <TabsTrigger value="member">Members</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} />
              </Tabs>

              {/* Members List */}
              {loading && page === 1 ? (
                <div className="text-center py-6">
                  <div className="animate-spin inline-block h-6 w-6 mr-2">
                    <RefreshCw className="h-6 w-6 text-sky-600" />
                  </div>
                  Loading members...
                </div>
              ) : error ? (
                <div className="text-center py-6 text-red-600">
                  <p>{error}</p>
                  <Button variant="outline" onClick={handleRetry} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-6">No members found</div>
              ) : (
                <div className="space-y-4">
                  {members.map((member) => (
                    <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.image} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                              <h3 className="font-medium text-lg">{member.name}</h3>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                aria-label={`Chat with ${member.name}`}
                              >
                                <MessageSquare className="h-4 w-4" />
                                Chat
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{member.bio}</p>
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <PentagonIcon className="h-4 w-4" />
                                <span className="capitalize">{member.role}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Joined {member.joinedDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !loading && !error && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        aria-disabled={page === 1}
                        aria-label="Previous page"
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          onClick={() => handlePageChange(p)}
                          isActive={p === page}
                          className="cursor-pointer"
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? "page" : undefined}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                        className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        aria-disabled={page === totalPages}
                        aria-label="Next page"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}