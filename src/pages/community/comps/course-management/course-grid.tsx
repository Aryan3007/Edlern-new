"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash, Pencil } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { SERVER_URL } from "@/config/config"
import { CreateCourseForm } from "./create-course-form"
import { RootState } from "@/store/store"
import { Course } from "./course-types"
import { Link } from "react-router-dom"

interface CourseGridProps {
  userRole: "creator" | "member"
  communityId: number
  onViewCourse: (course: Course) => void
}
interface CourseData {
  title: string;
  description: string;
  // Add other properties as needed
}

export function CourseGrid({ userRole, communityId, onViewCourse }: CourseGridProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalCourses, setTotalCourses] = useState<number>(0)
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const isAdmin = userRole === "creator"

  // Headers with Bearer token
  const getAuthHeaders = (isFormData = false) => {
    const headers: HeadersInit = {}
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }
    if (!isFormData) {
      headers["Content-Type"] = "application/json"
    }
    return headers
  }

  useEffect(() => {
    fetchCourses()
  }, [currentPage, searchQuery, filterCategory])

  const fetchCourses = async () => {
    if (!accessToken) {
      setError("No access token available. Please log in.")
      return
    }

    setLoading(true)
    setError(null)
    try {
      // In a real app, you would add search and filter params to the URL
      const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/`, {
        headers: getAuthHeaders(),
      })
      const data = await response.json()
      if (data.success) {
        const enrichedCourses = data.data.results.map((course: Course) => ({
          ...course,
          instructor: "Hamza Ahmed",
          students: Math.floor(Math.random() * 10000) + 5000,
          rating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),
          reviews: Math.floor(Math.random() * 500) + 100,
          lessons: Math.floor(Math.random() * 20) + 10,
          progress: Math.floor(Math.random() * 100),
          image: `/placeholder.svg?height=200&width=400&text=Course+${course.id}`,
        }))
        setCourses(enrichedCourses)
        setTotalPages(data.data.total_pages)
        setTotalCourses(data.data.count)
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses")
    } finally {
      setLoading(false)
    }
  }

  const deleteCourse = async (courseId: number) => {
    if (!accessToken) {
      setError("No access token available. Please log in.")
      return
    }

    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseId}/`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      if (response.ok) {
        toast.success("Course deleted successfully")
        fetchCourses()
      } else {
        throw new Error("Failed to delete course")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course")
      toast.error("Failed to delete course")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCourse = async (courseData: CourseData): Promise<boolean> => {
    if (!accessToken) {
      setError("No access token available. Please log in.")
      return false
    }
  
    setLoading(true)
    try {
      const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(courseData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Course created successfully")
        setIsCreateCourseOpen(false)
        fetchCourses()
        return true
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create course")
      toast.error("Failed to create course")
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isAdmin ? "Course Management" : "Courses"}</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Create and manage your educational content" : "Browse and learn from our educational content"}
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Course
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New Course</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new course for your community.
                  </DialogDescription>
                </DialogHeader>
                <CreateCourseForm onSubmit={handleCreateCourse} loading={loading} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="mindset">Mindset</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="dating">Dating</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      {loading && courses.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex py-0 gap-1 flex-col h-full">
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={course.image || "/placeholder.svg?height=200&width=400"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <Badge className="absolute top-2 left-2" variant={course.is_published ? "default" : "secondary"}>
                  {course.is_published ? "Published" : "Draft"}
                </Badge>
                {isAdmin && (
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewCourse(course)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View & Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteCourse(course.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
              <CardContent className="p-0 px-4 py-2 flex-grow">
                <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Updated:{" "}
                      {new Date(course.updated_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs font-medium">
                      {course.course_access_type === "free" ? "Free" : "Premium"}
                    </span>
                  </div>
                  {!isAdmin && (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">{course.progress}% Complete</span>
                        {course?.progress !== undefined && course?.progress > 0 && course?.progress < 100 && (
  <span className="text-xs font-medium text-blue-600">In Progress</span>
)}
                        {course.progress === 100 && (
                          <span className="text-xs font-medium text-green-600">Completed</span>
                        )}
                      </div>
                      <Progress value={course.progress} className="h-1" />
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  {isAdmin ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => onViewCourse(course)}>
                        <Pencil className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </>
                  ) : (
                    <Link className="w-full" to={`/${communityId}/community/classroom/${course.id}`}>
                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      
                      >
                        Start Course
{/* {course!.progress === 100 ? "Review" : course.progress > 0 ? "Continue" : "Start Course"}                 */}
    </Button>
                      </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {courses.length} of {totalCourses} courses
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
