"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CourseFormData {
  title: string
  description: string
  course_type: string
  course_access_type: string
  unlock_level: number
  course_status: string
  is_published: boolean
  release_date: string
}

interface CreateCourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<boolean>
  loading: boolean
}

export function CreateCourseForm({ onSubmit, loading }: CreateCourseFormProps) {
  const [courseForm, setCourseForm] = useState<CourseFormData>({
    title: "",
    description: "",
    course_type: "self_paced",
    course_access_type: "free",
    unlock_level: 1,
    course_status: "not_started",
    is_published: true,
    release_date: "2025-05-08T10:00:00Z",
  })

  const handleSubmit = async () => {
    await onSubmit(courseForm)
  }

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            placeholder="Enter course title"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter course description"
            rows={4}
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="course_type">Course Type</Label>
            <Select
              value={courseForm.course_type}
              onValueChange={(value) => setCourseForm({ ...courseForm, course_type: value })}
            >
              <SelectTrigger id="course_type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self_paced">Self-paced</SelectItem>
                <SelectItem value="instructor_led">Instructor-led</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course_access_type">Access Type</Label>
            <Select
              value={courseForm.course_access_type}
              onValueChange={(value) => setCourseForm({ ...courseForm, course_access_type: value })}
            >
              <SelectTrigger id="course_access_type">
                <SelectValue placeholder="Select access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="unlock_level">Unlock Level</Label>
            <Input
              id="unlock_level"
              type="number"
              min="1"
              value={courseForm.unlock_level}
              onChange={(e) => setCourseForm({ ...courseForm, unlock_level: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course_status">Status</Label>
            <Select
              value={courseForm.course_status}
              onValueChange={(value) => setCourseForm({ ...courseForm, course_status: value })}
            >
              <SelectTrigger id="course_status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_published"
            checked={courseForm.is_published}
            onChange={(e) => setCourseForm({ ...courseForm, is_published: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="is_published">Publish immediately</Label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading || !courseForm.title}>
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </>
  )
}
