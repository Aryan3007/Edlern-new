// "use client"

// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Textarea } from "@/components/ui/textarea"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import {
//   Search,
//   Filter,
//   Plus,
//   MoreHorizontal,
//   Eye,
//   Edit,
//   Trash,
//   BookOpen,
//   Users,
//   Star,
//   FileText,
//   Video,
//   Layers,
//   BookOpenCheck,
//   FileBox,
//   Pencil,
//   Save,
//   ArrowLeft,
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { toast } from "sonner"
// import { SERVER_URL } from "@/config/config"

// // Define RootState type for Redux store
// interface RootState {
//   auth: {
//     accessToken: string | null
//   }
// }

// // Types for API responses and payloads
// interface Course {
//   id: number
//   title: string
//   description: string
//   course_type: string
//   course_access_type: string
//   unlock_level: number
//   course_status: string
//   is_published: boolean
//   release_date: string | null
//   created_at: string
//   updated_at: string
//   community: number
//   creator: string
//   is_active: boolean
//   is_deleted: boolean
//   instructor?: string
//   students?: number
//   rating?: number
//   reviews?: number
//   lessons?: number
//   modules?: Module[]
// }

// interface Module {
//   id: number
//   title: string
//   order: number
//   course: number
//   lessons?: Lesson[]
//   created_at: string
//   updated_at: string
//   is_deleted: boolean
//   is_active: boolean
// }

// interface Lesson {
//   id: number
//   title: string
//   content: string
//   video_url: string
//   order: number
//   release_date: string
//   is_active: boolean
//   is_deleted: boolean
//   module: number
//   resources?: Resource[]
//   created_at: string
//   updated_at: string
// }

// interface Resource {
//   id: number
//   name: string
//   type: string
//   file: string
//   lesson: number
//   created_at: string
//   updated_at: string
//   is_active: boolean
//   is_deleted: boolean
// }

// // Form data interfaces
// interface CourseFormData {
//   title: string
//   description: string
//   course_type: string
//   course_access_type: string
//   unlock_level: number
//   course_status: string
//   is_published: boolean
//   release_date: string
// }

// interface ModuleFormData {
//   title: string
//   order: number
// }

// interface LessonFormData {
//   title: string
//   content: string
//   video_url: string
//   video_uploaded_url: string | null
//   video_file: File | null
//   file_url: string
//   order: number
//   release_date: string
//   is_active: boolean
//   is_deleted: boolean
//   is_uploaded_video_deleted: boolean
// }

// interface ResourceFormData {
//   name: string
//   type: string
//   file: File | null
// }

// export default function CourseAdmin() {
//   const communityId = 16 // From params
//   const accessToken = useSelector((state: RootState) => state.auth.accessToken)
//   const [courses, setCourses] = useState<Course[]>([])
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
//   const [selectedModule, setSelectedModule] = useState<Module | null>(null)
//   const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [totalPages, setTotalPages] = useState<number>(1)
//   const [totalCourses, setTotalCourses] = useState<number>(0)
//   const [isCreateCourseOpen, setIsCreateCourseOpen] = useState<boolean>(false)
//   const [isCreateModuleOpen, setIsCreateModuleOpen] = useState<boolean>(false)
//   const [isCreateLessonOpen, setIsCreateLessonOpen] = useState<boolean>(false)
//   const [isCreateResourceOpen, setIsCreateResourceOpen] = useState<boolean>(false)
//   const [searchQuery, setSearchQuery] = useState<string>("")
//   const [filterCategory, setFilterCategory] = useState<string>("all")
//   const [view, setView] = useState<"courses" | "course-detail">("courses")

//   // Form states
//   const [courseForm, setCourseForm] = useState<CourseFormData>({
//     title: "",
//     description: "",
//     course_type: "self_paced",
//     course_access_type: "free",
//     unlock_level: 1,
//     course_status: "not_started",
//     is_published: true,
//     release_date: "2025-05-08T10:00:00Z",
//   })

//   const [moduleForm, setModuleForm] = useState<ModuleFormData>({ title: "", order: 1 })
//   const [lessonForm, setLessonForm] = useState<LessonFormData>({
//     title: "",
//     content: "",
//     video_url: "",
//     video_uploaded_url: null,
//     video_file: null,
//     file_url: "",
//     order: 1,
//     release_date: "2025-08-10T10:00:00Z",
//     is_active: true,
//     is_deleted: false,
//     is_uploaded_video_deleted: false,
//   })

//   const [resourceForm, setResourceForm] = useState<ResourceFormData>({
//     name: "",
//     type: "docs",
//     file: null,
//   })

