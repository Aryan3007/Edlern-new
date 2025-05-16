import { Flag, Search, Shield, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminModerationPage() {
  return (
    <div className="flex min-h-screen bg-background">
     
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
            <p className="text-muted-foreground">Review and moderate reported content and user behavior</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Moderation Settings
            </Button>
            <Button>
              <Flag className="mr-2 h-4 w-4" />
              View All Reports
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="w-full pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
              <SelectItem value="comments">Comments</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="messages">Messages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
            <TabsTrigger value="automated">Automated Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-4">
            {moderationItems
              .filter((item) => item.status === "pending")
              .map((item, index) => (
                <ModerationItem key={index} {...item} />
              ))}
          </TabsContent>
          <TabsContent value="resolved" className="space-y-4">
            {moderationItems
              .filter((item) => item.status === "resolved")
              .map((item, index) => (
                <ModerationItem key={index} {...item} />
              ))}
          </TabsContent>
          <TabsContent value="escalated" className="space-y-4">
            {moderationItems
              .filter((item) => item.status === "escalated")
              .map((item, index) => (
                <ModerationItem key={index} {...item} />
              ))}
          </TabsContent>
          <TabsContent value="automated" className="space-y-4">
            {moderationItems
              .filter((item) => item.status === "automated")
              .map((item, index) => (
                <ModerationItem key={index} {...item} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ModerationItem({
  title,
  description,
  type,
  status,
  reportedBy,
  date,
  reportCount,
}: {
  title: string
  description: string
  type: string
  status: string
  reportedBy: string
  date: string
  reportCount: number
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "resolved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : status === "escalated"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {type}
            </span>
            <span className="text-sm">
              Reported by: <span className="font-medium">{reportedBy}</span>
            </span>
            <span className="text-sm">
              Report count: <span className="font-medium">{reportCount}</span>
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View Content
            </Button>
            {status === "pending" && (
              <>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
                <Button variant="destructive" size="sm">
                  <UserX className="mr-2 h-4 w-4" />
                  Take Action
                </Button>
              </>
            )}
            {status === "escalated" && (
              <Button variant="default" size="sm">
                Resolve
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const moderationItems = [
  {
    title: "Inappropriate Comment",
    description: "User reported a comment containing offensive language",
    type: "Comment",
    status: "pending",
    reportedBy: "john_doe",
    date: "Apr 24, 2025",
    reportCount: 3,
  },
  {
    title: "Spam Post",
    description: "Multiple users reported a post as spam content",
    type: "Post",
    status: "resolved",
    reportedBy: "moderator_system",
    date: "Apr 23, 2025",
    reportCount: 7,
  },
  {
    title: "Harassment in Messages",
    description: "User reported receiving harassing private messages",
    type: "Message",
    status: "escalated",
    reportedBy: "sarah_smith",
    date: "Apr 22, 2025",
    reportCount: 1,
  },
  {
    title: "Plagiarized Course Content",
    description: "Report of copied content from another platform",
    type: "Course",
    status: "pending",
    reportedBy: "instructor_mike",
    date: "Apr 21, 2025",
    reportCount: 2,
  },
  {
    title: "Automated Spam Detection",
    description: "System detected potential spam account",
    type: "User",
    status: "automated",
    reportedBy: "system",
    date: "Apr 20, 2025",
    reportCount: 1,
  },
]
