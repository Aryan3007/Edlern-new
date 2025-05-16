"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PostCreationDialog } from "./post-creation-dialog"
import { ApiResponse, Post } from "./types/community"
import { PostCard } from "./post-card"
import { PostDetailDialog } from "./post-detail-dialog"


interface CommunityFeedProps {
  communityId: string
}

export function CommunityFeed({ communityId }: CommunityFeedProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [activeTab, setActiveTab] = useState<"all" | "pinned" | "value">("all")
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [filters, setFilters] = useState({
    withMedia: false,
    popular: false,
  })
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  // Fetch posts from API
  const fetchPosts = useCallback(
    async (pageNum: number) => {
      if (!accessToken) {
        setError("Authentication token missing")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get<ApiResponse>(
          `https://edlern.toolsfactory.tech/api/v1/community/${communityId}/feed/posts/?page=${pageNum}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (response.data.success) {
          setPosts((prev) => (pageNum === 1 ? response.data.data.results : [...prev, ...response.data.data.results]))
          setTotalPages(response.data.data.total_pages)
          setError(null)
        } else {
          setError(response.data.message || "Failed to fetch posts")
        }
      } catch (err) {
        setError(axios.isAxiosError(err) ? err.message : "An error occurred while fetching posts")
      } finally {
        setLoading(false)
      }
    },
    [communityId, accessToken],
  )

  useEffect(() => {
    fetchPosts(page)
  }, [fetchPosts, page])

  // Filter posts
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (activeTab === "pinned" && !post.is_pinned) return false
        if (activeTab === "value" && post.topic !== "value_discussion") return false
        if (filters.withMedia && (!post.attachments || post.attachments.length === 0)) return false
        if (filters.popular && post.total_likes < 100) return false
        return true
      }),
    [posts, activeTab, filters],
  )

  // Handle adding a comment
  const handleAddComment = useCallback(
    async (postId: number) => {
      if (!newComment.trim() || !accessToken) return

      try {
        const response = await axios.post<{ data: Comment }>(
          `https://edlern.toolsfactory.tech/api/v1/community/${communityId}/posts/${postId}/comments/`,
          { content: newComment },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )

        const newCommentData = response.data.data
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? ({
                  ...post,
                  comments: [...(post.comments || []), newCommentData],
                  total_comments: post.total_comments + 1,
                } as Post)
              : post,
          ),
        )
        setNewComment("")
      } catch (err) {
        console.error("Error adding comment:", err)
        setError("Failed to add comment")
      }
    },
    [accessToken, communityId, newComment],
  )

  // Post detail view
  const openPostDetail = useCallback((post: Post) => {
    setSelectedPost(post)
  }, [])

  const closePostDetail = useCallback(() => {
    setSelectedPost(null)
  }, [])

  // Format relative time
  const formatRelativeTime = useCallback((dateString: string): string => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) return `${diffInSeconds}s ago`
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
      return `${Math.floor(diffInSeconds / 86400)}d ago`
    } catch {
      return "Invalid date"
    }
  }, [])

  // Get author initial
  const getAuthorInitial = useCallback((authorName: string | undefined): string => {
    return authorName?.charAt(0).toUpperCase() || "U"
  }, [])

  // Render skeletons
  const renderSkeletons = useCallback(() => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Card key={`skeleton-${index}`} className="overflow-hidden p-0">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-[200px] w-full rounded-md" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))
  }, [])

  return (
    <div className="space-y-4 mx-0 w-full">
      <Card className="p-0">
        <CardContent className="p-0">
          <PostCreationDialog communityId={communityId} />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 justify-between">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "all" | "pinned" | "value")}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
            <TabsTrigger value="value">Value Posts</TabsTrigger>
          </TabsList>
        </Tabs>
        <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Filter Posts</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="media"
                  checked={filters.withMedia}
                  onCheckedChange={(checked) => setFilters({ ...filters, withMedia: checked === true })}
                />
                <Label htmlFor="media">Posts with media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={filters.popular}
                  onCheckedChange={(checked) => setFilters({ ...filters, popular: checked === true })}
                />
                <Label htmlFor="popular">Popular posts (100+ likes)</Label>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setFilters({ withMedia: false, popular: false })}>
                Reset
              </Button>
              <Button onClick={() => setShowFilterDialog(false)}>Apply</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {loading && page === 1 ? (
          renderSkeletons()
        ) : error ? (
          <Card className="p-8 text-center">
            <p className="text-red-500">{error}</p>
            <Button variant="link" onClick={() => fetchPosts(page)}>
              Retry
            </Button>
          </Card>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              formatRelativeTime={formatRelativeTime}
              getAuthorInitial={getAuthorInitial}
              openPostDetail={openPostDetail}
            />
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No posts match your filters</p>
            <Button
              variant="link"
              onClick={() => {
                setActiveTab("all")
                setFilters({ withMedia: false, popular: false })
              }}
            >
              Reset filters
            </Button>
          </Card>
        )}
      </div>

      {page < totalPages && !loading && !error && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            aria-label="Load more posts"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      <PostDetailDialog
        selectedPost={selectedPost}
        isOpen={!!selectedPost}
        onClose={closePostDetail}
        formatRelativeTime={formatRelativeTime}
        getAuthorInitial={getAuthorInitial}
        handleAddComment={handleAddComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />
    </div>
  )
}