//   // Headers with Bearer token
//   const getAuthHeaders = (isFormData = false) => {
//     const headers: HeadersInit = {}
//     if (accessToken) {
//       headers["Authorization"] = `Bearer ${accessToken}`
//     }
//     if (!isFormData) {
//       headers["Content-Type"] = "application/json"
//     }
//     return headers
//   }

//   useEffect(() => {
//     fetchCourses()
//   }, [currentPage, searchQuery, filterCategory])

//   const fetchCourses = async () => {
//     if (!accessToken) {
//       setError("No access token available. Please log in.")
//       return
//     }

//     setLoading(true)
//     setError(null)
//     try {
//       // In a real app, you would add search and filter params to the URL
//       const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/`, {
//         headers: getAuthHeaders(),
//       })
//       const data = await response.json()
//       if (data.success) {
//         const enrichedCourses = data.data.results.map((course: Course) => ({
//           ...course,
//           instructor: "Hamza Ahmed",
//           students: Math.floor(Math.random() * 10000) + 5000,
//           rating: Number((Math.random() * (5.0 - 4.0) + 4.0).toFixed(1)),
//           reviews: Math.floor(Math.random() * 500) + 100,
//           lessons: Math.floor(Math.random() * 20) + 10,
//         }))
//         setCourses(enrichedCourses)
//         setTotalPages(data.data.total_pages)
//         setTotalCourses(data.data.count)
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch courses")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchCourseDetails = async (courseId: number) => {
//     if (!accessToken) {
//       setError("No access token available. Please log in.")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseId}/`, {
//         headers: getAuthHeaders(),
//       })
//       const data = await response.json()
//       if (data.success) {
//         setSelectedCourse(data.data)
//         setView("course-detail")
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch course details")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getNextLessonOrder = () => {
//     if (!selectedModule?.lessons || selectedModule.lessons.length === 0) {
//       return 1
//     }

//     const maxOrder = Math.max(...selectedModule.lessons.map((lesson) => lesson.order))
//     return maxOrder + 1
//   }

//   const fetchModuleLessons = async (moduleId: number) => {
//     if (!accessToken || !selectedCourse) {
//       setError("No access token or course selected. Please try again.")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${moduleId}/`,
//         {
//           headers: getAuthHeaders(),
//         },
//       )
//       const data = await response.json()
//       if (data.success) {
//         // Find and update the selected module with lessons
//         const updatedModules = selectedCourse.modules?.map((module) =>
//           module.id === moduleId ? { ...module, lessons: data.data.lessons } : module,
//         )
//         setSelectedCourse({ ...selectedCourse, modules: updatedModules })

//         // Update the selected module
//         const currentModule = data.data
//         setSelectedModule(currentModule)

//         // Set the next order number for a new lesson
//         const nextOrder =
//           currentModule.lessons && currentModule.lessons.length > 0
//             ? Math.max(...currentModule.lessons.map((lesson) => lesson.order)) + 1
//             : 1

//         setLessonForm((prev) => ({ ...prev, order: nextOrder }))
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch module lessons")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchLessonResources = async (lessonId: number) => {
//     if (!accessToken || !selectedCourse || !selectedModule) {
//       setError("No access token, course, or module selected. Please try again.")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/${lessonId}/resources/`,
//         {
//           headers: getAuthHeaders(),
//         },
//       )
//       const data = await response.json()
//       if (data.success) {
//         // Find the lesson and update its resources
//         const updatedLessons = selectedModule.lessons?.map((lesson) =>
//           lesson.id === lessonId ? { ...lesson, resources: data.data.results } : lesson,
//         )

//         // Update the module with updated lessons
//         const updatedModules = selectedCourse.modules?.map((module) =>
//           module.id === selectedModule.id ? { ...module, lessons: updatedLessons } : module,
//         )

//         setSelectedCourse({ ...selectedCourse, modules: updatedModules })

//         // Find and set the selected lesson
//         const currentLesson = selectedModule.lessons?.find((lesson) => lesson.id === lessonId) || null
//         if (currentLesson) {
//           setSelectedLesson({ ...currentLesson, resources: data.data.results })
//         }
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch lesson resources")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createCourse = async () => {
//     if (!accessToken) {
//       setError("No access token available. Please log in.")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(courseForm),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Course created successfully")
//         setCourseForm({
//           title: "",
//           description: "",
//           course_type: "self_paced",
//           course_access_type: "free",
//           unlock_level: 1,
//           course_status: "not_started",
//           is_published: true,
//           release_date: "2025-05-08T10:00:00Z",
//         })
//         setIsCreateCourseOpen(false)
//         fetchCourses()
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to create course")
//       toast.error("Failed to create course")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createModule = async () => {
//     if (!accessToken || !selectedCourse) {
//       setError("No access token or course selected. Please try again.")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/`,
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(moduleForm),
//         },
//       )
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Module created successfully")
//         setModuleForm({ title: "", order: 1 })
//         setIsCreateModuleOpen(false)

