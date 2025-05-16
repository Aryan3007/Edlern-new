"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Layers, BookOpenCheck, FileBox } from "lucide-react";
import { SERVER_URL } from "@/config/config";
import { Course, Module, Lesson } from "./course-types";
import { RootState } from "@/store/store";
import { YouTubeStyleView } from "./youtube-style-view";
import { ModulesTab } from "./modules-tab";
import { LessonsTab } from "./lessons-tab";
import { ResourcesTab } from "./resources-tab";

interface CourseDetailProps {
  userRole: "creator" | "member";
  communityId: number;
  course: Course | null;
  onBack: () => void;
  selectedModule: Module | null;
  setSelectedModule: (module: Module | null) => void;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson | null) => void;
}

export function CourseDetail({
  userRole,
  communityId,
  course,
  onBack,
  selectedModule,
  setSelectedModule,
  selectedLesson,
  setSelectedLesson,
}: CourseDetailProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(course);
  const isAdmin = userRole === "creator";

  // Headers with Bearer token
  const getAuthHeaders = (isFormData = false) => {
    const headers: HeadersInit = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  };

  useEffect(() => {
    if (course) {
      fetchCourseDetails(course.id);
    }
  }, [course]);

  const fetchCourseDetails = async (courseId: number) => {
    if (!accessToken) {
      setError("No access token available. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseId}/`,
        {
          headers: getAuthHeaders(),
        }
      );
      const data = await response.json();
      if (data.success) {
        setCourseData(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course details");
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleLessons = async (moduleId: number) => {
    if (!accessToken || !courseData) {
      setError("No access token or course selected. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseData.id}/modules/${moduleId}/`,
        {
          headers: getAuthHeaders(),
        }
      );
      const data = await response.json();
      if (data.success) {
        // Find and update the selected module with lessons
        const updatedModules = courseData.modules?.map((module) =>
          module.id === moduleId ? { ...module, lessons: data.data.lessons } : module
        );
        setCourseData({ ...courseData, modules: updatedModules });

        // Update the selected module
        const currentModule: Module = data.data;
        setSelectedModule(currentModule);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch module lessons");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonResources = async (lessonId: number) => {
    if (!accessToken || !courseData || !selectedModule) {
      setError("No access token, course, or module selected. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${courseData.id}/modules/${selectedModule.id}/lessons/${lessonId}/resources/`,
        {
          headers: getAuthHeaders(),
        }
      );
      const data = await response.json();
      if (data.success) {
        // Find the lesson and update its resources
        const updatedLessons = selectedModule.lessons?.map((lesson: Lesson) =>
          lesson.id === lessonId ? { ...lesson, resources: data.data.results } : lesson
        );

        // Update the module with updated lessons
        const updatedModules = courseData.modules?.map((module) =>
          module.id === selectedModule.id ? { ...module, lessons: updatedLessons } : module
        );

        setCourseData({ ...courseData, modules: updatedModules });

        // Find and set the selected lesson
        const currentLesson = selectedModule.lessons?.find((lesson: Lesson) => lesson.id === lessonId) || null;
        if (currentLesson) {
          setSelectedLesson({ ...currentLesson, resources: data.data.results });
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch lesson resources");
    } finally {
      setLoading(false);
    }
  };

  if (!courseData) return null;

  // For regular users, show the YouTube-style view
  if (!isAdmin) {
    return (
      <YouTubeStyleView
        course={courseData}
        onBack={onBack}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        fetchModuleLessons={fetchModuleLessons}
        fetchLessonResources={fetchLessonResources}
      />
    );
  }

  // For admins, show the management view
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{courseData.title}</h1>
          <p className="text-muted-foreground">{courseData.description}</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>}

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="modules" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-1">
            <BookOpenCheck className="h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <FileBox className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <ModulesTab
          course={courseData}
          communityId={communityId}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          fetchModuleLessons={fetchModuleLessons}
          loading={loading}
          getAuthHeaders={getAuthHeaders}
          onCourseUpdate={(updatedCourse: Course) => setCourseData(updatedCourse)}
        />

        <LessonsTab
          course={courseData}
          communityId={communityId}
          selectedModule={selectedModule}
          setSelectedModule={setSelectedModule}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          fetchModuleLessons={fetchModuleLessons}
          fetchLessonResources={fetchLessonResources}
          loading={loading}
          getAuthHeaders={getAuthHeaders}
          onCourseUpdate={(updatedCourse: Course) => setCourseData(updatedCourse)}
        />

        <ResourcesTab
          course={courseData}
          communityId={communityId}
          selectedModule={selectedModule}
          selectedLesson={selectedLesson}
          fetchLessonResources={fetchLessonResources}
          loading={loading}
          getAuthHeaders={getAuthHeaders}
          onCourseUpdate={(updatedCourse: Course) => setCourseData(updatedCourse)}
        />
      </Tabs>
    </div>
  );
}