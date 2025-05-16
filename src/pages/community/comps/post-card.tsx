"use client"

import { useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, MoreHorizontal, Share2, Star, Maximize2, LinkIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Post } from "./types/community"

interface PostCardProps {
  post: Post;
  formatRelativeTime: (dateString: string) => string;
  getAuthorInitial: (authorName: string | undefined) => string;
  openPostDetail: (post: Post) => void;
}

export function PostCard({ post, formatRelativeTime, getAuthorInitial, openPostDetail }: PostCardProps) {
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

  // Render image grid
  const renderImageGrid = useCallback((attachments: string[]) => {
    if (!attachments || attachments.length === 0) return null

    const maxVisibleImages = 4 // First image + 3 in the grid
    const remainingImages = attachments.length > maxVisibleImages ? attachments.length - maxVisibleImages : 0

    return (
      <div className="lg:max-w-64 w-full space-y-2">
        {/* First Image - Horizontal */}
        <img
          src={attachments[0] || "/placeholder.svg"}
          alt="Media 1"
          className="w-44 h-auto rounded-md object-cover"
          loading="lazy"
        />

        {/* Remaining Images - Grid of 3 */}
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
                {/* Overlay for +X if there are more images */}
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
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Hide</DropdownMenuItem>
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
            variant="ghost"
            size="sm"
            className="gap-1 text-gray-600 hover:text-pink-600"
            aria-label={`Like post with ${post.total_likes} likes`}
          >
            <Heart className="h-4 w-4" />
            <span>{post.total_likes}</span>
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