//         // Refresh course details to get the updated modules list
//         fetchCourseDetails(selectedCourse.id)
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to create module")
//       toast.error("Failed to create module")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createLesson = async () => {
//     if (!accessToken || !selectedCourse || !selectedModule) {
//       setError("No access token, course, or module selected. Please try again.")
//       return
//     }

//     setLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append("title", lessonForm.title)
//       formData.append("content", lessonForm.content)
//       formData.append("video_url", lessonForm.video_url)
//       formData.append("order", lessonForm.order.toString())
//       formData.append("release_date", lessonForm.release_date)
//       formData.append("is_active", lessonForm.is_active.toString())
//       formData.append("is_deleted", lessonForm.is_deleted.toString())

//       if (lessonForm.video_file) {
//         formData.append("video_file", lessonForm.video_file)
//       }

//       if (lessonForm.video_uploaded_url) {
//         formData.append("video_uploaded_url", lessonForm.video_uploaded_url)
//       }

//       if (lessonForm.file_url) {
//         formData.append("file_url", lessonForm.file_url)
//       }

//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/`,
//         {
//           method: "POST",
//           headers: getAuthHeaders(true),
//           body: formData,
//         },
//       )
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Lesson created successfully")
//         setLessonForm({
//           title: "",
//           content: "",
//           video_url: "",
//           video_uploaded_url: null,
//           video_file: null,
//           file_url: "",
//           order: getNextLessonOrder(),
//           release_date: "2025-08-10T10:00:00Z",
//           is_active: true,
//           is_deleted: false,
//           is_uploaded_video_deleted: false,
//         })
//         setIsCreateLessonOpen(false)

//         // Refresh module details to get the updated lessons list
//         fetchModuleLessons(selectedModule.id)
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to create lesson")
//       toast.error("Failed to create lesson")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const createResource = async () => {
//     if (!accessToken || !selectedCourse || !selectedModule || !selectedLesson) {
//       setError("No access token, course, module, or lesson selected. Please try again.")
//       return
//     }

//     setLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append("name", resourceForm.name)
//       formData.append("type", resourceForm.type)
//       if (resourceForm.file) formData.append("file", resourceForm.file)

//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/${selectedLesson.id}/resources/`,
//         {
//           method: "POST",
//           headers: getAuthHeaders(true),
//           body: formData,
//         },
//       )
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Resource added successfully")
//         setResourceForm({ name: "", type: "docs", file: null })
//         setIsCreateResourceOpen(false)

//         // Refresh lesson details to get the updated resources list
//         fetchLessonResources(selectedLesson.id)
//       } else {
//         throw new Error(data.message)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to add resource")
//       toast.error("Failed to add resource")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteCourse = async (courseId: number) => {
//     if (!accessToken) {
//       setError("No access token available. Please log in.")
//       return
//     }

//     if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(`${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseId}/`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       })
//       if (response.ok) {
//         toast.success("Course deleted successfully")
//         fetchCourses()
//       } else {
//         throw new Error("Failed to delete course")
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete course")
//       toast.error("Failed to delete course")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteModule = async (moduleId: number) => {
//     if (!accessToken || !selectedCourse) {
//       setError("No access token or course selected. Please try again.")
//       return
//     }

//     if (
//       !window.confirm(
//         "Are you sure you want to delete this module? This will also delete all lessons and resources within it.",
//       )
//     ) {
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${moduleId}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         },
//       )
//       if (response.ok) {
//         toast.success("Module deleted successfully")
//         if (selectedModule?.id === moduleId) {
//           setSelectedModule(null)
//           setSelectedLesson(null)
//         }
//         fetchCourseDetails(selectedCourse.id)
//       } else {
//         throw new Error("Failed to delete module")
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete module")
//       toast.error("Failed to delete module")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteLesson = async (lessonId: number) => {
//     if (!accessToken || !selectedCourse || !selectedModule) {
//       setError("No access token, course, or module selected. Please try again.")
//       return
//     }

