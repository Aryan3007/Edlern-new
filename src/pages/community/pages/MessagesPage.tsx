import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Send, MoreHorizontal, ChevronLeft, Paperclip, Smile } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function MessagesPage() {
  // Sample conversation data
  const initialConversations = [
    {
      id: 1,
      name: "Hamza Ahmed",
      image: "/placeholder.svg?height=40&width=40&text=HA",
      lastMessage: "Hey, check out this new workout routine I just posted!",
      time: "2m ago",
      unread: true,
      active: true,
    },
    {
      id: 2,
      name: "Samual Benson",
      image: "/placeholder.svg?height=40&width=40&text=SB",
      lastMessage: "Thanks for the advice on that investment strategy.",
      time: "1h ago",
      unread: true,
      active: false,
    },
    {
      id: 3,
      name: "Latif Skool",
      image: "/placeholder.svg?height=40&width=40&text=LS",
      lastMessage: "I'll be posting a new video tomorrow about mindset.",
      time: "3h ago",
      unread: false,
      active: false,
    },
    {
      id: 4,
      name: "Andrew Heydt",
      image: "/placeholder.svg?height=40&width=40&text=AH",
      lastMessage: "Let me know when you're free to discuss the project.",
      time: "1d ago",
      unread: false,
      active: false,
    },
    {
      id: 5,
      name: "Brad Cassidy",
      image: "/placeholder.svg?height=40&width=40&text=BC",
      lastMessage: "Did you see the latest post about nutrition?",
      time: "2d ago",
      unread: false,
      active: false,
    },
    {
      id: 6,
      name: "Self Improvement Group",
      image: "/placeholder.svg?height=40&width=40&text=SIG",
      lastMessage: "Joel: I found this great book on productivity",
      time: "3d ago",
      unread: false,
      isGroup: true,
      active: false,
    },
  ]

  const initialMessages = {
    1: [
      { id: 1, sender: "them", text: "Hey, how's it going?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Pretty good! Just finished my workout.", time: "10:32 AM" },
      { id: 3, sender: "them", text: "Nice! What did you train today?", time: "10:33 AM" },
      {
        id: 4,
        sender: "me",
        text: "Chest and triceps. Going for that aesthetic physique!",
        time: "10:35 AM",
      },
      {
        id: 5,
        sender: "them",
        text: "That's awesome! Check out this new workout routine I just posted. I think you'll find it really effective for building mass.",
        time: "10:36 AM",
      },
      {
        id: 6,
        sender: "them",
        text: "It's based on progressive overload with a focus on compound movements.",
        time: "10:36 AM",
      },
      { id: 7, sender: "me", text: "Sounds interesting! I'll definitely take a look.", time: "10:38 AM" },
      {
        id: 8,
        sender: "them",
        text: "Great! Let me know what you think after you try it.",
        time: "10:40 AM",
      },
      { id: 9, sender: "me", text: "Will do. Thanks for sharing!", time: "10:41 AM" },
    ],
    2: [
      { id: 1, sender: "me", text: "Hey Sam, what do you think about that tech stock we discussed?", time: "9:20 AM" },
      { id: 2, sender: "them", text: "I actually bought some shares yesterday!", time: "9:25 AM" },
      { id: 3, sender: "me", text: "Great call! How much did you invest?", time: "9:26 AM" },
      { id: 4, sender: "them", text: "Just a small position to start. Thanks for the advice on that investment strategy.", time: "9:30 AM" },
    ],
    3: [
      { id: 1, sender: "them", text: "Have you seen my latest video on morning routines?", time: "Yesterday" },
      { id: 2, sender: "me", text: "Not yet, but I'll check it out tonight", time: "Yesterday" },
      { id: 3, sender: "them", text: "I'll be posting a new video tomorrow about mindset.", time: "3h ago" },
    ]
  }
  
  // State management
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState<Record<number, { id: number; sender: string; text: string; time: string; }[]>>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when they change
  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedConversation, showMobileChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Select a conversation
  interface Conversation {
    id: number;
    name: string;
    image: string;
    lastMessage: string;
    time: string;
    unread: boolean;
    active: boolean;
    isGroup?: boolean;
  }



  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // Update conversations to mark selected as active and no longer unread
    setConversations(conversations.map((conv: Conversation) => ({
      ...conv,
      active: conv.id === conversation.id,
      unread: conv.id === conversation.id ? false : conv.unread
    })));
    
    setShowMobileChat(true);
    
    // Small delay to ensure scrolling after component update
    setTimeout(scrollToBottom, 100);
  };

  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessageObj = {
      id: messages[selectedConversation.id]?.length + 1 || 1,
      sender: "me",
      text: newMessage.trim(),
      time: currentTime
    }

    // Add message to the selected conversation's messages
    setMessages({
      ...messages,
      [selectedConversation.id]: [...(messages[selectedConversation.id] || []), newMessageObj]
    })

    // Update last message in conversations list
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, lastMessage: newMessage.trim(), time: "Just now" } 
        : conv
    ))

    // Clear input
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewMessage(e.target.value)
    
    // Reset height to auto to get the correct scrollHeight
    e.target.style.height = 'auto'
    
    // Set the height to the scrollHeight, but cap it at a reasonable max
    const newHeight = Math.min(e.target.scrollHeight, 120)
    e.target.style.height = `${newHeight}px`
  }

  return (
    <div className="container select-none w-full lg:w-7xl mx-auto py-0">
      <Card className="h-[calc(100svh-80px)] max-w-7xl mx-auto p-0 flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 h-full overflow-hidden">
          {/* Conversations List - Hidden on mobile when chat is open */}
          <div className={`border-r overflow-hidden flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            <CardHeader className="px-4 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
              {/* <Tabs defaultValue="all" className="w-full flex-shrink-0">
                <TabsList className="grid w-full grid-cols-3 px-4 py-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs> */}

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-start gap-3 p-4  cursor-pointer ${
                      conversation.active ? "bg-sky-600/5 border-l-4 border-sky-600" : ""
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.image || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {conversation.isGroup ? (
                        <Badge className="absolute -bottom-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-gray-500">
                          <span className="text-[8px]">G</span>
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${conversation.unread ? "text-gray-600" : "text-gray-700"}`}>
                          {conversation.name}
                        </span>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p
                        className={`text-sm truncate ${conversation.unread ? "font-medium text-gray-400" : "text-gray-500"}`}
                      >
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-lime-600" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Chat Area - Shown conditionally on mobile */}
          <div className={`col-span-2 flex flex-col h-full overflow-hidden ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="border-b p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Back button only on mobile */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={() => setShowMobileChat(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={selectedConversation?.image || "/placeholder.svg"} 
                    alt={selectedConversation?.name} 
                  />
                  <AvatarFallback>
                    {selectedConversation?.name?.substring(0, 2) || "??"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedConversation?.name}</div>
                  <div className="text-xs text-green-500">Online</div>
                </div>
              </div>
              {/* <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </div> */}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="message-container">
              {messages[selectedConversation?.id]?.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-end gap-2 max-w-[70%]">
                    {message.sender === "them" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={selectedConversation?.image || "/placeholder.svg"} 
                          alt={selectedConversation?.name} 
                        />
                        <AvatarFallback>
                          {selectedConversation?.name?.substring(0, 2) || "??"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "me" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 px-1">{message.time}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area - Fixed at bottom */}
            <div className="border-t p-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea 
                  placeholder="Type a message..." 
                  className="flex-1 min-h-10 max-h-32 py-2 resize-none"
                  value={newMessage}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  style={{ height: 'auto' }}
                />
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  className="rounded-full bg-sky-600 hover:bg-sky-700 flex-shrink-0"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}