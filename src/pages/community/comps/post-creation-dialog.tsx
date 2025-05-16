"use client"

import { useState, ChangeEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  ImageIcon, 
 
  Link as LinkIcon, 
  AtSign, 
  X, 
  Plus, 
  Youtube, 
  Loader2 
} from "lucide-react"
import { toast } from "sonner"
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

// Types
interface Poll {
  question: string;
  options: string[];
  duration: "1day" | "3days" | "7days";
}

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

export function PostCreationDialog({communityId}: {communityId: string}) {
 
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // Form state
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postContent, setPostContent] = useState("");
  
  // Poll state
  const [isPollActive, setIsPollActive] = useState(false);
  const [pollData, setPollData] = useState<Poll>({
    question: "",
    options: ["", ""],
    duration: "1day"
  });
  
  // Media state
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  // Links state
  const [links, setLinks] = useState<Link[]>([{ url: "" }]);
  const [youtubeLinks, setYoutubeLinks] = useState<YoutubeLink[]>([{ url: "" }]);

  // Handlers for poll options
  const handlePollQuestionChange = (value: string) => {
    setPollData({ ...pollData, question: value });
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollData.options];
    newOptions[index] = value;
    setPollData({ ...pollData, options: newOptions });
  };

  const handleAddPollOption = () => {
    if (pollData.options.length < 5) {
      setPollData({ ...pollData, options: [...pollData.options, ""] });
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollData.options.length > 2) {
      const newOptions = [...pollData.options];
      newOptions.splice(index, 1);
      setPollData({ ...pollData, options: newOptions });
    }
  };

  const handlePollDurationChange = (duration: "1day" | "3days" | "7days") => {
    setPollData({ ...pollData, duration });
  };

  // Handlers for media uploads
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    
    Array.from(files).forEach(file => {
      // Check file type and size
      if (file.size > 5 * 1024 * 1024) { // 5MB limit example
        toast.error("File too large",{
          description: `${file.name} exceeds the 5MB size limit.`,
         
        });
        return;
      }
      
      const filePreview = URL.createObjectURL(file);
      newAttachments.push({ file, preview: filePreview });
    });
    
    setAttachments([...attachments, ...newAttachments]);
    e.target.value = ''; // Reset input
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].preview); // Clean up preview URL
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Handlers for links
  const handleLinkChange = (index: number, url: string) => {
    const newLinks = [...links];
    newLinks[index] = { url };
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    if (links.length > 1) {
      const newLinks = [...links];
      newLinks.splice(index, 1);
      setLinks(newLinks);
    } else {
      // Reset to empty if it's the last one
      setLinks([{ url: "" }]);
    }
  };

  // Handlers for YouTube links
  const handleYoutubeLinkChange = (index: number, url: string) => {
    const newYoutubeLinks = [...youtubeLinks];
    newYoutubeLinks[index] = { url };
    setYoutubeLinks(newYoutubeLinks);
  };

  const handleAddYoutubeLink = () => {
    setYoutubeLinks([...youtubeLinks, { url: "" }]);
  };

  const handleRemoveYoutubeLink = (index: number) => {
    if (youtubeLinks.length > 1) {
      const newYoutubeLinks = [...youtubeLinks];
      newYoutubeLinks.splice(index, 1);
      setYoutubeLinks(newYoutubeLinks);
    } else {
      // Reset to empty if it's the last one
      setYoutubeLinks([{ url: "" }]);
    }
  };

  // Form submission
  const handleSubmit = async () => {
    if (!postContent.trim() && attachments.length === 0 && !isPollActive) {
      toast.error("Empty post",{
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
        formData.append('links', validLinks.map(link => link.url).join(','));
      }
      
      // Add YouTube links if any
      const validYoutubeLinks = youtubeLinks.filter(link => link.url.trim() !== "");
      if (validYoutubeLinks.length > 0) {
        formData.append('youtube_links', validYoutubeLinks.map(link => link.url).join(','));
      }
      
      // Add poll if active
      if (isPollActive && pollData.question.trim() !== "" && pollData.options.filter(opt => opt.trim() !== "").length >= 2) {
        const pollPayload = {
          question: pollData.question,
          options: pollData.options.filter(opt => opt.trim() !== ""),
        };
        formData.append('poll', JSON.stringify(pollPayload));
      }

      // API call
      const response = await fetch(`https://edlern.weepul.in.net/api/v1/community/${communityId}/feed/posts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Success
      toast.success( "Post created successfully!",{
        description: "Your post has been published to the community feed.",
        duration: 5000,
      });

      // Reset form and close dialog
      resetForm();
      setOpen(false);

    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to create post",{
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
    setLinks([{ url: "" }]);
    setYoutubeLinks([{ url: "" }]);
    setPollData({
      question: "",
      options: ["", ""],
      duration: "1day"
    });
    setIsPollActive(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-2 w-full" asChild>
        <div className="flex gap-3 p-2 cursor-pointer transition-colors rounded-md border">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center">
            <span className="text-gray-500">Write something...</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <div className="flex items-start gap-3 mt-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] p-2 resize-none border-none focus-visible:ring-0 text-base"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            {/* Attachments preview */}
            {attachments.length > 0 && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden">
                    {attachment.file.type.startsWith('image/') ? (
                      <img
                        src={attachment.preview}
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    ) : attachment.file.type.startsWith('video/') ? (
                      <video
                        src={attachment.preview}
                        controls
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="bg-gray-100 p-4 rounded flex items-center justify-center">
                        <span>{attachment.file.name}</span>
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Poll preview if active */}
            {isPollActive && pollData.question && (
              <div className="mt-3 border rounded-md p-3 bg-gray-50">
                <h3 className="font-medium">{pollData.question}</h3>
                <div className="mt-2 space-y-1">
                  {pollData.options.filter(opt => opt.trim() !== "").map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Poll duration: {pollData.duration === "1day" ? "1 Day" : pollData.duration === "3days" ? "3 Days" : "1 Week"}
                </div>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="format">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="poll" onClick={() => setIsPollActive(true)}>Poll</TabsTrigger>
            <TabsTrigger value="mention">Mention</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="py-2">
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="media" className="py-2">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                    <ImageIcon className="h-4 w-4" />
                    <span>Add Media</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </Label>
              </div>
              
              {/* Current attachments count */}
              {attachments.length > 0 && (
                <p className="text-sm text-gray-500">
                  {attachments.length} {attachments.length === 1 ? 'file' : 'files'} attached
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="links" className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Website Links</Label>
                {links.map((link, index) => (
                  <div key={`link-${index}`} className="flex items-center gap-2 mt-2">
                    <LinkIcon className="h-4 w-4 text-gray-500" />
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
                <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={handleAddLink}>
                  <Plus className="h-3 w-3" />
                  Add Link
                </Button>
              </div>
              
              <div>
                <Label className="text-sm font-medium">YouTube Links</Label>
                {youtubeLinks.map((link, index) => (
                  <div key={`youtube-${index}`} className="flex items-center gap-2 mt-2">
                    <Youtube className="h-4 w-4 text-gray-500" />
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
                <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={handleAddYoutubeLink}>
                  <Plus className="h-3 w-3" />
                  Add YouTube Link
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="poll" className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Poll Question</Label>
                <Input 
                  placeholder="Ask a question..." 
                  className="mt-1" 
                  value={pollData.question}
                  onChange={(e) => handlePollQuestionChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Options</Label>
                <RadioGroup value="option-0">
                  {pollData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <RadioGroupItem value={`option-${index}`} id={`option-${index}`} className="cursor-default" />
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handlePollOptionChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {pollData.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500"
                          onClick={() => handleRemovePollOption(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </RadioGroup>

                {pollData.options.length < 5 && (
                  <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={handleAddPollOption}>
                    <Plus className="h-3 w-3" />
                    Add Option
                  </Button>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">Poll Duration</Label>
                <RadioGroup 
                  value={pollData.duration} 
                  onValueChange={(value) => handlePollDurationChange(value as "1day" | "3days" | "7days")}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1day" id="1day" />
                    <Label htmlFor="1day">1 Day</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3days" id="3days" />
                    <Label htmlFor="3days">3 Days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="7days" id="7days" />
                    <Label htmlFor="7days">1 Week</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mention" className="py-2">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Mention Users</Label>
                <div className="relative mt-1">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search users to mention..." className="pl-9" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Suggested</Label>
                <div className="space-y-2">
                  {["Hamza Ahmed", "Samual Benson", "Latif Skool"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${name.charAt(0)}`} alt={name} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-2" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}