//     if (
//       !window.confirm("Are you sure you want to delete this lesson? This will also delete all resources within it.")
//     ) {
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/${lessonId}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         },
//       )
//       if (response.ok) {
//         toast.success("Lesson deleted successfully")
//         if (selectedLesson?.id === lessonId) {
//           setSelectedLesson(null)
//         }
//         fetchModuleLessons(selectedModule.id)
//       } else {
//         throw new Error("Failed to delete lesson")
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete lesson")
//       toast.error("Failed to delete lesson")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteResource = async (resourceId: number) => {
//     if (!accessToken || !selectedCourse || !selectedModule || !selectedLesson) {
//       setError("No access token, course, module, or lesson selected. Please try again.")
//       return
//     }

//     if (!window.confirm("Are you sure you want to delete this resource?")) {
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${selectedCourse.id}/modules/${selectedModule.id}/lessons/${selectedLesson.id}/resources/${resourceId}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         },
//       )
//       if (response.ok) {
//         toast.success("Resource deleted successfully")
//         fetchLessonResources(selectedLesson.id)
//       } else {
//         throw new Error("Failed to delete resource")
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to delete resource")
//       toast.error("Failed to delete resource")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Render the courses grid view
//   const renderCoursesView = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
//           <p className="text-muted-foreground">Create and manage your educational content</p>
//         </div>
//         <div className="flex gap-2">
//           <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Create Course
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[550px]">
//               <DialogHeader>
//                 <DialogTitle>Create New Course</DialogTitle>
//                 <DialogDescription>
//                   Fill in the details below to create a new course for your community.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="title">Course Title</Label>
//                   <Input
//                     id="title"
//                     placeholder="Enter course title"
//                     value={courseForm.title}
//                     onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     placeholder="Enter course description"
//                     rows={4}
//                     value={courseForm.description}
//                     onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="course_type">Course Type</Label>
//                     <Select
//                       value={courseForm.course_type}
//                       onValueChange={(value) => setCourseForm({ ...courseForm, course_type: value })}
//                     >
//                       <SelectTrigger id="course_type">
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="self_paced">Self-paced</SelectItem>
//                         <SelectItem value="instructor_led">Instructor-led</SelectItem>
//                         <SelectItem value="hybrid">Hybrid</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="course_access_type">Access Type</Label>
//                     <Select
//                       value={courseForm.course_access_type}
//                       onValueChange={(value) => setCourseForm({ ...courseForm, course_access_type: value })}
//                     >
//                       <SelectTrigger id="course_access_type">
//                         <SelectValue placeholder="Select access" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="free">Free</SelectItem>
//                         <SelectItem value="premium">Premium</SelectItem>
//                         <SelectItem value="subscription">Subscription</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="unlock_level">Unlock Level</Label>
//                     <Input
//                       id="unlock_level"
//                       type="number"
//                       min="1"
//                       value={courseForm.unlock_level}
//                       onChange={(e) => setCourseForm({ ...courseForm, unlock_level: Number(e.target.value) })}
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="course_status">Status</Label>
//                     <Select
//                       value={courseForm.course_status}
//                       onValueChange={(value) => setCourseForm({ ...courseForm, course_status: value })}
//                     >
//                       <SelectTrigger id="course_status">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="not_started">Not Started</SelectItem>
//                         <SelectItem value="in_progress">In Progress</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     id="is_published"
//                     checked={courseForm.is_published}
//                     onChange={(e) => setCourseForm({ ...courseForm, is_published: e.target.checked })}
//                     className="h-4 w-4 rounded border-gray-300"
//                   />
//                   <Label htmlFor="is_published">Publish immediately</Label>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={createCourse} disabled={loading || !courseForm.title}>
//                   {loading ? "Creating..." : "Create Course"}
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search courses..."
//             className="pl-9 w-full"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Select value={filterCategory} onValueChange={setFilterCategory}>
//           <SelectTrigger className="w-full md:w-[180px]">
//             <SelectValue placeholder="Category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             <SelectItem value="fitness">Fitness</SelectItem>
//             <SelectItem value="mindset">Mindset</SelectItem>
//             <SelectItem value="productivity">Productivity</SelectItem>
//             <SelectItem value="dating">Dating</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button variant="outline" className="gap-2 w-full md:w-auto">
//           <Filter className="h-4 w-4" />
//           More Filters
//         </Button>
//       </div>

//       {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

