"use client"

import { useCallback, useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Share2, Star } from "lucide-react"
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



  return (
    <Card onClick={() => openPostDetail(post)} className="overflow-hidden  p-0">
      <div className="flex flex-row items-stretch">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <CardHeader className="p-0 pb-2 flex flex-row items-start gap-3">
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
              <p className="text-xs text-gray-500">{formatRelativeTime(post.created_at)} · General discussion</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2 flex flex-col gap-2">
            {/* <div className="font-bold capitalize text-lg">{post.topic ? post.topic.replace(/_/g, ' ') : post.content?.split('\n')[0]}</div> */}
            <div className="text-base">{post.content}</div>
          </CardContent>
          <CardFooter className="p-0 pt-4 flex gap-4">
            <Button
              size="sm"
              className={`gap-1 ${isLiked ? "text-pink-600" : "text-gray-600"} hover:text-pink-600`}
              onClick={handleLikePost}
              disabled={isLiking}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-pink-600" : "fill-gray-600"}`} />
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
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-sky-600" aria-label="Share post">
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
        {/* Right: Media Preview */}
        {(post.attachments?.length > 0 || post.video_url || (post.links && post.links.some(link => link.includes('youtube.com') || link.includes('youtu.be')))) && (
          <div className="flex items-center justify-center min-w-[120px] max-w-[180px] p-4 cursor-pointer" >
            {/* Show image if present */}
            {post.attachments && post.attachments.length > 0 && (
              <img
                src={post.attachments[0] || "/placeholder.svg"}
                alt="Media preview"
                className="w-32 h-20 rounded-md object-cover"
                loading="lazy"
              />
            )}
            {/* Show video if present */}
            {!post.attachments?.length && post.video_url && (
              <video
                src={post.video_url}
                poster={post.thumbnail_url}
                className="w-32 h-20 rounded-md object-cover"
                controls={false}
                onClick={e => { e.preventDefault(); openPostDetail(post); }}
              />
            )}
            {/* Show YouTube if present and no image/video */}
            {!post.attachments?.length && !post.video_url && post.links && post.links.some(link => link.includes('youtube.com') || link.includes('youtu.be')) && (
              (() => {
                const ytLink = post.links.find(link => link.includes('youtube.com') || link.includes('youtu.be'));
                let videoId = ytLink?.includes('youtube.com')
                  ? ytLink.split('v=')[1]?.split('&')[0]
                  : ytLink?.split('youtu.be/')[1];
                if (videoId) {
                  return (
                    <div className="w-32 h-20 rounded-md overflow-hidden aspect-video bg-black flex items-center justify-center">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
                return null;
              })()
            )}
          </div>
        )}
      </div>
    </Card>
  )
}