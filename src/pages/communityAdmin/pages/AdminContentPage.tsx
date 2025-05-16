import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash, Pin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage posts, courses, and other content</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Content</CardTitle>
              <CardDescription>Manage your community content</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search content..." className="pl-9 w-full md:w-[250px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="posts">Posts</SelectItem>
                  <SelectItem value="courses">Courses</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
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
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                  <div className="col-span-2">Title</div>
                  <div>Author</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div className="text-right">Actions</div>
                </div>
                {[
                  {
                    title: "🔥 SIGN UP NOW! 🔥 Join the ultimate community for self-improvement",
                    author: "Hamza Ahmed",
                    status: "published",
                    date: "2h ago",
                    pinned: true,
                  },
                  {
                    title: "Netflix, but for self improvement",
                    author: "Hamza Ahmed",
                    status: "published",
                    date: "5h ago",
                  },
                  {
                    title: "✅ THE BEST EXERCISE FOR EACH MUSCLE GROUP",
                    author: "Aaron Barayeyan",
                    status: "published",
                    date: "8h ago",
                  },
                  {
                    title: "Old physique vs New 🔥 🔥 🔥",
                    author: "Sergio Pereira",
                    status: "published",
                    date: "12h ago",
                  },
                  {
                    title: "I want to move out from my parents house",
                    author: "Rahul S",
                    status: "published",
                    date: "1d ago",
                  },
                  {
                    title: "How to stay consistent with your workouts",
                    author: "Brad Cassidy",
                    status: "draft",
                    date: "1d ago",
                  },
                  {
                    title: "My 30-day dopamine detox results",
                    author: "Joel Morrow",
                    status: "pending",
                    date: "2d ago",
                  },
                  {
                    title: "The ultimate morning routine for productivity",
                    author: "Andrew Heydt",
                    status: "published",
                    date: "3d ago",
                  },
                  {
                    title: "How I went from skinny to muscular in 6 months",
                    author: "Charlie Herod",
                    status: "published",
                    date: "4d ago",
                  },
                  {
                    title: "5 books that changed my life",
                    author: "Latif Skool",
                    status: "published",
                    date: "5d ago",
                  },
                ].map((post, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="font-medium truncate">{post.title}</div>
                      {post.pinned && (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        >
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <div className="text-muted-foreground">{post.author}</div>
                    <div>
                      <Badge
                        className={
                          post.status === "published"
                            ? "bg-green-500"
                            : post.status === "draft"
                              ? "bg-gray-500"
                              : "bg-amber-500"
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{post.date}</div>
                    <div className="flex justify-end gap-2">
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
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pin className="mr-2 h-4 w-4" />
                            <span>{post.pinned ? "Unpin" : "Pin"}</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 10 of 124 posts</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                  <div className="col-span-2">Course</div>
                  <div>Instructor</div>
                  <div>Students</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {[
                  {
                    title: "Aesthetic Body 2.0",
                    instructor: "Hamza Ahmed",
                    students: 12580,
                    status: "published",
                  },
                  {
                    title: "Full Health Guide",
                    instructor: "Hamza Ahmed",
                    students: 9845,
                    status: "published",
                  },
                  {
                    title: "Start Martial Arts",
                    instructor: "Aaron Barayeyan",
                    students: 7632,
                    status: "published",
                  },
                  {
                    title: "Full Dating Guide",
                    instructor: "Hamza Ahmed",
                    students: 6921,
                    status: "published",
                  },
                  {
                    title: "Male Advantage",
                    instructor: "1STMAN",
                    students: 5487,
                    status: "published",
                  },
                  {
                    title: "Quit Porn Forever",
                    instructor: "Jak Piggott",
                    students: 4321,
                    status: "published",
                  },
                  {
                    title: "Mindset Mastery",
                    instructor: "Hamza Ahmed",
                    students: 0,
                    status: "draft",
                  },
                ].map((course, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="col-span-2">
                      <div className="font-medium truncate">{course.title}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`/placeholder.svg?height=24&width=24&text=${course.instructor.charAt(0)}`}
                          alt={course.instructor}
                        />
                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{course.instructor}</span>
                    </div>
                    <div className="text-muted-foreground">{course.students.toLocaleString()}</div>
                    <div>
                      <Badge className={course.status === "published" ? "bg-green-500" : "bg-gray-500"}>
                        {course.status}
                      </Badge>
                    </div>
                    <div className="flex justify-end gap-2">
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
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 7 of 12 courses</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-4 bg-secondary/50 font-medium">
                  <div className="col-span-2">Resource</div>
                  <div>Type</div>
                  <div>Author</div>
                  <div>Downloads</div>
                  <div className="text-right">Actions</div>
                </div>
                {[
                  {
                    title: "Workout Tracker Template",
                    type: "Spreadsheet",
                    author: "Hamza Ahmed",
                    downloads: 8742,
                  },
                  {
                    title: "Meal Planning Guide",
                    type: "PDF",
                    author: "Aaron Barayeyan",
                    downloads: 6521,
                  },
                  {
                    title: "Meditation Audio Pack",
                    type: "Audio",
                    author: "Latif Skool",
                    downloads: 4231,
                  },
                  {
                    title: "Goal Setting Worksheet",
                    type: "PDF",
                    author: "Andrew Heydt",
                    downloads: 3876,
                  },
                  {
                    title: "Habit Tracker",
                    type: "App",
                    author: "Brad Cassidy",
                    downloads: 2954,
                  },
                ].map((resource, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
                    <div className="col-span-2">
                      <div className="font-medium truncate">{resource.title}</div>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-secondary text-foreground">
                        {resource.type}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{resource.author}</div>
                    <div className="text-muted-foreground">{resource.downloads.toLocaleString()}</div>
                    <div className="flex justify-end gap-2">
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
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 5 of 18 resources</div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Statistics</CardTitle>
            <CardDescription>Overview of content performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Total Posts</div>
                  <div className="text-3xl font-bold mt-1">8,924</div>
                  <div className="text-green-500 text-sm mt-1">↑ 15% from last month</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Total Courses</div>
                  <div className="text-3xl font-bold mt-1">12</div>
                  <div className="text-green-500 text-sm mt-1">↑ 2 new this month</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Avg. Engagement</div>
                  <div className="text-3xl font-bold mt-1">72%</div>
                  <div className="text-green-500 text-sm mt-1">↑ 8% from last month</div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground text-sm">Content Growth</div>
                  <div className="text-3xl font-bold mt-1">+342</div>
                  <div className="text-green-500 text-sm mt-1">↑ 12% from last month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Content Creators</CardTitle>
            <CardDescription>Members with highest content contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Hamza Ahmed",
                  image: "/placeholder.svg?height=40&width=40&text=HA",
                  posts: 342,
                  courses: 4,
                },
                {
                  name: "Latif Skool",
                  image: "/placeholder.svg?height=40&width=40&text=LS",
                  posts: 156,
                  courses: 1,
                },
                {
                  name: "Aaron Barayeyan",
                  image: "/placeholder.svg?height=40&width=40&text=AB",
                  posts: 124,
                  courses: 1,
                },
                {
                  name: "Andrew Heydt",
                  image: "/placeholder.svg?height=40&width=40&text=AH",
                  posts: 98,
                  courses: 0,
                },
                {
                  name: "Brad Cassidy",
                  image: "/placeholder.svg?height=40&width=40&text=BC",
                  posts: 87,
                  courses: 0,
                },
              ].map((creator, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={creator.image || "/placeholder.svg"} alt={creator.name} />
                      <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{creator.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {creator.posts} posts, {creator.courses} courses
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
