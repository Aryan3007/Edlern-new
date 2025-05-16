import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, MoreHorizontal, CheckCircle2, Ban, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Member Management</h1>
          <p className="text-muted-foreground">Manage and monitor community members</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            Email Members
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Members</CardTitle>
              <CardDescription>Showing 181,842 total members</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search members..." className="pl-9 w-full md:w-[250px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-4 bg-secondary/50 font-medium">
              <div className="col-span-2">Member</div>
              <div>Level</div>
              <div>Status</div>
              <div>Joined</div>
              <div>Last Active</div>
              <div className="text-right">Actions</div>
            </div>
            {[
              {
                name: "Latif Skool",
                image: "/placeholder.svg?height=40&width=40&text=LS",
                email: "latif@example.com",
                level: 9,
                status: "active",
                joined: "Mar 2022",
                lastActive: "2 hours ago",
              },
              {
                name: "Samual Benson",
                image: "/placeholder.svg?height=40&width=40&text=SB",
                email: "samual@example.com",
                level: 8,
                status: "active",
                joined: "Apr 2022",
                lastActive: "5 minutes ago",
              },
              {
                name: "Andrew Heydt",
                image: "/placeholder.svg?height=40&width=40&text=AH",
                email: "andrew@example.com",
                level: 7,
                status: "active",
                joined: "May 2022",
                lastActive: "1 day ago",
              },
              {
                name: "Brad Cassidy",
                image: "/placeholder.svg?height=40&width=40&text=BC",
                email: "brad@example.com",
                level: 6,
                status: "inactive",
                joined: "Jun 2022",
                lastActive: "2 weeks ago",
              },
              {
                name: "Joel Morrow",
                image: "/placeholder.svg?height=40&width=40&text=JM",
                email: "joel@example.com",
                level: 6,
                status: "active",
                joined: "Jul 2022",
                lastActive: "3 days ago",
              },
              {
                name: "Charlie Herod",
                image: "/placeholder.svg?height=40&width=40&text=CH",
                email: "charlie@example.com",
                level: 5,
                status: "active",
                joined: "Aug 2022",
                lastActive: "1 week ago",
              },
              {
                name: "Nelson Rodriguez",
                image: "/placeholder.svg?height=40&width=40&text=NR",
                email: "nelson@example.com",
                level: 5,
                status: "active",
                joined: "Sep 2022",
                lastActive: "12 hours ago",
              },
              {
                name: "Moiz Abbasi",
                image: "/placeholder.svg?height=40&width=40&text=MA",
                email: "moiz@example.com",
                level: 4,
                status: "banned",
                joined: "Oct 2022",
                lastActive: "1 month ago",
              },
              {
                name: "Lorenzo Bertotti",
                image: "/placeholder.svg?height=40&width=40&text=LB",
                email: "lorenzo@example.com",
                level: 4,
                status: "active",
                joined: "Nov 2022",
                lastActive: "4 days ago",
              },
              {
                name: "Douglas W",
                image: "/placeholder.svg?height=40&width=40&text=DW",
                email: "douglas@example.com",
                level: 3,
                status: "active",
                joined: "Dec 2022",
                lastActive: "2 days ago",
              },
            ].map((member, i) => (
              <div key={i} className="grid grid-cols-7 p-4 border-t items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Level {member.level}
                  </Badge>
                </div>
                <div>
                  <Badge
                    className={
                      member.status === "active"
                        ? "bg-green-500"
                        : member.status === "inactive"
                          ? "bg-gray-500"
                          : "bg-red-500"
                    }
                  >
                    {member.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground">{member.joined}</div>
                <div className="text-muted-foreground">{member.lastActive}</div>
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
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Send Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        <span>Make Admin</span>
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
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Showing 10 of 181,842 members</div>
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
            <CardTitle>Member Statistics</CardTitle>
            <CardDescription>Overview of member activity and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">New Members (30d)</div>
                  <div className="text-3xl font-bold mt-1">+12,458</div>
                  <div className="text-green-500 text-sm mt-1">↑ 12% from last month</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Active Members</div>
                  <div className="text-3xl font-bold mt-1">24,512</div>
                  <div className="text-green-500 text-sm mt-1">↑ 8% from last week</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Engagement Rate</div>
                  <div className="text-3xl font-bold mt-1">68%</div>
                  <div className="text-green-500 text-sm mt-1">↑ 5% from last month</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Avg. Session Time</div>
                  <div className="text-3xl font-bold mt-1">18m 42s</div>
                  <div className="text-green-500 text-sm mt-1">↑ 2% from last week</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Levels</CardTitle>
            <CardDescription>Distribution of members by level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: 1, count: 145672, percentage: 80 },
                { level: 2, count: 18245, percentage: 10 },
                { level: 3, count: 9092, percentage: 5 },
                { level: 4, count: 5455, percentage: 3 },
                { level: 5, count: 1818, percentage: 1 },
                { level: "6+", count: 1560, percentage: 1 },
              ].map((level) => (
                <div key={level.level} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Level {level.level}</div>
                    <div className="text-muted-foreground">{level.count.toLocaleString()} members</div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${level.percentage}%` }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">{level.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
