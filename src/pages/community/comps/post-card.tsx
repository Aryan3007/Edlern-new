"use client"

import { useCallback, useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, MoreHorizontal, Share2, Star, Maximize2, LinkIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import type { Post } from "./types/community"
import { SERVER_URL } from "@/config/config"
import { toast } from "sonner"

// Utility for debouncing to prevent rapid clicks
function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}

interface PostCardProps {
  post: Post
  communityId: string
  formatRelativeTime: (dateString: string) => string
  getAuthorInitial: (authorName: string | undefined) => string
  openPostDetail: (post: Post) => void
  onLikeToggle?: (postId: number, newLikeState: boolean, newLikeCount: number) => void
}

export function PostCard({
  post,
  communityId,
  formatRelativeTime,
  getAuthorInitial,
  openPostDetail,
  onLikeToggle,
}: PostCardProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [isLiking, setIsLiking] = useState(false)
  const [isLiked, setIsLiked] = useState(post.is_liked_by_me || false)
  const [likeCount, setLikeCount] = useState(Math.max(0, post.total_likes || 0))
  const latestStateRef = useRef({ isLiked, likeCount })

  // Update ref whenever state changes
  latestStateRef.current = { isLiked, likeCount }

  // Handle post like toggle
  const handleLikePost = useDebounce(
    useCallback(async () => {
      if (!accessToken || isLiking) {
        toast.error("Please log in to like this post.")
        return
      }

      const newLikeState = !isLiked
      const newLikeCount = Math.max(0, newLikeState ? likeCount + 1 : likeCount - 1)

      // Optimistic update
      setIsLiked(newLikeState)
      setLikeCount(newLikeCount)
      setIsLiking(true)

      try {
        const response = await axios.post(
          `${SERVER_URL}/api/v1/community/${communityId}/feed/posts/${post.id}/like-toggle/`,
          { is_like: newLikeState },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to toggle like")
        }

        // Sync with server response if available
        const serverLikeState = response.data.is_liked ?? newLikeState
        const serverLikeCount = Math.max(0, response.data.total_likes ?? newLikeCount)
        setIsLiked(serverLikeState)
        setLikeCount(serverLikeCount)

        // Notify parent
        onLikeToggle?.(post.id, serverLikeState, serverLikeCount)
      } catch (err: any) {
        // Revert on error
        setIsLiked(latestStateRef.current.isLiked)
        setLikeCount(latestStateRef.current.likeCount)

        toast.error("Failed to update like status. Please try again.")
        console.error("Error toggling like:", err)
      } finally {
        setIsLiking(false)
      }
    }, [accessToken, isLiked, likeCount, communityId, post.id, isLiking, onLikeToggle]),
    300 // 300ms debounce
  )

  // Render post content (unchanged)
  const renderPostContent = useCallback((post: Post) => {
    return (
      <div className="whitespace-pre-line">
        {post.content}
        {post.links?.length > 0 && (
          <div className="mt-3 space-y-2">
            {post.links.map((link, index) => (
              <div key={index} className="flex items-center gap-2 text-blue-600 hover:underline">
                <LinkIcon className="h-4 w-4" />
                <a href={link} target="_blank" rel="noopener noreferrer" className="truncate">
                  {link}
                </a>
              </div>
            ))}
          </div>
        )}
        {post.youtube_links?.length > 0 && (
          <div className="mt-3 space-y-3">
            {post.youtube_links.map((link, index) => (
              <div key={index} className="aspect-video rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={link.replace("watch?v=", "embed/")}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }, [])

  // Render image grid (unchanged)
  const renderImageGrid = useCallback((attachments: string[]) => {
    if (!attachments || attachments.length === 0) return null

    const maxVisibleImages = 4
    const remainingImages = attachments.length > maxVisibleImages ? attachments.length - maxVisibleImages : 0

    return (
      <div className="lg:max-w-64 w-full space-y-2">
        <img
          src={attachments[0] || "/placeholder.svg"}
          alt="Media 1"
          className="w-44 h-auto rounded-md object-cover"
          loading="lazy"
        />
        {attachments.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {attachments.slice(1, maxVisibleImages).map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Media ${index + 2}`}
                  className="w-64 h-24 rounded-md object-cover"
                  loading="lazy"
                />
                {index === maxVisibleImages - 2 && remainingImages > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                    <span className="text-white font-semibold text-lg">+{remainingImages}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }, [])

  return (
    <Card className="overflow-hidden p-0">
      <CardHeader className="p-4 flex flex-row items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" alt={post.author_name} />
          <AvatarFallback>{getAuthorInitial(post.author_name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author_name}</span>
            {post.is_pinned && (
              <Badge variant="outline" className="bg-amber-100 text-amber-700 h-5 px-1">
                <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                <span className="text-xs">Pinned</span>
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{formatRelativeTime(post.created_at)}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Pin post</DropdownMenuItem>
            <DropdownMenuItem>Delete post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => openPostDetail(post)}
          aria-label="View post details"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex flex-col lg:flex-row justify-between gap-4">
        {renderPostContent(post)}
        {post.attachments?.length > 0 && renderImageGrid(post.attachments)}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={`gap-1 ${isLiked ? "text-pink-600" : "text-gray-600"} hover:text-pink-600`}
            onClick={handleLikePost}
            disabled={isLiking || !accessToken}
            aria-label={`${isLiked ? "Unlike" : "Like"} post with ${likeCount} likes`}
          >
            {isLiking ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent mr-1" />
            ) : (
              <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-600" : ""}`} />
            )}
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 hover:text-sky-600"
            onClick={() => openPostDetail(post)}
            aria-label={`View ${post.total_comments} comments`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.total_comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-sky-600" aria-label="Share post">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}