//       {loading && courses.length === 0 ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <Card key={course.id} className="overflow-hidden flex py-0 gap-1 flex-col h-full">
//               <div className="aspect-video w-full overflow-hidden relative">
//                 <img
//                   src="/placeholder.svg?height=200&width=400"
//                   alt={course.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <Badge className="absolute top-2 left-2" variant={course.is_published ? "default" : "secondary"}>
//                   {course.is_published ? "Published" : "Draft"}
//                 </Badge>
//                 <div className="absolute top-2 right-2">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => fetchCourseDetails(course.id)}>
//                         <Eye className="mr-2 h-4 w-4" />
//                         <span>View & Edit</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem>
//                         <Edit className="mr-2 h-4 w-4" />
//                         <span>Edit Details</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-500" onClick={() => deleteCourse(course.id)}>
//                         <Trash className="mr-2 h-4 w-4" />
//                         <span>Delete</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//               <CardContent className="p-0 px-4 py-2 flex-grow">
//                 <h3 className="font-semibold text-lg line-clamp-1">{course.title}</h3>
//                 <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</p>

//                 {/* <div className="flex items-center gap-2 mt-3">
//                   <Avatar className="h-6 w-6">
//                     <AvatarImage
//                       src={`/placeholder.svg?height=24&width=24&text=${course.instructor?.charAt(0)}`}
//                       alt={course.instructor}
//                     />
//                     <AvatarFallback>{course.instructor?.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <span className="text-sm">{course.instructor}</span>
//                 </div> */}

//                 {/* <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
//                   <div className="flex items-center gap-1">
//                     <BookOpen className="h-4 w-4 text-muted-foreground" />
//                     <span>{course.lessons}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                     <span>{course.students?.toLocaleString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
//                     <span>{course.rating}</span>
//                   </div>
//                 </div> */}

//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-xs text-muted-foreground">
//                       Updated:{" "}
//                       {new Date(course.updated_at).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                     <span className="text-xs font-medium">
//                       {course.course_access_type === "free" ? "Free" : "Premium"}
//                     </span>
//                   </div>
//                   {/* <Progress
//                     value={
//                       course.course_status === "completed" ? 100 : course.course_status === "in_progress" ? 50 : 10
//                     }
//                     className="h-1"
//                   /> */}
//                 </div>
//               </CardContent>
//               <CardFooter className="p-4 pt-0">
//                 <div className="flex gap-2 w-full">
//                   <Button variant="outline" size="sm" className="flex-1" onClick={() => fetchCourseDetails(course.id)}>
//                     <Pencil className="h-4 w-4 mr-1" />
//                     Manage
//                   </Button>
//                   <Button size="sm" className="flex-1">
//                     <Eye className="h-4 w-4 mr-1" />
//                     Preview
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}

//       <div className="flex justify-between items-center mt-6">
//         <div className="text-sm text-muted-foreground">
//           Showing {courses.length} of {totalCourses} courses
//         </div>
//         <div className="flex gap-1">
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === 1 || loading}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             disabled={currentPage === totalPages || loading}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   )

