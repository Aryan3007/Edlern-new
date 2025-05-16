import { Bell, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminNotificationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
   
      <div className="flex-1">
        <div className="flex items-center lg:flex-row flex-col justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications Management</h1>
            <p className="text-muted-foreground">Manage and monitor all system notifications</p>
          </div>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Create New Notification
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search notifications..." className="w-full pl-8" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="course">Course</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {notificationItems.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4">
            {notificationItems
              .filter((item) => item.status === "scheduled")
              .map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
          </TabsContent>
          <TabsContent value="sent" className="space-y-4">
            {notificationItems
              .filter((item) => item.status === "sent")
              .map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
          </TabsContent>
          <TabsContent value="failed" className="space-y-4">
            {notificationItems
              .filter((item) => item.status === "failed")
              .map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function NotificationItem({
  title,
  description,
  type,
  status,
  date,
}: {
  title: string
  description: string
  type: string
  status: string
  date: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "sent"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : status === "scheduled"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {type}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
            {status === "scheduled" && (
              <Button variant="default" size="sm">
                Send Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const notificationItems = [
  {
    title: "New Course Announcement",
    description: "Notification about the new JavaScript Advanced course launch",
    type: "Course",
    status: "scheduled",
    date: "Apr 28, 2025",
  },
  {
    title: "System Maintenance",
    description: "Platform will be down for maintenance on Saturday",
    type: "System",
    status: "sent",
    date: "Apr 24, 2025",
  },
  {
    title: "Community Guidelines Update",
    description: "We've updated our community guidelines",
    type: "System",
    status: "sent",
    date: "Apr 20, 2025",
  },
  {
    title: "Failed Welcome Message",
    description: "Welcome message to new users failed to send",
    type: "User",
    status: "failed",
    date: "Apr 18, 2025",
  },
  {
    title: "Weekly Digest",
    description: "Weekly summary of community activities",
    type: "Content",
    status: "scheduled",
    date: "Apr 30, 2025",
  },
]
