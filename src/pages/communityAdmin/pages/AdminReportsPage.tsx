import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, Ban, Flag, AlertTriangle, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminReportsPage() {
  return (
    <div className="container py-6">
      <div className="admin-layout">
       
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Reports Management</h1>
              <p className="text-muted-foreground">Review and handle reported content</p>
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
                  <CardTitle>Reported Content</CardTitle>
                  <CardDescription>Review and moderate reported content</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search reports..." className="pl-9 w-full md:w-[250px]" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="all">All Reports</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">Content</div>
                      <div>Reported By</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        content: "This is spam content trying to sell products",
                        contentType: "post",
                        author: "User 123",
                        reportedBy: "Samual Benson",
                        reason: "Spam",
                        status: "pending",
                        date: "2h ago",
                        severity: "high",
                      },
                      {
                        content: "Inappropriate comment with offensive language",
                        contentType: "comment",
                        author: "User 456",
                        reportedBy: "Andrew Heydt",
                        reason: "Harassment",
                        status: "pending",
                        date: "5h ago",
                        severity: "high",
                      },
                      {
                        content: "Misleading information about supplements",
                        contentType: "post",
                        author: "User 789",
                        reportedBy: "Brad Cassidy",
                        reason: "Misinformation",
                        status: "pending",
                        date: "1d ago",
                        severity: "medium",
                      },
                      {
                        content: "Duplicate post from the same user",
                        contentType: "post",
                        author: "User 101",
                        reportedBy: "Joel Morrow",
                        reason: "Spam",
                        status: "resolved",
                        date: "2d ago",
                        severity: "low",
                      },
                      {
                        content: "Self-promotion without community contribution",
                        contentType: "post",
                        author: "User 202",
                        reportedBy: "Charlie Herod",
                        reason: "Self-promotion",
                        status: "dismissed",
                        date: "3d ago",
                        severity: "medium",
                      },
                      {
                        content: "User sending unsolicited messages to multiple members",
                        contentType: "user",
                        author: "User 303",
                        reportedBy: "Multiple users",
                        reason: "Harassment",
                        status: "pending",
                        date: "4d ago",
                        severity: "high",
                      },
                      {
                        content: "Comment containing personal attacks",
                        contentType: "comment",
                        author: "User 404",
                        reportedBy: "Latif Skool",
                        reason: "Harassment",
                        status: "resolved",
                        date: "5d ago",
                        severity: "high",
                      },
                      {
                        content: "Post containing potentially harmful advice",
                        contentType: "post",
                        author: "User 505",
                        reportedBy: "Hamza Ahmed",
                        reason: "Harmful Content",
                        status: "pending",
                        date: "6d ago",
                        severity: "high",
                      },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-7 p-4 border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium truncate">{report.content}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {report.contentType === "post" ? (
                              <Flag className="h-3 w-3" />
                            ) : report.contentType === "comment" ? (
                              <MessageSquare className="h-3 w-3" />
                            ) : (
                              <AlertTriangle className="h-3 w-3" />
                            )}
                            <span>
                              {report.contentType === "post"
                                ? "Post"
                                : report.contentType === "comment"
                                  ? "Comment"
                                  : "User"}{" "}
                              by {report.author}
                            </span>
                          </div>
                        </div>
                        <div className="text-muted-foreground">{report.reportedBy}</div>
                        <div>
                          <Badge
                            className={
                              report.reason === "Harassment"
                                ? "bg-red-500"
                                : report.reason === "Spam"
                                  ? "bg-amber-500"
                                  : report.reason === "Misinformation"
                                    ? "bg-blue-500"
                                    : report.reason === "Self-promotion"
                                      ? "bg-purple-500"
                                      : "bg-red-500"
                            }
                          >
                            {report.reason}
                          </Badge>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              report.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                : report.status === "resolved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{report.date}</div>
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
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Content</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Remove Content</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Ban User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="posts">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">Post</div>
                      <div>Reported By</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        content: "This is spam content trying to sell products",
                        author: "User 123",
                        reportedBy: "Samual Benson",
                        reason: "Spam",
                        status: "pending",
                        date: "2h ago",
                        severity: "high",
                      },
                      {
                        content: "Misleading information about supplements",
                        author: "User 789",
                        reportedBy: "Brad Cassidy",
                        reason: "Misinformation",
                        status: "pending",
                        date: "1d ago",
                        severity: "medium",
                      },
                      {
                        content: "Duplicate post from the same user",
                        author: "User 101",
                        reportedBy: "Joel Morrow",
                        reason: "Spam",
                        status: "resolved",
                        date: "2d ago",
                        severity: "low",
                      },
                      {
                        content: "Self-promotion without community contribution",
                        author: "User 202",
                        reportedBy: "Charlie Herod",
                        reason: "Self-promotion",
                        status: "dismissed",
                        date: "3d ago",
                        severity: "medium",
                      },
                      {
                        content: "Post containing potentially harmful advice",
                        author: "User 505",
                        reportedBy: "Hamza Ahmed",
                        reason: "Harmful Content",
                        status: "pending",
                        date: "6d ago",
                        severity: "high",
                      },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-7 p-4 border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium truncate">{report.content}</div>
                          <div className="text-xs text-muted-foreground">By: {report.author}</div>
                        </div>
                        <div className="text-muted-foreground">{report.reportedBy}</div>
                        <div>
                          <Badge
                            className={
                              report.reason === "Harassment"
                                ? "bg-red-500"
                                : report.reason === "Spam"
                                  ? "bg-amber-500"
                                  : report.reason === "Misinformation"
                                    ? "bg-blue-500"
                                    : report.reason === "Self-promotion"
                                      ? "bg-purple-500"
                                      : "bg-red-500"
                            }
                          >
                            {report.reason}
                          </Badge>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              report.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                : report.status === "resolved"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{report.date}</div>
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
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Content</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Remove Content</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comments">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">Comment</div>
                      <div>Reported By</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        content: "Inappropriate comment with offensive language",
                        author: "User 456",
                        reportedBy: "Andrew Heydt",
                        reason: "Harassment",
                        status: "pending",
                        date: "5h ago",
                        severity: "high",
                      },
                      {
                        content: "Comment containing personal attacks",
                        author: "User 404",
                        reportedBy: "Latif Skool",
                        reason: "Harassment",
                        status: "resolved",
                        date: "5d ago",
                        severity: "high",
                      },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-7 p-4 border-t items-center">
                        <div className="col-span-2">
                          <div className="font-medium truncate">{report.content}</div>
                          <div className="text-xs text-muted-foreground">By: {report.author}</div>
                        </div>
                        <div className="text-muted-foreground">{report.reportedBy}</div>
                        <div>
                          <Badge className="bg-red-500">{report.reason}</Badge>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              report.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{report.date}</div>
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
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Content</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Remove Content</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="users">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 p-4 bg-secondary/50 font-medium">
                      <div className="col-span-2">User</div>
                      <div>Reported By</div>
                      <div>Reason</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        user: {
                          name: "User 303",
                          image: "/placeholder.svg?height=40&width=40&text=U3",
                        },
                        content: "User sending unsolicited messages to multiple members",
                        reportedBy: "Multiple users",
                        reason: "Harassment",
                        status: "pending",
                        date: "4d ago",
                        severity: "high",
                      },
                    ].map((report, i) => (
                      <div key={i} className="grid grid-cols-7 p-4 border-t items-center">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={report.user.image || "/placeholder.svg"} alt={report.user.name} />
                            <AvatarFallback>{report.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{report.user.name}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{report.content}</div>
                          </div>
                        </div>
                        <div className="text-muted-foreground">{report.reportedBy}</div>
                        <div>
                          <Badge className="bg-red-500">{report.reason}</Badge>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground">{report.date}</div>
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
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Profile</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Ban className="mr-2 h-4 w-4" />
                                <span>Ban User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 8 reports</div>
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
                <CardTitle>Report Statistics</CardTitle>
                <CardDescription>Overview of reported content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Total Reports</div>
                      <div className="text-3xl font-bold mt-1">124</div>
                      <div className="text-red-500 text-sm mt-1">↑ 15% from last month</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Pending Reports</div>
                      <div className="text-3xl font-bold mt-1">42</div>
                      <div className="text-amber-500 text-sm mt-1">↑ 8% from last week</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Resolved Reports</div>
                      <div className="text-3xl font-bold mt-1">68</div>
                      <div className="text-green-500 text-sm mt-1">↑ 12% from last month</div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <div className="text-muted-foreground text-sm">Avg. Resolution Time</div>
                      <div className="text-3xl font-bold mt-1">4.2h</div>
                      <div className="text-green-500 text-sm mt-1">↓ 15% from last month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Types</CardTitle>
                <CardDescription>Distribution of report reasons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { reason: "Harassment", count: 42, percentage: 34 },
                    { reason: "Spam", count: 28, percentage: 23 },
                    { reason: "Misinformation", count: 22, percentage: 18 },
                    { reason: "Self-promotion", count: 18, percentage: 14 },
                    { reason: "Harmful Content", count: 14, percentage: 11 },
                  ].map((report) => (
                    <div key={report.reason} className="space-y-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{report.reason}</div>
                        <div className="text-muted-foreground">{report.count} reports</div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            report.reason === "Harassment"
                              ? "bg-red-500"
                              : report.reason === "Spam"
                                ? "bg-amber-500"
                                : report.reason === "Misinformation"
                                  ? "bg-blue-500"
                                  : report.reason === "Self-promotion"
                                    ? "bg-purple-500"
                                    : "bg-red-500"
                          }`}
                          style={{ width: `${report.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">{report.percentage}% of total</div>
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
