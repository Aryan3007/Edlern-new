"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, MoreHorizontal, Plus, FileBox, FileText } from "lucide-react";
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
import { Course, Module, Lesson, Resource } from "./course-types";

interface ResourcesTabProps {
  course: Course;
  communityId: number;
  selectedModule: Module | null;
  selectedLesson: Lesson | null;
  fetchLessonResources: (lessonId: number) => Promise<void>;
  loading: boolean;
  getAuthHeaders: (isFormData?: boolean) => HeadersInit;
  onCourseUpdate: (course: Course) => void;
}

export function ResourcesTab({
  course,
  communityId,
  selectedModule,
  selectedLesson,
  fetchLessonResources,
  loading,
  getAuthHeaders,
}: ResourcesTabProps) {
  const [isCreateResourceOpen, setIsCreateResourceOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resourceForm, setResourceForm] = useState<{
    name: string;
    type: "docs" | "video" | "audio" | "image" | "link";
    file: File | null;
  }>({
    name: "",
    type: "docs",
    file: null,
  });

  const createResource = async () => {
    if (!course || !selectedModule || !selectedLesson) {
      setError("No course, module, or lesson selected. Please try again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", resourceForm.name);
      formData.append("type", resourceForm.type);
      if (resourceForm.file) formData.append("file", resourceForm.file);

      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/${selectedModule.id}/lessons/${selectedLesson.id}/resources/`,
        {
          method: "POST",
          headers: getAuthHeaders(true),
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Resource added successfully");
        setResourceForm({ name: "", type: "docs", file: null });
        setIsCreateResourceOpen(false);

        // Refresh lesson details to get the updated resources list
        await fetchLessonResources(selectedLesson.id);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add resource");
      toast.error("Failed to add resource");
    }
  };

  const deleteResource = async (resourceId: number) => {
    if (!course || !selectedModule || !selectedLesson) {
      setError("No course, module, or lesson selected. Please try again.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/classroom/community/${communityId}/courses/${course.id}/modules/${selectedModule.id}/lessons/${selectedLesson.id}/resources/${resourceId}/`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );
      if (response.ok) {
        toast.success("Resource deleted successfully");
        await fetchLessonResources(selectedLesson.id);
      } else {
        throw new Error("Failed to delete resource");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete resource");
      toast.error("Failed to delete resource");
    }
  };

  return (
    <Tabs value="resources">
      <TabsContent value="resources" className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Lesson Resources</h2>
          <Dialog open={isCreateResourceOpen} onOpenChange={setIsCreateResourceOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={!selectedLesson}>
                <Plus className="h-4 w-4 mr-1" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Add a new resource to lesson: {selectedLesson?.title ?? "Unknown"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="resource-name">Resource Name</Label>
                  <Input
                    id="resource-name"
                    placeholder="Enter resource name"
                    value={resourceForm.name}
                    onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resource-type">Resource Type</Label>
                  <Select
                    value={resourceForm.type}
                    onValueChange={(value: "docs" | "video" | "audio" | "image" | "link") =>
                      setResourceForm({ ...resourceForm, type: value })
                    }
                  >
                    <SelectTrigger id="resource-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="docs">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resource-file">File</Label>
                  <Input
                    id="resource-file"
                    type="file"
                    onChange={(e) =>
                      setResourceForm({
                        ...resourceForm,
                        file: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateResourceOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={createResource}
                  disabled={loading || !resourceForm.name}
                >
                  {loading ? "Adding..." : "Add Resource"}
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

        <div className="space-y-3">
          {!selectedLesson ? (
            <div className="text-center py-8 border rounded-lg">
              <FileBox className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Select a Lesson First</h3>
              <p className="text-muted-foreground mt-1">Choose a lesson to view or add resources</p>

              {selectedModule ? (
                <Select
                  onValueChange={(value) => {
                    const lesson = selectedModule.lessons?.find((l) => l.id === Number.parseInt(value));
                    if (lesson) {
                      fetchLessonResources(lesson.id);
                    }
                  }}
                >
                  <SelectTrigger className="w-[250px] mx-auto mt-4">
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedModule.lessons?.map((lesson: Lesson) => (
                      <SelectItem key={lesson.id} value={lesson.id.toString()}>
                        {lesson.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">Please select a module first</p>
              )}
            </div>
          ) : loading && !selectedLesson.resources ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : selectedLesson.resources && selectedLesson.resources.length > 0 ? (
            <div>
              <div className="bg-muted/50 p-3 rounded-lg mb-3">
                <h3 className="font-medium">Lesson: {selectedLesson.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedLesson.resources.map((resource: Resource) => (
                  <Card key={resource.id}>
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        {resource.type === "docs" && <FileText className="h-5 w-5 text-blue-500" />}
                        {resource.type === "video" && <FileText className="h-5 w-5 text-red-500" />}
                        {resource.type === "audio" && <FileText className="h-5 w-5 text-purple-500" />}
                        {resource.type === "image" && <FileText className="h-5 w-5 text-green-500" />}
                        {resource.type === "link" && <FileText className="h-5 w-5 text-orange-500" />}
                        <CardTitle className="text-base">{resource.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteResource(resource.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{resource.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Added: {new Date(resource.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {resource.file && (
                        <div className="mt-2 text-sm truncate text-muted-foreground">
                          {resource.file}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <FileBox className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Resources Yet</h3>
              <p className="text-muted-foreground mt-1">Add resources to enhance this lesson</p>
              <Button className="mt-4" onClick={() => setIsCreateResourceOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Resource
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}