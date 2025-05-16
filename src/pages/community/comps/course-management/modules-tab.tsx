"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Edit, Trash, MoreHorizontal, Plus, Layers } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"
import { SERVER_URL } from "@/config/config"
import { Course } from "./course-types"

interface ModulesTabProps {
  course: Course
  communityId: number
  selectedModule: any
  setSelectedModule: (module: any) => void
  fetchModuleLessons: (moduleId: number) => Promise<void>
  loading: boolean
  getAuthHeaders: (isFormData?: boolean) => HeadersInit
  onCourseUpdate: (course: Course) => void
}

export function ModulesTab({
  course,
  communityId,
  selectedModule,
  setSelectedModule,
  fetchModuleLessons,
  loading,
  getAuthHeaders,
  onCourseUpdate,
}: ModulesTabProps) {
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState<boolean>(false)
  const [moduleForm, setModuleForm] = useState<{ title: string; order: number }>({ title: "", order: 1 })
  const [error, setError] = useState<string | null>(null)

  const createModule = async () => {
    if (!course) {
      setError("No course selected. Please try again.")
      return
    }

    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(moduleForm),
        },
      )
      const data = await response.json()
      if (data.success) {
        toast.success("Module created successfully")
        setModuleForm({ title: "", order: 1 })
        setIsCreateModuleOpen(false)

        // Add the new module to the course
        const updatedCourse = {
          ...course,
          modules: [...(course.modules || []), data.data],
        }
        onCourseUpdate(updatedCourse)
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create module")
      toast.error("Failed to create module")
    }
  }

  const deleteModule = async (moduleId: number) => {
    if (!course) {
      setError("No course selected. Please try again.")
      return
    }

    if (
      !window.confirm(
        "Are you sure you want to delete this module? This will also delete all lessons and resources within it.",
      )
    ) {
      return
    }

    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/${moduleId}/`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        },
      )
      if (response.ok) {
        toast.success("Module deleted successfully")
        if (selectedModule?.id === moduleId) {
          setSelectedModule(null)
        }

        // Remove the deleted module from the course
        const updatedCourse = {
          ...course,
          modules: course.modules.filter((module) => module.id !== moduleId),
        }
        onCourseUpdate(updatedCourse)
      } else {
        throw new Error("Failed to delete module")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete module")
      toast.error("Failed to delete module")
    }
  }

  return (
    <TabsContent value="modules" className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course Modules</h2>
        <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Module
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Module</DialogTitle>
              <DialogDescription>Add a new module to your course.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="module-title">Module Title</Label>
                <Input
                  id="module-title"
                  placeholder="Enter module title"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="module-order">Order</Label>
                <Input
                  id="module-order"
                  type="number"
                  min="1"
                  placeholder="Module order"
                  value={moduleForm.order}
                  onChange={(e) => setModuleForm({ ...moduleForm, order: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModuleOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createModule} disabled={loading || !moduleForm.title}>
                {loading ? "Creating..." : "Create Module"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      {loading && !course.modules ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {course.modules && course.modules.length > 0 ? (
            course.modules.map((module) => (
              <Card key={module.id}>
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{module.title}</CardTitle>
                    <CardDescription>Order: {module.order}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedModule(module)
                        fetchModuleLessons(module.id)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Lessons
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => deleteModule(module.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm text-muted-foreground">
                    {module.lessons ? `${module.lessons.length} lessons` : "No lessons yet"}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <Layers className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Modules Yet</h3>
              <p className="text-muted-foreground mt-1">Create your first module to get started</p>
              <Button className="mt-4" onClick={() => setIsCreateModuleOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Module
              </Button>
            </div>
          )}
        </div>
      )}
    </TabsContent>
  )
}
