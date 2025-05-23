"use client"

import { useState, ChangeEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {

  Image as ImageIcon,
  Link as LinkIcon,
  Youtube,
  X,
  Plus,
  Loader2,


} from "lucide-react"
import { toast } from "sonner"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { SERVER_URL } from "@/config/config"


interface Link {
  url: string;
}

interface YoutubeLink {
  url: string;
}

interface Attachment {
  file: File;
  preview: string;
}

// interface Post {
//   id: number;
//   community_id: string;
//   content: string;
//   attachments: Attachment[];
//   links: Link[];
//   youtube_links: YoutubeLink[];
//   video_url: string | null;
//   total_likes: number;
//   is_liked_by_me: boolean;
// }

export function PostCreationDialog({ communityId }: { communityId: string }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // Form state
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postContent, setPostContent] = useState("");

  // Media state
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Links state
  const [links, setLinks] = useState<Link[]>([]);
  const [youtubeLinks, setYoutubeLinks] = useState<YoutubeLink[]>([]);

  // UI States
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);

  // Video state
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);


  // Handlers for media uploads
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('video/')) {
        handleVideoUpload(file);
      } else {
        // existing image/file logic
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File too large", {
            description: `${file.name} exceeds the 5MB size limit.`,
          });
          return;
        }
        const filePreview = URL.createObjectURL(file);
        setAttachments(prev => [...prev, { file, preview: filePreview }]);
      }
    });
    e.target.value = '';
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].preview); // Clean up preview URL
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Handlers for links
  const handleAddLink = () => {
    setLinks([...links, { url: "" }]);
  };

  const handleLinkChange = (index: number, url: string) => {
    const newLinks = [...links];
    newLinks[index] = { url };
    setLinks(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);

    if (newLinks.length === 0) {
      setShowLinkInput(false);
    }
  };

  // Handlers for YouTube links
  const handleAddYoutubeLink = () => {
    setYoutubeLinks([...youtubeLinks, { url: "" }]);
  };

  const handleYoutubeLinkChange = (index: number, url: string) => {
    const newYoutubeLinks = [...youtubeLinks];
    newYoutubeLinks[index] = { url };
    setYoutubeLinks(newYoutubeLinks);
  };

  const handleRemoveYoutubeLink = (index: number) => {
    const newYoutubeLinks = [...youtubeLinks];
    newYoutubeLinks.splice(index, 1);
    setYoutubeLinks(newYoutubeLinks);

    if (newYoutubeLinks.length === 0) {
      setShowYoutubeInput(false);
    }
  };



  const toggleLinkInput = () => {
    if (!showLinkInput) {
      setShowLinkInput(true);
      if (links.length === 0) {
        handleAddLink();
      }
    } else {
      setShowLinkInput(false);
    }
  };

  const toggleYoutubeInput = () => {
    if (!showYoutubeInput) {
      setShowYoutubeInput(true);
      if (youtubeLinks.length === 0) {
        handleAddYoutubeLink();
      }
    } else {
      setShowYoutubeInput(false);
    }
  };

  // Form submission
  const handleSubmit = async () => {
    if (!postContent.trim() && attachments.length === 0) {
      toast.error("Empty post", {
        description: "Please add some content, media, or a poll to your post.",
      });
      return;
    }


    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add content
      formData.append('content', postContent);

      // Add attachments
      attachments.forEach(attachment => {
        formData.append('attachments', attachment.file);
      });

      // Add links if any
      const validLinks = links.filter(link => link.url.trim() !== "");
      if (validLinks.length > 0) {
        formData.append('links', JSON.stringify(validLinks.map(link => link.url)));
      }

      // Add YouTube links if any
      const validYoutubeLinks = youtubeLinks.filter(link => link.url.trim() !== "");
      if (validYoutubeLinks.length > 0) {
        formData.append('youtube_links', JSON.stringify(validYoutubeLinks.map(link => link.url)));
      }

      if (videoUrl) {
        formData.append('video_url', videoUrl);
      }

      // API call
      const response = await fetch(`${SERVER_URL}/api/v1/community/${communityId}/feed/posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // Success
      toast.success("Post created successfully!", {
        description: "Your post has been published to the community feed.",
        duration: 5000,
      });

      // Reset form and close dialog
      resetForm();
      setOpen(false);

    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to create post", {
        description: "There was an error publishing your post. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPostContent("");
    setAttachments([]);
    setLinks([]);
    setYoutubeLinks([]);


    setShowLinkInput(false);
    setShowYoutubeInput(false);
  };

  const handleVideoUpload = async (file: File) => {
    setVideoUploading(true);
    try {
      // 1. Get S3 upload fields from your backend
      const response = await fetch(`${SERVER_URL}/api/v1/common/generate-s3-upload-url/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          file_name: file.name,
          content_type: 'mp4',
          key: `community_${communityId}/videos/${file.name}`
        })
      });

      const result = await response.json();
      if (!result.success) {
        toast.error("Failed to get upload URL");
        setVideoUploading(false);
        return;
      }

      const { url, fields } = result.data;

      // 2. Upload to S3
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      const upload = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!upload.ok) {
        toast.error("Video upload failed.");
        setVideoUploading(false);
        return;
      }

      // 3. Get the video URL
      // If your backend returns the full URL, use that. Otherwise, construct it:
      // Example: https://your-bucket.s3.amazonaws.com/community_x/videos/filename.mp4
      const generatedUrl = url + fields.key;
      setVideoUrl(generatedUrl);
      toast.success("Video uploaded!");
    } catch (err) {
      toast.error("Video upload failed.");
    } finally {
      setVideoUploading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-3 p-3 cursor-pointer transition-colors rounded-md border ">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center">
            <span className="text-gray-500">Write something...</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create Post</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-3 mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] p-3 resize-none text-base focus-visible:ring-1 focus-visible:ring-offset-1"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>

        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border">
                {attachment.file.type.startsWith('image/') ? (
                  <img
                    src={attachment.preview}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-auto object-cover max-h-[200px]"
                  />
                ) : attachment.file.type.startsWith('video/') ? (
                  <video
                    src={attachment.preview}
                    controls
                    className="w-full h-auto max-h-[200px]"
                  />
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex items-center justify-center h-[120px]">
                    <span className="truncate max-w-full">{attachment.file.name}</span>
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {videoUrl && (
          <div className="mt-3">
            <video src={videoUrl} controls className="w-full max-h-[200px]" />
          </div>
        )}

        {/* Links input section */}
        {showLinkInput && (
          <div className="mt-3">
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={`link-${index}`} className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <Input
                    placeholder="https://example.com"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {links.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 mt-2"
                  onClick={handleAddLink}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add another link
                </Button>
              )}
            </div>
          </div>
        )}

        {/* YouTube links input section */}
        {showYoutubeInput && (
          <div className="mt-3">
            <div className="space-y-2">
              {youtubeLinks.map((link, index) => (
                <div key={`youtube-${index}`} className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={link.url}
                    onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => handleRemoveYoutubeLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {youtubeLinks.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 mt-2"
                  onClick={handleAddYoutubeLink}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add another YouTube link
                </Button>
              )}
            </div>
          </div>
        )}

        <Separator className="my-4" />

        {/* Option toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center h-9 w-9 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add photos or videos</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 p-0"
                  onClick={toggleLinkInput}
                >
                  <LinkIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add link</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 p-0"
                  onClick={toggleYoutubeInput}
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add YouTube video</p>
              </TooltipContent>
            </Tooltip>


          </TooltipProvider>
        </div>

        {/* Current attachments count */}
        {attachments.length > 0 && (
          <div className="flex items-center text-sm text-gray-500 my-2">
            <ImageIcon className="h-4 w-4 mr-1" />
            <span>{attachments.length} {attachments.length === 1 ? 'file' : 'files'} attached</span>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={() => {
            resetForm();
            setOpen(false);
          }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || videoUploading}
            className="gap-2 px-6"
          >
            {(isSubmitting || videoUploading) && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Posting..." : videoUploading ? "Uploading Video..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}