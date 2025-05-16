
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, MoreHorizontal, Plus, Video, BookOpenCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SERVER_URL } from "@/config/config";
import { Course, Lesson, Module } from "./course-types";

interface LessonsTabProps {
  course: Course;
  communityId: number;
  selectedModule: Module | null;
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson | null) => void;
  setSelectedModule: (module: Module | null) => void;
  fetchModuleLessons: (moduleId: number) => Promise<void>;
  fetchLessonResources: (lessonId: number) => Promise<void>;
  loading: boolean;
  getAuthHeaders: (isFormData?: boolean) => HeadersInit;
  onCourseUpdate: (course: Course) => void;
}

export function LessonsTab({
  course,
  communityId,
  selectedModule,
  selectedLesson,
  setSelectedLesson,
  setSelectedModule,
  fetchModuleLessons,
  fetchLessonResources,
  loading,
  getAuthHeaders,
}: LessonsTabProps) {
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState<{
    title: string;
    content: string;
    video_url: string;
    video_uploaded_url: string | null;
    video_file: File | null;
    file_url: string;
    order: number;
    release_date: string;
    is_active: boolean;
    is_deleted: boolean;
    is_uploaded_video_deleted: boolean;
  }>({
    title: "",
    content: "",
    video_url: "",
    video_uploaded_url: null,
    video_file: null,
    file_url: "",
    order: 1,
    release_date: "2025-08-10T10:00:00Z",
    is_active: true,
    is_deleted: false,
    is_uploaded_video_deleted: false,
  });

  const getNextLessonOrder = (): number => {
    if (!selectedModule?.lessons || selectedModule.lessons.length === 0) {
      return 1;
    }

    const maxOrder = Math.max(...selectedModule.lessons.map((lesson: Lesson) => lesson.order));
    return maxOrder + 1;
  };

  const createLesson = async () => {
    if (!course || !selectedModule) {
      setError("No course or module selected. Please try again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", lessonForm.title);
      formData.append("content", lessonForm.content);
      formData.append("video_url", lessonForm.video_url);
      formData.append("order", lessonForm.order.toString());
      formData.append("release_date", lessonForm.release_date);
      formData.append("is_active", lessonForm.is_active.toString());
      formData.append("is_deleted", lessonForm.is_deleted.toString());

      if (lessonForm.video_file) {
        formData.append("video_file", lessonForm.video_file);
      }

      if (lessonForm.video_uploaded_url) {
        formData.append("video_uploaded_url", lessonForm.video_uploaded_url);
      }

      if (lessonForm.file_url) {
        formData.append("file_url", lessonForm.file_url);
      }

      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/${selectedModule.id}/lessons/`,
        {
          method: "POST",
          headers: getAuthHeaders(true),
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Lesson created successfully");
        setLessonForm({
          title: "",
          content: "",
          video_url: "",
          video_uploaded_url: null,
          video_file: null,
          file_url: "",
          order: getNextLessonOrder(),
          release_date: "2025-08-10T10:00:00Z",
          is_active: true,
          is_deleted: false,
          is_uploaded_video_deleted: false,
        });
        setIsCreateLessonOpen(false);

        // Refresh module details to get the updated lessons list
        await fetchModuleLessons(selectedModule.id);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lesson");
      toast.error("Failed to create lesson");
    }
  };

  const deleteLesson = async (lessonId: number) => {
    if (!course || !selectedModule) {
      setError("No course or module selected. Please try again.");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete this lesson? This will also delete all resources within it.")
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/${selectedModule.id}/lessons/${lessonId}/`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );
      if (response.ok) {
        toast.success("Lesson deleted successfully");
        if (selectedLesson?.id === lessonId) {
          setSelectedLesson(null);
        }
        await fetchModuleLessons(selectedModule.id);
      } else {
        throw new Error("Failed to delete lesson");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete lesson");
      toast.error("Failed to delete lesson");
    }
  };

  return (
    <Tabs value="lessons">
      <TabsContent value="lessons" className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Course Lessons</h2>
          <Dialog open={isCreateLessonOpen} onOpenChange={setIsCreateLessonOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={!selectedModule}>
                <Plus className="h-4 w-4 mr-1" />
                Add Lesson
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lesson</DialogTitle>
                <DialogDescription>
                  Add a new lesson to module: {selectedModule?.title ?? "Unknown"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="lesson-title">Lesson Title *</Label>
                  <Input
                    id="lesson-title"
                    placeholder="Enter lesson title"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-content">Content *</Label>
                  <Textarea
                    id="lesson-content"
                    placeholder="Enter lesson content"
                    rows={4}
                    value={lessonForm.content}
                    onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-video">Video URL</Label>
                  <Input
                    id="lesson-video"
                    placeholder="Enter video URL"
                    value={lessonForm.video_url}
                    onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-file-url">File URL</Label>
                  <Input
                    id="lesson-file-url"
                    placeholder="Enter file URL"
                    value={lessonForm.file_url}
                    onChange={(e) => setLessonForm({ ...lessonForm, file_url: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lesson-video-file">Video File</Label>
                  <Input
                    id="lesson-video-file"
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        video_file: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                  {lessonForm.video_file && (
                    <p className="text-sm text-muted-foreground">Selected: {lessonForm.video_file.name}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-order">Order (Auto-assigned: {lessonForm.order})</Label>
                    <Input
                      id="lesson-order"
                      type="number"
                      min="1"
                      value={lessonForm.order}
                      onChange={(e) => setLessonForm({ ...lessonForm, order: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lesson-release">Release Date</Label>
                    <Input
                      id="lesson-release"
                      type="date"
                      value={lessonForm.release_date.split("T")[0]}
                      onChange={(e) =>
                        setLessonForm({
                          ...lessonForm,
                          release_date: `${e.target.value}T10:00:00Z`,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={lessonForm.is_active}
                    onChange={(e) => setLessonForm({ ...lessonForm, is_active: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateLessonOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={createLesson}
                  disabled={loading || !lessonForm.title || !lessonForm.content}
                >
                  {loading ? "Creating..." : "Create Lesson"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Always show the module dropdown */}
          <div className="text-center">
            <Select
              value={selectedModule?.id?.toString()}
              onValueChange={(value) => {
                const module = course.modules?.find((m) => m.id === Number.parseInt(value));
                if (module) {
                  setSelectedModule(module);
                  fetchModuleLessons(module.id);
                }
              }}
            >
              <SelectTrigger className="w-[250px] mx-auto">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent>
                {course.modules?.map((module) => (
                  <SelectItem key={module.id} value={module.id.toString()}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Module content display */}
          {!selectedModule ? (
            <div className="text-center py-8 border rounded-lg">
              <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Select a Module First</h3>
              <p className="text-muted-foreground mt-1">Choose a module to view or add lessons</p>
            </div>
          ) : loading && !selectedModule.lessons ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : selectedModule.lessons && selectedModule.lessons.length > 0 ? (
            <>
              <div className="bg-muted/50 p-3 rounded-lg mb-3">
                <h3 className="font-medium">Module: {selectedModule.title}</h3>
              </div>
              <div className="space-y-3 grid grid-cols-2 gap-4">
                {selectedModule.lessons.map((lesson: Lesson) => (
                  <Card
                    key={lesson.id}
                    className={`${selectedLesson?.id === lesson.id ? "border-primary" : ""}`}
                  >
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{lesson.title}</CardTitle>
                        <CardDescription>Order: {lesson.order}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLesson(lesson);
                            fetchLessonResources(lesson.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Resources
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
                            <DropdownMenuItem>
                              <Video className="mr-2 h-4 w-4" />
                              <span>Preview Video</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => deleteLesson(lesson.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {lesson.content || "No content provided"}
                      </div>
                      {lesson.video_url && (
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground truncate">{lesson.video_url}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={lesson.is_active ? "default" : "secondary"}>
                          {lesson.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Release: {new Date(lesson.release_date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <BookOpenCheck className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Lessons Yet</h3>
              <p className="text-muted-foreground mt-1">Create your first lesson for this module</p>
              <Button className="mt-4" onClick={() => setIsCreateLessonOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Lesson
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}