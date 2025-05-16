"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, FileText, Play, ChevronRight, ArrowLeft } from "lucide-react";
import { Course, Module, Lesson, Resource } from "./course-types";

interface YouTubeStyleViewProps {
  course: Course;
  onBack: () => void;
  selectedModule: Module | null;
  setSelectedModule: (module: Module | null) => void;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson | null) => void;
  fetchModuleLessons: (moduleId: number) => Promise<void>;
  fetchLessonResources: (lessonId: number) => Promise<void>;
}

export function YouTubeStyleView({
  course,
  onBack,
  setSelectedModule,
  selectedLesson,
  setSelectedLesson,
  fetchModuleLessons,
  fetchLessonResources,
}: YouTubeStyleViewProps) {
  const [activeTab, setActiveTab] = useState<"description" | "resources">("description");
  const [sidebarOpen] = useState(window.innerWidth >= 1024);

  // Find the current module for initial accordion state
  const findCurrentModule = (): string => {
    if (!course?.modules || !selectedLesson) return "";
    const module = course.modules.find((mod) => mod.id === selectedLesson.module);
    return module ? module.id.toString() : course.modules[0]?.id.toString() || "";
  };

  // Calculate total lessons
  const totalLessons: number =
    course?.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;

  // Aggregate all resources from lessons
  const allResources: Resource[] = selectedLesson?.resources || [];

  // Handle lesson navigation
  const handleNextLesson = async () => {
    if (!course || !selectedLesson) return;
    const allLessons = course.modules
      .flatMap((module: Module) => module.lessons || [])
      .sort((a: Lesson, b: Lesson) => a.order - b.order);
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === selectedLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      setSelectedLesson(nextLesson);
      if (nextLesson.module !== selectedLesson.module) {
        const nextModule = course.modules.find((module) => module.id === nextLesson.module);
        if (nextModule) {
          setSelectedModule(nextModule);
          await fetchModuleLessons(nextModule.id);
        }
      }
      await fetchLessonResources(nextLesson.id);
    }
  };

  const handlePreviousLesson = async () => {
    if (!course || !selectedLesson) return;
    const allLessons = course.modules
      .flatMap((module: Module) => module.lessons || [])
      .sort((a: Lesson, b: Lesson) => a.order - b.order);
    const currentIndex = allLessons.findIndex((lesson) => lesson.id === selectedLesson.id);
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      setSelectedLesson(prevLesson);
      if (prevLesson.module !== selectedLesson.module) {
        const prevModule = course.modules.find((module) => module.id === prevLesson.module);
        if (prevModule) {
          setSelectedModule(prevModule);
          await fetchModuleLessons(prevModule.id);
        }
      }
      await fetchLessonResources(prevLesson.id);
    }
  };

  // If no lesson is selected, select the first one
  if (
    !selectedLesson &&
    course.modules &&
    course.modules.length > 0 &&
    course.modules[0].lessons &&
    course.modules[0].lessons.length > 0
  ) {
    const firstModule = course.modules[0];
    const firstLesson = firstModule?.lessons?.[0];
    setSelectedModule(firstModule);
    if (firstLesson) {
      setSelectedLesson(firstLesson);
      fetchLessonResources(firstLesson.id);
    }  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Courses
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="w-full lg:w-8/12">
            {selectedLesson ? (
              <>
                {/* Video Player Container */}
                <div className="w-full rounded-xl overflow-hidden bg-black">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={selectedLesson.video_url || "/placeholder.svg?height=480&width=854&text=Video+Player"}
                        alt={selectedLesson.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="icon"
                          className="h-16 w-16 rounded-full bg-sky-600/90 hover:bg-sky-600"
                          aria-label="Play video"
                        >
                          <Play className="h-8 w-8 text-sky-600-foreground" fill="currentColor" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info Section */}
                <div className="py-4">
                  <h1 className="text-xl md:text-2xl font-bold">{selectedLesson.title}</h1>

                  <Separator className="my-4" />

                  {/* Tabs */}
                  <Tabs
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as "description" | "resources")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-0 w-full">
                      <Card className="w-full">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                              <BookOpen className="h-3 w-3" /> Lesson {selectedLesson.order} of {totalLessons}
                            </Button>
                          </div>

                          <div className="text-sm">
                            <p className="mb-4">{selectedLesson.content || "No content available."}</p>
                            <p>
                              This is lesson {selectedLesson.order} of the {course.title} course.
                            </p>
                          </div>

                          <div className="flex justify-between mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              onClick={handlePreviousLesson}
                              disabled={
                                course.modules
                                  ?.flatMap((module: Module) => module.lessons || [])
                                  .sort((a: Lesson, b: Lesson) => a.order - b.order)[0]?.id ===
                                selectedLesson.id
                              }
                              aria-label="Previous lesson"
                            >
                              <ChevronRight className="h-4 w-4 rotate-180" />
                              Previous Lesson
                            </Button>
                            <Button
                              size="sm"
                              className="gap-2"
                              onClick={handleNextLesson}
                              disabled={
                                course.modules
                                  ?.flatMap((module: Module) => module.lessons || [])
                                  .sort((a: Lesson, b: Lesson) => a.order - b.order)
                                  .slice(-1)[0]?.id === selectedLesson.id
                              }
                              aria-label="Next lesson"
                            >
                              Next Lesson
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-0 w-full">
                      <Card className="w-full">
                        <CardContent className="p-4">
                          {allResources.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No resources available.</p>
                          ) : (
                            <div className="space-y-3">
                              {allResources.map((resource: Resource) => (
                                <div
                                  key={resource.id}
                                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-sky-600" />
                                    <div>
                                      <div className="font-medium">{resource.name}</div>
                                      <div className="text-xs text-muted-foreground">{resource.type}</div>
                                    </div>
                                  </div>
                                  {resource.file && (
  <Button
    variant="outline"
    size="sm"
    className="gap-1"
    onClick={() => window.open(resource.file ?? '', "_blank")}
    aria-label={`Download ${resource.name}`}
  >
    <FileText className="h-4 w-4" />
    Download
  </Button>
)}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <p className="text-muted-foreground">Select a lesson to start learning</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12 relative">
            <div className={`mt-2 lg:mt-4 ${sidebarOpen || window.innerWidth < 1024 ? "block" : "hidden lg:block"}`}>
              {/* Playlist */}
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="p-3 bg-secondary/50 flex items-center justify-between">
                  <h3 className="font-medium">Course Playlist</h3>
                  <div className="text-xs text-muted-foreground">{totalLessons} lessons</div>
                </div>

                {/* Course Content Accordion */}
                <Accordion type="single" defaultValue={findCurrentModule()} collapsible className="w-full">
                  {course.modules?.map((module: Module) => (
                    <AccordionItem key={module.id} value={module.id.toString()} className="border-b last:border-0">
                      <AccordionTrigger className="px-3 py-2 hover:bg-secondary/30 text-sm">
                        <div className="text-left">
                          <span>{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-0">
                          {module.lessons?.map((lesson: Lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary/30 cursor-pointer transition-colors ${
                                selectedLesson?.id === lesson.id ? "bg-secondary" : ""
                              }`}
                              onClick={() => {
                                setSelectedLesson(lesson);
                                fetchLessonResources(lesson.id);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setSelectedLesson(lesson);
                                  fetchLessonResources(lesson.id);
                                }
                              }}
                              aria-label={`Select lesson: ${lesson.title}`}
                            >
                              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                {selectedLesson?.id === lesson.id ? (
                                  <Play className="h-4 w-4 text-sky-600" fill="currentColor" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{lesson.title}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
