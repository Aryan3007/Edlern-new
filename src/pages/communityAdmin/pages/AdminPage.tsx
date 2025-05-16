import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, BookOpen, ArrowUpRight, ArrowDownRight, MoreHorizontal, UserPlus, Flag } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your community and monitor performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="admin-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Total Members</p>
              <h3 className="text-3xl font-bold mt-1">181,842</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>12% this month</span>
              </div>
            </div>
            <Users className="admin-stat-icon" />
          </div>
        </Card>
        <Card className="admin-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Active Users</p>
              <h3 className="text-3xl font-bold mt-1">24,512</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>8% this week</span>
              </div>
            </div>
            <UserPlus className="admin-stat-icon" />
          </div>
        </Card>
        <Card className="admin-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Course Enrollments</p>
              <h3 className="text-3xl font-bold mt-1">42,368</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <ArrowDownRight className="h-3 w-3" />
                <span>3% this week</span>
              </div>
            </div>
            <BookOpen className="admin-stat-icon" />
          </div>
        </Card>
        <Card className="admin-stat-card p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Posts Created</p>
              <h3 className="text-3xl font-bold mt-1">8,924</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-sky-600">
                <ArrowUpRight className="h-3 w-3" />
                <span>15% this week</span>
              </div>
            </div>
            <FileText className="admin-stat-icon" />
          </div>
        </Card>
      </div>



        <div  className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Community Growth</CardTitle>
                <CardDescription>Member growth over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = 30 + Math.random() * 70
                    return (
                      <div key={i} className="relative group">
                        <div
                          className="w-2 bg-primary/80 rounded-t-sm hover:bg-primary transition-colors"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {Math.floor(height * 10)} users
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest community updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "join", user: "Samual Benson", time: "5 minutes ago" },
                    { type: "post", user: "Latif Skool", time: "15 minutes ago" },
                    { type: "course", user: "Andrew Heydt", time: "1 hour ago" },
                    { type: "report", user: "Brad Cassidy", time: "2 hours ago" },
                    { type: "join", user: "Joel Morrow", time: "3 hours ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          activity.type === "join"
                            ? "bg-sky-100 dark:bg-sky-900"
                            : activity.type === "post"
                              ? "bg-blue-100 dark:bg-blue-900"
                              : activity.type === "course"
                                ? "bg-amber-100 dark:bg-amber-900"
                                : "bg-red-100 dark:bg-red-900"
                        }`}
                      >
                        {activity.type === "join" && (
                          <UserPlus className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                        )}
                        {activity.type === "post" && <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {activity.type === "course" && (
                          <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        )}
                        {activity.type === "report" && <Flag className="h-4 w-4 text-red-600 dark:text-red-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {activity.type === "join" && " joined the community"}
                          {activity.type === "post" && " created a new post"}
                          {activity.type === "course" && " enrolled in a course"}
                          {activity.type === "report" && " reported a post"}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>Most popular courses by enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Aesthetic Body 2.0", enrollments: 12580, growth: 8 },
                    { title: "Full Health Guide", enrollments: 9845, growth: 5 },
                    { title: "Start Martial Arts", enrollments: 7632, growth: 12 },
                    { title: "Full Dating Guide", enrollments: 6921, growth: -2 },
                    { title: "Male Advantage", enrollments: 5487, growth: 3 },
                  ].map((course, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-lg">{i + 1}</div>
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.enrollments.toLocaleString()} enrollments
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          course.growth > 0 ? "text-sky-600 dark:text-sky-400" : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {course.growth > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>{Math.abs(course.growth)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
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
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Level {user.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


    </div>
  )
}
