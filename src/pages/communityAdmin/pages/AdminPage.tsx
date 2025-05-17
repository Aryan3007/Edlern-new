"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, BookOpen, ArrowUpRight, ArrowDownRight, UserPlus } from 'lucide-react'
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 

  XAxis, 
  YAxis,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const memberGrowthData = [
  { date: "Jan 1", members: 150200 },
  { date: "Jan 5", members: 152400 },
  { date: "Jan 10", members: 155800 },
  { date: "Jan 15", members: 159300 },
  { date: "Jan 20", members: 164700 },
  { date: "Jan 25", members: 172500 },
  { date: "Jan 30", members: 181842 },
]

const dailyActiveUsersData = [
  { date: "Mon", users: 18420 },
  { date: "Tue", users: 19250 },
  { date: "Wed", users: 21340 },
  { date: "Thu", users: 22780 },
  { date: "Fri", users: 24512 },
  { date: "Sat", users: 23100 },
  { date: "Sun", users: 20800 },
]

const courseEnrollmentData = [
  { name: "Aesthetic Body 2.0", value: 12580 },
  { name: "Full Health Guide", value: 9845 },
  { name: "Start Martial Arts", value: 7632 },
  { name: "Full Dating Guide", value: 6921 },
  { name: "Male Advantage", value: 5487 },
]

const engagementData = [
  { date: "Jan 1", posts: 280, comments: 890 },
  { date: "Jan 5", posts: 310, comments: 950 },
  { date: "Jan 10", posts: 340, comments: 1020 },
  { date: "Jan 15", posts: 370, comments: 1150 },
  { date: "Jan 20", posts: 400, comments: 1280 },
  { date: "Jan 25", posts: 450, comments: 1420 },
  { date: "Jan 30", posts: 490, comments: 1580 },
]

const userSourceData = [
  { source: "Direct", users: 85420 },
  { source: "Referral", users: 45280 },
  { source: "Social", users: 32150 },
  { source: "Search", users: 18992 },
]

const COLORS = ['#0284c7', '#0369a1', '#0ea5e9', '#38bdf8', '#7dd3fc'];

export default function AdminPage() {
  return (
    <div className="space-y-6 max-w-7xl pt-12 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Analytics</h1>
          <p className="text-muted-foreground">Manage your community and monitor performance</p>
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Total Members</p>
              <h3 className="text-3xl font-bold mt-1">181,842</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>12% this month</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-sky-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Active Users</p>
              <h3 className="text-3xl font-bold mt-1">24,512</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>8% this week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-sky-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Course Enrollments</p>
              <h3 className="text-3xl font-bold mt-1">42,368</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <ArrowDownRight className="h-3 w-3" />
                <span>3% this week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-sky-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Posts Created</p>
              <h3 className="text-3xl font-bold mt-1">8,924</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>15% this week</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-sky-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Community Growth</CardTitle>
            <CardDescription>Member growth over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                members: {
                  label: "Members",
                  color: "hsl(203, 89%, 53%)",
                },
              }}
              className="h-[300px]"
            >
              <AreaChart
                accessibilityLayer
                data={memberGrowthData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent />} 
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#0284c7" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMembers)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>Distribution by course</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Enrollments",
                  color: "hsl(203, 89%, 53%)",
                },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={courseEnrollmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#0284c7"
                  dataKey="value"
                >
                  {courseEnrollmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Course
                              </span>
                              <span className="font-bold text-sm">
                                {payload[0].payload.name}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Enrollments
                              </span>
                              <span className="font-bold text-sm">
                                {Number(payload[0].value).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
            <CardDescription>User activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Active Users",
                  color: "hsl(203, 89%, 53%)",
                },
              }}
              className="h-[300px]"
            >
              <BarChart
                accessibilityLayer
                data={dailyActiveUsersData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent />} 
                />
                <Bar 
                  dataKey="users" 
                  fill="#0284c7" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Posts and comments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                posts: {
                  label: "Posts",
                  color: "hsl(203, 89%, 53%)",
                },
                comments: {
                  label: "Comments",
                  color: "hsl(203, 89%, 30%)",
                },
              }}
              className="h-[300px]"
            >
              <LineChart
                accessibilityLayer
                data={engagementData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent />} 
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#0284c7"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#0284c7" }}
                  activeDot={{ r: 6, fill: "#0284c7" }}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#075985"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#075985" }}
                  activeDot={{ r: 6, fill: "#075985" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Acquisition</CardTitle>
            <CardDescription>Members by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                users: {
                  label: "Users",
                  color: "hsl(203, 89%, 53%)",
                },
              }}
              className="h-[300px]"
            >
              <BarChart
                accessibilityLayer
                data={userSourceData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 70, bottom: 0 }}
              >
                <XAxis
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="source"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip 
                  cursor={false} 
                  content={<ChartTooltipContent />} 
                />
                <Bar 
                  dataKey="users" 
                  fill="#0284c7" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>Most active community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Latif Skool",
                  image: "/placeholder.svg?height=40&width=40&text=LS",
                  posts: 156,
                  level: 9,
                },
                {
                  name: "Samual Benson",
                  image: "/placeholder.svg?height=40&width=40&text=SB",
                  posts: 124,
                  level: 8,
                },
                {
                  name: "Andrew Heydt",
                  image: "/placeholder.svg?height=40&width=40&text=AH",
                  posts: 98,
                  level: 7,
                },
                {
                  name: "Brad Cassidy",
                  image: "/placeholder.svg?height=40&width=40&text=BC",
                  posts: 87,
                  level: 6,
                },
                {
                  name: "Joel Morrow",
                  image: "/placeholder.svg?height=40&width=40&text=JM",
                  posts: 76,
                  level: 6,
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
                      <div className="text-sm text-muted-foreground">{user.posts} posts</div>
                    </div>
                  </div>
                  <Badge className="bg-sky-600 hover:bg-sky-700">
                    Level {user.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
