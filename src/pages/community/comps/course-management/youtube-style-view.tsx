import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, FileText, Play, ChevronRight } from "lucide-react";

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

  selectedLesson,

}: YouTubeStyleViewProps) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(selectedLesson);
  const [activeTab, setActiveTab] = useState<"description" | "resources">("description");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Find the current module for initial accordion state
  const findCurrentModule = (): string => {
    if (!course || !course.modules || !currentLesson) return "";
    const module = course.modules.find(mod => mod.id === currentLesson.module);
    return module ? module.id.toString() : course.modules[0]?.id.toString() || "";
  };

  // Calculate total lessons
  const totalLessons: number = course?.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;

  // Only show resources for the currently active lesson
  const currentLessonResources: Resource[] = currentLesson?.resources?.filter(resource => !resource.is_deleted) || [];

  // Handle lesson navigation
  const handleNextLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.modules
      .flatMap(module => module.lessons || [])
      .sort((a, b) => (a?.order || 0) - (b?.order || 0));
    const currentIndex = allLessons.findIndex(lesson => lesson?.id === currentLesson.id);
    if (currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      if (nextLesson) setCurrentLesson(nextLesson);
    }
  };

  const handlePreviousLesson = () => {
    if (!course || !currentLesson) return;
    const allLessons = course.modules
      .flatMap(module => module.lessons || [])
      .sort((a, b) => (a?.order || 0) - (b?.order || 0));
    const currentIndex = allLessons.findIndex(lesson => lesson?.id === currentLesson.id);
    if (currentIndex > 0) {
      const prevLesson = allLessons[currentIndex - 1];
      if (prevLesson) setCurrentLesson(prevLesson);
    }
  };

  // Clean and select the appropriate video URL
  const getVideoUrl = (lesson: Lesson): string => {
    const url = lesson.video_url;
    if (!url) return "";
    // Clean redundant path in S3 URLs
    if (url.includes("edlern-dev.s3.amazonaws.com")) {
      const parts = url.split("/");
      const fileName = parts.pop()?.split("/")[0] || "";
      return [...parts, fileName].join("/");
    }
    return url;
  };

  // Determine if the URL is a YouTube video
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes("youtu.be") || url.includes("youtube.com");
  };

  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.includes("youtu.be")
      ? url.split("/").pop()?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  console.log('Current lesson:', currentLesson);
  console.log('Current lesson resources:', currentLessonResources);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" aria-live="polite">Loading...</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500" aria-live="assertive">
        {error}
      </div>
    );
  }
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-live="polite">
        No course data or lessons available.
      </div>
    );
  }

  const videoUrl = getVideoUrl(currentLesson);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="w-full lg:w-8/12">
            {/* Video Player Container */}
            <div className="w-full rounded-xl mt-4 overflow-hidden bg-black">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {videoUrl ? (
                  isYouTubeUrl(videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(videoUrl)}
                      className="absolute inset-0 w-full h-full"
                      title={currentLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      className="absolute inset-0 w-full h-full object-contain"
                      title={currentLesson.title}
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
                    No video available for this lesson.
                  </div>
                )}
              </div>
            </div>

            {/* Video Info Section */}
            <div className="py-4">
              <h1 className="text-xl md:text-2xl font-bold">{currentLesson.title}</h1>

              <Separator className="my-4" />

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "description" | "resources")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-0 w-full">
                  <Card className="w-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Button variant="outline" size="sm" className="text-xs gap-1">
                          <BookOpen className="h-3 w-3" /> Lesson {currentLesson.order} of {totalLessons}
                        </Button>
                      </div>

                      <div className="text-sm">
                        <p className="mb-4">{currentLesson.content}</p>
                        <p>
                          This is lesson {currentLesson.order} of the {course.title} course.
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
                              .flatMap(module => module.lessons || [])
                              .sort((a, b) => (a?.order || 0) - (b?.order || 0))[0]?.id === currentLesson.id
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
                              .flatMap(module => module.lessons || [])
                              .sort((a, b) => (a?.order || 0) - (b?.order || 0))
                              .slice(-1)[0]?.id === currentLesson.id
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
                      <div className="mb-2 font-semibold">
                        Resources for: <span className="text-sky-700">{currentLesson.title}</span>
                      </div>
                      {currentLessonResources.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No resources available for this lesson.</p>
                      ) : (
                        <div className="space-y-3">
                          {currentLessonResources.map((resource) => (
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
                <Accordion
                  type="single"
                  defaultValue={findCurrentModule()}
                  collapsible
                  className="w-full"
                >
                  {course.modules.map((module) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id.toString()}
                      className="border-b last:border-0"
                    >
                      <AccordionTrigger className="px-3 py-2 hover:bg-secondary/30 text-sm">
                        <div className="text-left">
                          <span>{module.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-0">
                          {(module.lessons || []).map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-2 px-3 py-2 text-xs hover:bg-secondary/30 cursor-pointer transition-colors ${lesson.id === currentLesson?.id ? "bg-secondary" : ""}`}
                              onClick={() => setCurrentLesson(lesson)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setCurrentLesson(lesson);
                                }
                              }}
                              aria-label={`Select lesson: ${lesson.title}`}
                            >
                              <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                                {lesson.id === currentLesson.id ? (
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