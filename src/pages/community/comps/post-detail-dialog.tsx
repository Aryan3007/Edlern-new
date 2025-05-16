"use client"

import { useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Heart, MessageSquare, Share2, Star, ChevronLeft, ChevronRight, Send, X, LinkIcon } from "lucide-react"
import { Post } from "./types/community"

interface PostDetailDialogProps {
  selectedPost: Post | null
  isOpen: boolean
  onClose: () => void
  formatRelativeTime: (dateString: string) => string
  getAuthorInitial: (authorName: string | undefined) => string
  handleAddComment: (postId: number) => Promise<void>
  newComment: string
  setNewComment: (value: string) => void
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
}: PostDetailDialogProps) {
  const [imageIndices, setImageIndices] = useState<Map<number, number>>(new Map())

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
        {post.poll && (
          <div className="mt-3 border rounded-md p-3 bg-gray-50">
            <h3 className="font-medium">{post.poll.question}</h3>
            <div className="mt-2 space-y-2">
              {post.poll.options.map((option) => (
                <div key={option.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-300" />
                    <span>{option.text}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${option.votes}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Poll ends: {post.poll.end_date ? new Date(post.poll.end_date).toLocaleDateString() : "Unknown"}
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
                        className={`w-full h-24 rounded-md overflow-hidden border-2 ${
                          (imageIndices.get(selectedPost.id) || 0) === index ? "border-blue-500" : "border-transparent"
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
                  <span>{selectedPost.total_likes || 0} likes</span>
                  <span>{selectedPost.total_comments || 0} comments</span>
                </div>
                <div className="py-2 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 gap-2 text-gray-600 hover:text-blue-600"
                    aria-label="Like post"
                  >
                    <Heart className="h-5 w-5" />
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
                <div className="mt-4">
                  <h3 className="font-medium mb-4">Comments</h3>
                  {selectedPost.comments?.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 mb-4">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/placeholder.svg" alt={comment.author_name} />
                          <AvatarFallback>{getAuthorInitial(comment.author_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-2xl p-3">
                            <span className="font-medium text-sm">{comment.author_name}</span>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>{formatRelativeTime(comment.created_at)}</span>
                            <button className="hover:text-gray-800 font-medium">Like</button>
                          </div>
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
                      disabled={!newComment.trim()}
                      aria-label="Submit comment"
                    >
                      <Send className="h-4 w-4" />
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
                    <span>{selectedPost.total_likes || 0} likes</span>
                    <span>{selectedPost.total_comments || 0} comments</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-gray-600 hover:text-blue-600"
                      aria-label="Like post"
                    >
                      <Heart className="h-5 w-5" />
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
                          <AvatarImage src="/placeholder.svg" alt={comment.author_name} />
                          <AvatarFallback>{getAuthorInitial(comment.author_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-2xl p-3">
                            <span className="font-medium text-sm">{comment.author_name}</span>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>{formatRelativeTime(comment.created_at)}</span>
                            <button className="hover:text-gray-800 font-medium">Like</button>
                          </div>
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
                      disabled={!newComment.trim()}
                      aria-label="Submit comment"
                    >
                      <Send className="h-4 w-4" />
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
