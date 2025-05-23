"use client"

import { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Heart, MessageSquare, Share2, Star, ChevronLeft, ChevronRight, Send, X, LinkIcon } from "lucide-react"
import type { Post, Comment } from "./types/community"
import { SERVER_URL } from "@/config/config"

interface User {
  id: string;
  // Add other user properties as needed
}

interface PostDetailDialogProps {
  selectedPost: Post | null
  isOpen: boolean
  onClose: () => void
  formatRelativeTime: (dateString: string) => string
  getAuthorInitial: (authorName: string | undefined) => string
  handleAddComment: (postId: number) => Promise<void>
  newComment: string
  setNewComment: (value: string) => void
  onLikeToggle?: (postId: number, newLikeState: boolean, newLikeCount: number) => void
  isAddingComment?: boolean
  commentError: string | null
}

export function PostDetailDialog({
  selectedPost,
  isOpen,
  onClose,
  formatRelativeTime,
  getAuthorInitial,
  handleAddComment,
  newComment,
  setNewComment,
  onLikeToggle,
  isAddingComment,
  commentError: propCommentError,
}: PostDetailDialogProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const currentUserId = useSelector((state: RootState) => (state.auth.user as User | null)?.id)
  const [imageIndices, setImageIndices] = useState<Map<number, number>>(new Map())
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [postLikeCount, setPostLikeCount] = useState(0)
  const [isPostLiking, setIsPostLiking] = useState(false)
  const [commentLikes, setCommentLikes] = useState<{
    [key: number]: { isLiked: boolean; totalLikes: number; isLiking?: boolean }
  }>({})
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editCommentContent, setEditCommentContent] = useState("")
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [commentError, setCommentError] = useState<string | null>(propCommentError)

  // Initialize states when selectedPost changes
  useEffect(() => {
    if (selectedPost) {
      setIsPostLiked(selectedPost.is_liked_by_me || false)
      setPostLikeCount(selectedPost.total_likes || 0)

      if (selectedPost.comments) {
        const initialLikes = selectedPost.comments.reduce(
          (acc, comment) => {
            acc[comment.id] = { isLiked: comment.is_liked || false, totalLikes: comment.total_likes || 0 }
            return acc
          },
          {} as { [key: number]: { isLiked: boolean; totalLikes: number } },
        )
        setCommentLikes(initialLikes)
      }
    }
  }, [selectedPost])

  // Update commentError when prop changes
  useEffect(() => {
    setCommentError(propCommentError)
  }, [propCommentError])

  // Handle post like toggle
  const handleLikePost = useCallback(async () => {
    if (!accessToken || !selectedPost || isPostLiking) return

    const newLikeState = !isPostLiked
    const newLikeCount = newLikeState ? postLikeCount + 1 : postLikeCount - 1

    // Optimistic update
    setIsPostLiked(newLikeState)
    setPostLikeCount(newLikeCount)
    setIsPostLiking(true)

    try {
      await axios.post(
        `${SERVER_URL}/api/v1/community/${selectedPost.object_id}/feed/posts/${selectedPost.id}/like-toggle/`,
        { is_like: newLikeState },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )

      // Notify parent to update posts state
      onLikeToggle?.(selectedPost.id, newLikeState, newLikeCount)
    } catch (err) {
      // Revert on error
      setIsPostLiked(!newLikeState)
      setPostLikeCount(postLikeCount)
      console.error("Error toggling post like:", err)
    } finally {
      setIsPostLiking(false)
    }
  }, [accessToken, selectedPost, isPostLiked, postLikeCount, isPostLiking, onLikeToggle])

  // Handle comment like toggle
  const handleLikeComment = useCallback(
    async (commentId: number) => {
      if (!accessToken || !selectedPost) return

      const current = commentLikes[commentId] || { isLiked: false, totalLikes: 0 }

      // Don't proceed if already liking
      if (current.isLiking) return

      const newLikeState = !current.isLiked
      const newLikeCount = Math.max(0, newLikeState ? current.totalLikes + 1 : current.totalLikes - 1)

      // Optimistic update with loading state
      setCommentLikes((prev) => ({
        ...prev,
        [commentId]: { isLiked: newLikeState, totalLikes: newLikeCount, isLiking: true },
      }))

      try {
        const response = await axios.post(
          `${SERVER_URL}/api/v1/community/${selectedPost.object_id}/feed/posts/${selectedPost.id}/comments/${commentId}/like-toggle/`,
          { is_like: newLikeState },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to toggle comment like")
        }

        // Update the comment in the selectedPost object
        if (selectedPost.comments) {
          selectedPost.comments = selectedPost.comments.map((comment) =>
            comment.id === commentId
              ? {
                ...comment,
                is_liked: newLikeState,
                total_likes: Math.max(0, response.data.total_likes ?? newLikeCount)
              }
              : comment,
          )
        }

        // Update state with loading finished
        setCommentLikes((prev) => ({
          ...prev,
          [commentId]: {
            isLiked: newLikeState,
            totalLikes: Math.max(0, response.data.total_likes ?? newLikeCount),
            isLiking: false
          },
        }))
      } catch (err) {
        // Revert on error
        setCommentLikes((prev) => ({
          ...prev,
          [commentId]: { ...current, isLiking: false },
        }))
        console.error("Error toggling comment like:", err)
      }
    },
    [accessToken, selectedPost, commentLikes],
  )

  // Handle edit comment
  const handleEditComment = useCallback(
    async (commentId: number) => {
      if (!editCommentContent.trim() || !accessToken || !selectedPost) return

      setIsEditingComment(true)
      setCommentError(null)

      try {
        const response = await axios.put<{ success: boolean; data: Comment; message?: string }>(
          `${SERVER_URL}/api/v1/community/${selectedPost.object_id}/feed/posts/${selectedPost.id}/comments/${commentId}/`,
          { content: editCommentContent },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        )

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to update comment")
        }

        // Update comments in the post
        if (selectedPost.comments) {
          const updatedComments = selectedPost.comments.map((comment) =>
            comment.id === commentId
              ? {
                ...comment,
                content: editCommentContent,
                updated_at: new Date().toISOString() // Update the timestamp
              }
              : comment,
          )

          // Update the selectedPost with the new comments
          selectedPost.comments = updatedComments
        }

        // Clear editing state
        setEditingCommentId(null)
        setEditCommentContent("")
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Failed to update comment"
        setCommentError(errorMessage)
        console.error("Error editing comment:", err)
      } finally {
        setIsEditingComment(false)
      }
    },
    [accessToken, selectedPost, editCommentContent],
  )

  // Start editing a comment
  const startEditing = useCallback((comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditCommentContent(comment.content)
    setCommentError(null)
  }, [])

  // Placeholder for checking if user is the comment author
  const isCommentAuthor = useCallback(
    (authorId: string) => {
      return currentUserId === authorId
    },
    [currentUserId],
  )

  // Image navigation for dialog
  const setImageIndex = (postId: number, index: number) => {
    setImageIndices((prev) => {
      const newMap = new Map(prev)
      newMap.set(postId, index)
      return newMap
    })
  }

  const nextImage = (postId: number, attachments: string[]) => {
    setImageIndices((prev) => {
      const currentIndex = prev.get(postId) || 0
      const newIndex = currentIndex === attachments.length - 1 ? 0 : currentIndex + 1
      const newMap = new Map(prev)
      newMap.set(postId, newIndex)
      return newMap
    })
  }

  const prevImage = (postId: number, attachments: string[]) => {
    setImageIndices((prev) => {
      const currentIndex = prev.get(postId) || 0
      const newIndex = currentIndex === 0 ? attachments.length - 1 : currentIndex - 1
      const newMap = new Map(prev)
      newMap.set(postId, newIndex)
      return newMap
    })
  }

  // Render post content
  const renderPostContent = useCallback((post: Post) => {
    return (
      <div className="whitespace-pre-line">
        {post.content}
        {post.links?.length > 0 && (
          <div className="mt-3 space-y-2">
            {post.links.map((link, index) => {
              // Check if it's a YouTube link
              if (link.includes('youtube.com') || link.includes('youtu.be')) {
                const videoId = link.includes('youtube.com')
                  ? link.split('v=')[1]?.split('&')[0]
                  : link.split('youtu.be/')[1];

                if (videoId) {
                  return (
                    <div key={index} className="aspect-video rounded-md overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`YouTube video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }
              }

              // Regular link
              return (
                <div key={index} className="flex items-center gap-2 text-blue-600 hover:underline">
                  <LinkIcon className="h-4 w-4" />
                  <a href={link} target="_blank" rel="noopener noreferrer" className="truncate">
                    {link}
                  </a>
                </div>
              );
            })}
          </div>
        )}
        {post.video_url && (
          <div className="mt-3">
            <div className="aspect-video rounded-md overflow-hidden">
              <video
                controls
                className="w-full h-full"
                src={post.video_url}
                poster={post.thumbnail_url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
    )
  }, [])

  // Render mobile carousel
  const renderMobileCarousel = (postId: number, attachments: string[]) => {
    if (!attachments || attachments.length === 0) return null

    const currentIndex = imageIndices.get(postId) || 0

    return (
      <div className="relative w-full">
        <img
          src={attachments[currentIndex] || "/placeholder.svg"}
          alt={`Media ${currentIndex + 1}`}
          className="w-full h-auto rounded-md object-cover"
          loading="lazy"
        />
        {attachments.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => prevImage(postId, attachments)}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => nextImage(postId, attachments)}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {attachments.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (!selectedPost) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full overflow-y-auto sm:w-full h-full max-w-full max-h-full p-0">
        <DialogTitle className="sr-only">Post by {selectedPost.author_name}</DialogTitle>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3 sticky top-0 bg-background z-10">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={selectedPost.author_name} />
              <AvatarFallback>{getAuthorInitial(selectedPost.author_name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedPost.author_name}</span>
                {selectedPost.is_pinned && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 h-5 px-1">
                    <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                    <span className="text-xs">Pinned</span>
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">{formatRelativeTime(selectedPost.created_at)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 h-full">
            {/* Left Side (Images) - Desktop View */}
            <div className="hidden lg:flex flex-col p-6 bg-background">
              {selectedPost.attachments?.length > 0 ? (
                <>
                  <img
                    src={selectedPost.attachments[imageIndices.get(selectedPost.id) || 0] || "/placeholder.svg"}
                    alt={`Media ${imageIndices.get(selectedPost.id) || 0 + 1}`}
                    className="w-full h-[60vh] object-contain rounded-md mb-4"
                    loading="lazy"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {selectedPost.attachments.map((url, index) => (
                      <button
                        key={index}
                        className={`w-full h-24 rounded-md overflow-hidden border-2 ${(imageIndices.get(selectedPost.id) || 0) === index ? "border-blue-500" : "border-transparent"
                          }`}
                        onClick={() => setImageIndex(selectedPost.id, index)}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">No images available</div>
              )}
            </div>

            {/* Right Side (Details and Comments) - Desktop View */}
            <div className="hidden lg:flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6">
                {renderPostContent(selectedPost)}
                <div className="mt-4 border-t pt-4 flex justify-between text-sm text-gray-600">
                  <span>{postLikeCount} likes</span>
                  <span>{selectedPost.total_comments || 0} comments</span>
                </div>
                <div className="py-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 gap-2 ${selectedPost.is_liked_by_me ? "text-pink-600" : "text-gray-600"} hover:text-pink-600`}
                    onClick={handleLikePost}
                    disabled={isPostLiking}
                    aria-label={`Like post with ${postLikeCount} likes`}
                  >
                    <Heart className={`h-5 w-5 ${selectedPost.is_liked_by_me ? "fill-pink-600" : ""}`} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2 text-gray-600 hover:text-blue-600"
                    aria-label="Comment on post"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2 text-gray-600 hover:text-blue-600"
                    aria-label="Share post"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </Button>
                </div>
                {/* Comments */}
                <div className="mt-4">
                  <h3 className="font-medium mb-4">Comments</h3>
                  {selectedPost.comments?.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 mb-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/placeholder.svg" alt={comment.author_first_name} />
                          <AvatarFallback>{getAuthorInitial(comment.author_first_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          {editingCommentId === comment.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                                placeholder="Edit your comment..."
                                className="w-full"
                                disabled={isEditingComment}
                              />
                              {commentError && <p className="text-xs text-red-500">{commentError}</p>}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEditComment(comment.id)}
                                  disabled={isEditingComment || !editCommentContent.trim()}
                                >
                                  {isEditingComment ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                  ) : null}
                                  {isEditingComment ? "Saving..." : "Save"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingCommentId(null)
                                    setCommentError(null)
                                  }}
                                  disabled={isEditingComment}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="bg-background rounded-2xl p-3">
                                <span className="font-medium text-sm">{comment.author_first_name}</span>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                <span>{formatRelativeTime(comment.created_at)}</span>
                                <button
                                  className={`hover:text-gray-800 font-medium ${commentLikes[comment.id]?.isLiked ? "text-pink-600" : ""
                                    }`}
                                  onClick={() => handleLikeComment(comment.id)}
                                  disabled={commentLikes[comment.id]?.isLiking}
                                >
                                  {commentLikes[comment.id]?.isLiking ? (
                                    <span className="flex items-center">
                                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-transparent mr-1" />
                                      Like
                                    </span>
                                  ) : (
                                    <span>Like ({commentLikes[comment.id]?.totalLikes || comment.total_likes})</span>
                                  )}
                                </button>
                                {isCommentAuthor(comment.author_id) && (
                                  <button
                                    className="hover:text-blue-600 font-medium"
                                    onClick={() => startEditing(comment)}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="pr-10 rounded-full bg-background border-gray-600 border-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddComment(selectedPost.id)
                        }
                      }}
                      aria-label="Add a comment"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-blue-600"
                      onClick={() => handleAddComment(selectedPost.id)}
                      disabled={!newComment.trim() || isAddingComment}
                      aria-label="Submit comment"
                    >
                      {isAddingComment ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col flex-1 lg:hidden">
              <div className="flex-1 overflow-y-auto">
                {/* Images (Carousel) */}
                {selectedPost.attachments?.length > 0 && (
                  <div className="p-4">{renderMobileCarousel(selectedPost.id, selectedPost.attachments)}</div>
                )}

                {/* Post Details */}
                <div className="p-4">
                  {renderPostContent(selectedPost)}
                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <span>{postLikeCount} likes</span>
                    <span>{selectedPost.total_comments || 0} comments</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-2 ${isPostLiked ? "text-pink-600" : "text-gray-600"} hover:text-pink-600`}
                      onClick={handleLikePost}
                      disabled={isPostLiking}
                      aria-label={`Like post with ${postLikeCount} likes`}
                    >
                      <Heart className={`h-5 w-5 ${isPostLiked ? "fill-pink-600" : ""}`} />
                      Like
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-gray-600 hover:text-blue-600"
                      aria-label="Comment on post"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Comment
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-gray-600 hover:text-blue-600"
                      aria-label="Share post"
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Comments */}
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-4">Comments</h3>
                  {selectedPost.comments?.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 mb-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/placeholder.svg" alt={comment.author_first_name} />
                          <AvatarFallback>{getAuthorInitial(comment.author_first_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          {editingCommentId === comment.id ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                                placeholder="Edit your comment..."
                                className="w-full"
                                disabled={isEditingComment}
                              />
                              {commentError && <p className="text-xs text-red-500">{commentError}</p>}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleEditComment(comment.id)}
                                  disabled={isEditingComment || !editCommentContent.trim()}
                                >
                                  {isEditingComment ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                                  ) : null}
                                  {isEditingComment ? "Saving..." : "Save"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingCommentId(null)
                                    setCommentError(null)
                                  }}
                                  disabled={isEditingComment}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className=" rounded-2xl p-3">
                                <span className="font-medium text-sm">{comment.author_first_name}</span>
                                <p className="text-sm">{comment.content}</p>
                              </div>
                              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                <span>{formatRelativeTime(comment.created_at)}</span>
                                <button
                                  className={`hover:text-gray-800 font-medium ${commentLikes[comment.id]?.isLiked ? "text-pink-600" : ""
                                    }`}
                                  onClick={() => handleLikeComment(comment.id)}
                                  disabled={commentLikes[comment.id]?.isLiking}
                                >
                                  {commentLikes[comment.id]?.isLiking ? (
                                    <span className="flex items-center">
                                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-500 border-t-transparent mr-1" />
                                      Like
                                    </span>
                                  ) : (
                                    <span>Like ({commentLikes[comment.id]?.totalLikes || comment.total_likes})</span>
                                  )}
                                </button>
                                {isCommentAuthor(comment.author_id) && (
                                  <button
                                    className="hover:text-blue-600 font-medium"
                                    onClick={() => startEditing(comment)}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2 items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="pr-10 rounded-full border-gray-600"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddComment(selectedPost.id)
                        }
                      }}
                      aria-label="Add a comment"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-blue-600"
                      onClick={() => handleAddComment(selectedPost.id)}
                      disabled={!newComment.trim() || isAddingComment}
                      aria-label="Submit comment"
                    >
                      {isAddingComment ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
