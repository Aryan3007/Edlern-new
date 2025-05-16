"use client"

import { useState } from "react"
import { CourseGrid } from "./course-grid"
import { CourseDetail } from "./course-detail"
import { Course, Lesson, Module } from "./course-types"

interface CourseManagementProps {
  userRole: "creator" | "member"
  communityId: number
}

export function CourseManagement({ userRole, communityId }: CourseManagementProps) {
  const [view, setView] = useState<"courses" | "course-detail">("courses")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course)
    setView("course-detail")
  }

  const handleBackToCourses = () => {
    setView("courses")
    setSelectedCourse(null)
    setSelectedModule(null)
    setSelectedLesson(null)
  }

  return (
    <>
      {view === "courses" ? (
        <CourseGrid userRole={userRole} communityId={communityId} onViewCourse={handleViewCourse} />
      ) : (
        <CourseDetail
          userRole={userRole}
          communityId={communityId}
          course={selectedCourse}
          onBack={handleBackToCourses}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />
      )}
    </>
  )
}