//   // Render the course detail view with modules, lessons, and resources
//   const renderCourseDetailView = () => {
//     if (!selectedCourse) return null

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => {
//               setView("courses")
//               setSelectedCourse(null)
//               setSelectedModule(null)
//               setSelectedLesson(null)
//             }}
//           >
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to Courses
//           </Button>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">{selectedCourse.title}</h1>
//             <p className="text-muted-foreground">{selectedCourse.description}</p>
//           </div>
         
//         </div>

//         {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

//         <Tabs defaultValue="modules" className="w-full">
//           <TabsList className="grid w-full max-w-xl grid-cols-3">
//             <TabsTrigger value="modules" className="flex items-center gap-1">
//               <Layers className="h-4 w-4" />
//               Modules
//             </TabsTrigger>
//             <TabsTrigger value="lessons" className="flex items-center gap-1">
//               <BookOpenCheck className="h-4 w-4" />
//               Lessons
//             </TabsTrigger>
//             <TabsTrigger value="resources" className="flex items-center gap-1">
//               <FileBox className="h-4 w-4" />
//               Resources
//             </TabsTrigger>
//           </TabsList>

//           {/* Modules Tab */}
//           <TabsContent value="modules" className="space-y-4 pt-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Course Modules</h2>
            
//                 <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
//                 <DialogTrigger asChild>
//                   <Button size="sm">
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Module
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Create New Module</DialogTitle>
//                     <DialogDescription>Add a new module to your course.</DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="module-title">Module Title</Label>
//                       <Input
//                         id="module-title"
//                         placeholder="Enter module title"
//                         value={moduleForm.title}
//                         onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="module-order">Order</Label>
//                       <Input
//                         id="module-order"
//                         type="number"
//                         min="1"
//                         placeholder="Module order"
//                         value={moduleForm.order}
//                         onChange={(e) => setModuleForm({ ...moduleForm, order: Number(e.target.value) })}
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button variant="outline" onClick={() => setIsCreateModuleOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button onClick={createModule} disabled={loading || !moduleForm.title}>
//                       {loading ? "Creating..." : "Create Module"}
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog> 
//               </div>
       

//             {loading && !selectedCourse.modules ? (
//               <div className="flex justify-center items-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
//                   selectedCourse.modules.map((module) => (
//                     <Card key={module.id}>
//                       <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                         <div>
//                           <CardTitle className="text-base">{module.title}</CardTitle>
//                           <CardDescription>Order: {module.order}</CardDescription>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => {
//                               setSelectedModule(module)
//                               fetchModuleLessons(module.id)
//                             }}
//                           >
//                             <Eye className="h-4 w-4 mr-1" />
//                             View Lessons
//                           </Button>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon" className="h-8 w-8">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 <span>Edit</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem className="text-red-500" onClick={() => deleteModule(module.id)}>
//                                 <Trash className="mr-2 h-4 w-4" />
//                                 <span>Delete</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-4 pt-0">
//                         <div className="text-sm text-muted-foreground">
//                           {module.lessons ? `${module.lessons.length} lessons` : "No lessons yet"}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 border rounded-lg">
//                     <Layers className="h-12 w-12 mx-auto text-muted-foreground" />
//                     <h3 className="mt-4 text-lg font-medium">No Modules Yet</h3>
//                     <p className="text-muted-foreground mt-1">Create your first module to get started</p>
//                     <Button className="mt-4" onClick={() => setIsCreateModuleOpen(true)}>
//                       <Plus className="h-4 w-4 mr-1" />
//                       Add Module
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </TabsContent>

//           {/* Lessons Tab */}
//           <TabsContent value="lessons" className="space-y-4 pt-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Course Lessons</h2>
//               <Dialog open={isCreateLessonOpen} onOpenChange={setIsCreateLessonOpen}>
//                 <DialogTrigger asChild>
//                   <Button size="sm" disabled={!selectedModule}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Lesson
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Create New Lesson</DialogTitle>
//                     <DialogDescription>Add a new lesson to module: {selectedModule?.title}</DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-title">Lesson Title *</Label>
//                       <Input
//                         id="lesson-title"
//                         placeholder="Enter lesson title"
//                         value={lessonForm.title}
//                         onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-content">Content *</Label>
//                       <Textarea
//                         id="lesson-content"
//                         placeholder="Enter lesson content"
//                         rows={4}
//                         value={lessonForm.content}
//                         onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-video">Video URL</Label>
//                       <Input
//                         id="lesson-video"
//                         placeholder="Enter video URL"
//                         value={lessonForm.video_url}
//                         onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-file-url">File URL</Label>
//                       <Input
//                         id="lesson-file-url"
//                         placeholder="Enter file URL"
//                         value={lessonForm.file_url}
//                         onChange={(e) => setLessonForm({ ...lessonForm, file_url: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-video-file">Video File</Label>
//                       <Input
//                         id="lesson-video-file"
//                         type="file"
//                         accept="video/*"
//                         onChange={(e) =>
//                           setLessonForm({
//                             ...lessonForm,
//                             video_file: e.target.files ? e.target.files[0] : null,
//                           })
//                         }
//                       />
//                       {lessonForm.video_file && (
//                         <p className="text-sm text-muted-foreground">Selected: {lessonForm.video_file.name}</p>
//                       )}
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="lesson-video-uploaded-url">Video Uploaded URL</Label>
//                       <Input
//                         id="lesson-video-uploaded-url"
//                         placeholder="Enter video uploaded URL"
//                         value={lessonForm.video_uploaded_url || ""}
//                         onChange={(e) => setLessonForm({ ...lessonForm, video_uploaded_url: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="grid gap-2">
//                         <Label htmlFor="lesson-order">Order (Auto-assigned: {lessonForm.order})</Label>
//                         <Input
//                           id="lesson-order"
//                           type="number"
//                           min="1"
//                           value={lessonForm.order}
//                           onChange={(e) => setLessonForm({ ...lessonForm, order: Number(e.target.value) })}
//                         />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor="lesson-release">Release Date</Label>
//                         <Input
//                           id="lesson-release"
//                           type="date"
//                           value={lessonForm.release_date.split("T")[0]}
//                           onChange={(e) =>
//                             setLessonForm({
//                               ...lessonForm,
//                               release_date: `${e.target.value}T10:00:00Z`,
//                             })
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         id="is_active"
//                         checked={lessonForm.is_active}
//                         onChange={(e) => setLessonForm({ ...lessonForm, is_active: e.target.checked })}
//                         className="h-4 w-4 rounded border-gray-300"
//                       />
//                       <Label htmlFor="is_active">Active</Label>
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button variant="outline" onClick={() => setIsCreateLessonOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button onClick={createLesson} disabled={loading || !lessonForm.title || !lessonForm.content}>
//                       {loading ? "Creating..." : "Create Lesson"}
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <div className="space-y-4">
//               {/* Always show the module dropdown */}
//               <div className="text-center">
//                 <Select
//                   value={selectedModule?.id.toString()}
//                   onValueChange={(value) => {
//                     const module = selectedCourse.modules?.find((m) => m.id === Number.parseInt(value));
//                     if (module) {
//                       setSelectedModule(module);
//                       fetchModuleLessons(module.id);
//                     }
//                   }}
//                 >
//                   <SelectTrigger className="w-[250px] mx-auto">
//                     <SelectValue placeholder="Select a module" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {selectedCourse.modules?.map((module) => (
//                       <SelectItem key={module.id} value={module.id.toString()}>
//                         {module.title}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Module content display */}
//               {!selectedModule ? (
//                 <div className="text-center py-8 border rounded-lg">
//                   <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground" />
//                   <h3 className="mt-4 text-lg font-medium">Select a Module First</h3>
//                   <p className="text-muted-foreground mt-1">Choose a module to view or add lessons</p>
//                 </div>
//               ) : loading && !selectedModule.lessons ? (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//                 </div>
//               ) : selectedModule.lessons && selectedModule.lessons.length > 0 ? (
//                 <>
//              <div className="bg-muted/50 p-3 rounded-lg mb-3">
//                     <h3 className="font-medium">Module: {selectedModule.title}</h3>
//                   </div>
//                 <div className="space-y-3 grid grid-cols-2 gap-4">
                 
//                   {selectedModule.lessons.map((lesson) => (
//                     <Card key={lesson.id} className={`${selectedLesson?.id === lesson.id ? "border-primary" : ""}`}>
//                       <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                         <div>
//                           <CardTitle className="text-base">{lesson.title}</CardTitle>
//                           <CardDescription>Order: {lesson.order}</CardDescription>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => {
//                               setSelectedLesson(lesson);
//                               fetchLessonResources(lesson.id);
//                             }}
//                           >
//                             <Eye className="h-4 w-4 mr-1" />
//                             View Resources
//                           </Button>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon" className="h-8 w-8">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 <span>Edit</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem>
//                                 <Video className="mr-2 h-4 w-4" />
//                                 <span>Preview Video</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem className="text-red-500" onClick={() => deleteLesson(lesson.id)}>
//                                 <Trash className="mr-2 h-4 w-4" />
//                                 <span>Delete</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-4 pt-0">
//                         <div className="text-sm text-muted-foreground line-clamp-2">
//                           {lesson.content || "No content provided"}
//                         </div>
//                         {lesson.video_url && (
//                           <div className="flex items-center gap-2 mt-2 text-sm">
//                             <Video className="h-4 w-4 text-muted-foreground" />
//                             <span className="text-muted-foreground truncate">{lesson.video_url}</span>
//                           </div>
//                         )}
//                         <div className="flex items-center justify-between mt-2">
//                           <Badge variant={lesson.is_active ? "default" : "secondary"}>
//                             {lesson.is_active ? "Active" : "Inactive"}
//                           </Badge>
//                           <span className="text-xs text-muted-foreground">
//                             Release: {new Date(lesson.release_date).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>    </>
//               ) : (
//                 <div className="text-center py-8 border rounded-lg">
//                   <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground" />
//                   <h3 className="mt-4 text-lg font-medium">No Lessons Yet</h3>
//                   <p className="text-muted-foreground mt-1">Create your first lesson for this module</p>
//                   <Button className="mt-4" onClick={() => setIsCreateLessonOpen(true)}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Lesson
//                   </Button>
//                 </div>
//               )}
//             </div>

//           </TabsContent>

//           {/* Resources Tab */}
//           <TabsContent value="resources" className="space-y-4 pt-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Lesson Resources</h2>
//               <Dialog open={isCreateResourceOpen} onOpenChange={setIsCreateResourceOpen}>
//                 <DialogTrigger asChild>
//                   <Button size="sm" disabled={!selectedLesson}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Resource
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Add New Resource</DialogTitle>
//                     <DialogDescription>Add a new resource to lesson: {selectedLesson?.title}</DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="resource-name">Resource Name</Label>
//                       <Input
//                         id="resource-name"
//                         placeholder="Enter resource name"
//                         value={resourceForm.name}
//                         onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="resource-type">Resource Type</Label>
//                       <Select
//                         value={resourceForm.type}
//                         onValueChange={(value) => setResourceForm({ ...resourceForm, type: value })}
//                       >
//                         <SelectTrigger id="resource-type">
//                           <SelectValue placeholder="Select type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="docs">Document</SelectItem>
//                           <SelectItem value="video">Video</SelectItem>
//                           <SelectItem value="audio">Audio</SelectItem>
//                           <SelectItem value="image">Image</SelectItem>
//                           <SelectItem value="link">External Link</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="resource-file">File</Label>
//                       <Input
//                         id="resource-file"
//                         type="file"
//                         onChange={(e) =>
//                           setResourceForm({
//                             ...resourceForm,
//                             file: e.target.files ? e.target.files[0] : null,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button variant="outline" onClick={() => setIsCreateResourceOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button onClick={createResource} disabled={loading || !resourceForm.name}>
//                       {loading ? "Adding..." : "Add Resource"}
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <div className="space-y-3">
//               {!selectedLesson ? (
//                 <div className="text-center py-8 border rounded-lg">
//                   <FileBox className="h-12 w-12 mx-auto text-muted-foreground" />
//                   <h3 className="mt-4 text-lg font-medium">Select a Lesson First</h3>
//                   <p className="text-muted-foreground mt-1">Choose a lesson to view or add resources</p>

//                   {selectedModule ? (
//                     <Select
//                       onValueChange={(value) => {
//                         const lesson = selectedModule.lessons?.find((l) => l.id === Number.parseInt(value))
//                         if (lesson) {
//                           setSelectedLesson(lesson)
//                           fetchLessonResources(lesson.id)
//                         }
//                       }}
//                     >
//                       <SelectTrigger className="w-[250px] mx-auto mt-4">
//                         <SelectValue placeholder="Select a lesson" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {selectedModule.lessons?.map((lesson) => (
//                           <SelectItem key={lesson.id} value={lesson.id.toString()}>
//                             {lesson.title}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <p className="mt-4 text-sm text-muted-foreground">Please select a module first</p>
//                   )}
//                 </div>
//               ) : loading && !selectedLesson.resources ? (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//                 </div>
//               ) : selectedLesson.resources && selectedLesson.resources.length > 0 ? (
//                 <div>
//                   <div className="bg-muted/50 p-3 rounded-lg mb-3">
//                     <h3 className="font-medium">Lesson: {selectedLesson.title}</h3>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {selectedLesson.resources.map((resource) => (
//                       <Card key={resource.id}>
//                         <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                           <div className="flex items-center gap-2">
//                             {resource.type === "docs" && <FileText className="h-5 w-5 text-blue-500" />}
//                             {resource.type === "video" && <Video className="h-5 w-5 text-red-500" />}
//                             {resource.type === "audio" && <FileText className="h-5 w-5 text-purple-500" />}
//                             {resource.type === "image" && <FileText className="h-5 w-5 text-green-500" />}
//                             {resource.type === "link" && <FileText className="h-5 w-5 text-orange-500" />}
//                             <CardTitle className="text-base">{resource.name}</CardTitle>
//                           </div>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon" className="h-8 w-8">
//                                 <MoreHorizontal className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               <DropdownMenuItem>
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 <span>View</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuItem>
//                                 <Edit className="mr-2 h-4 w-4" />
//                                 <span>Edit</span>
//                               </DropdownMenuItem>
//                               <DropdownMenuSeparator />
//                               <DropdownMenuItem className="text-red-500" onClick={() => deleteResource(resource.id)}>
//                                 <Trash className="mr-2 h-4 w-4" />
//                                 <span>Delete</span>
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </CardHeader>
//                         <CardContent className="p-4 pt-0">
//                           <div className="flex items-center justify-between">
//                             <Badge variant="outline">{resource.type}</Badge>
//                             <span className="text-xs text-muted-foreground">
//                               Added: {new Date(resource.created_at).toLocaleDateString()}
//                             </span>
//                           </div>
//                           {resource.file && (
//                             <div className="mt-2 text-sm truncate text-muted-foreground">{resource.file}</div>
//                           )}
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 border rounded-lg">
//                   <FileBox className="h-12 w-12 mx-auto text-muted-foreground" />
//                   <h3 className="mt-4 text-lg font-medium">No Resources Yet</h3>
//                   <p className="text-muted-foreground mt-1">Add resources to enhance this lesson</p>
//                   <Button className="mt-4" onClick={() => setIsCreateResourceOpen(true)}>
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Resource
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     )
//   }

//   return <div className="container py-6">{view === "courses" ? renderCoursesView() : renderCourseDetailView()}</div>
// }

const AdminCoursesPage = () => {
  return (
    <div>AdminCoursesPage</div>
  )
}

export default AdminCoursesPage