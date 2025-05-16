import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, MessageSquare, Ban, Flag, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminMessagesPage() {
  return (
    <div className="container py-6">
      <div className="admin-layout">

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Message Management</h1>
              <p className="text-muted-foreground">Monitor and moderate community messages</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Flagged Messages</CardTitle>
                  <CardDescription>Messages that have been flagged for review</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-9 w-full md:w-[250px]" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                  <div className="col-span-2">Message</div>
                  <div>Sender</div>
                  <div>Recipient</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>
                {[
                  {
                    message: "Hey, check out my new product at example.com/product. It's amazing!",
                    sender: {
                      name: "User 123",
                      image: "/placeholder.svg?height=40&width=40&text=U1",
                    },
                    recipient: {
                      name: "Multiple Recipients",
                      image: "/placeholder.svg?height=40&width=40&text=MR",
                    },
                    date: "2h ago",
                    flagReason: "Spam",
                  },
                  {
                    message: "You're such a [redacted]. I can't believe you would say that.",
                    sender: {
                      name: "User 456",
                      image: "/placeholder.svg?height=40&width=40&text=U4",
                    },
                    recipient: {
                      name: "Samual Benson",
                      image: "/placeholder.svg?height=40&width=40&text=SB",
                    },
                    date: "5h ago",
                    flagReason: "Harassment",
                  },
                  {
                    message: "I know where you live. I'm going to [redacted].",
                    sender: {
                      name: "User 789",
                      image: "/placeholder.svg?height=40&width=40&text=U7",
                    },
                    recipient: {
                      name: "Andrew Heydt",
                      image: "/placeholder.svg?height=40&width=40&text=AH",
                    },
                    date: "1d ago",
                    flagReason: "Threats",
                  },
                  {
                    message: "Click this link to get free supplements: example.com/scam",
                    sender: {
                      name: "User 101",
                      image: "/placeholder.svg?height=40&width=40&text=U10",
                    },
                    recipient: {
                      name: "Multiple Recipients",
                      image: "/placeholder.svg?height=40&width=40&text=MR",
                    },
                    date: "2d ago",
                    flagReason: "Spam",
                  },
                  {
                    message: "I'm selling these supplements off-platform. DM me for details.",
                    sender: {
                      name: "User 202",
                      image: "/placeholder.svg?height=40&width=40&text=U20",
                    },
                    recipient: {
                      name: "Brad Cassidy",
                      image: "/placeholder.svg?height=40&width=40&text=BC",
                    },
                    date: "3d ago",
                    flagReason: "Prohibited Sales",
                  },
                ].map((message, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="col-span-2">
                      <div className="font-medium truncate">{message.message}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Flag className="h-3 w-3" />
                        <span>Flagged for: {message.flagReason}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.sender.image || "/placeholder.svg"} alt={message.sender.name} />
                        <AvatarFallback>{message.sender.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate">{message.sender.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.recipient.image || "/placeholder.svg"} alt={message.recipient.name} />
                        <AvatarFallback>{message.recipient.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate">{message.recipient.name}</span>
                    </div>
                    <div className="text-muted-foreground">{message.date}</div>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>View Conversation</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Safe</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Delete Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Ban Sender</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 5 flagged messages</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Statistics</CardTitle>
                <CardDescription>Overview of community messaging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Total Messages (30d)</div>
                      <div className="text-3xl font-bold mt-1">24,512</div>
                      <div className="text-green-500 text-sm mt-1">↑ 8% from last month</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Flagged Messages</div>
                      <div className="text-3xl font-bold mt-1">124</div>
                      <div className="text-red-500 text-sm mt-1">↑ 12% from last month</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Active Conversations</div>
                      <div className="text-3xl font-bold mt-1">3,842</div>
                      <div className="text-green-500 text-sm mt-1">↑ 5% from last month</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Avg. Response Time</div>
                      <div className="text-3xl font-bold mt-1">4.2h</div>
                      <div className="text-amber-500 text-sm mt-1">↑ 10% from last month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Message Senders</CardTitle>
                <CardDescription>Members with highest message activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Latif Skool",
                      image: "/placeholder.svg?height=40&width=40&text=LS",
                      messages: 342,
                      flagged: 0,
                    },
                    {
                      name: "Samual Benson",
                      image: "/placeholder.svg?height=40&width=40&text=SB",
                      messages: 287,
                      flagged: 0,
                    },
                    {
                      name: "User 123",
                      image: "/placeholder.svg?height=40&width=40&text=U1",
                      messages: 256,
                      flagged: 12,
                    },
                    {
                      name: "Andrew Heydt",
                      image: "/placeholder.svg?height=40&width=40&text=AH",
                      messages: 234,
                      flagged: 0,
                    },
                    {
                      name: "User 456",
                      image: "/placeholder.svg?height=40&width=40&text=U4",
                      messages: 198,
                      flagged: 8,
                    },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.messages} messages</div>
                        </div>
                      </div>
                      {user.flagged > 0 && <Badge className="bg-red-500">{user.flagged} flagged</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
