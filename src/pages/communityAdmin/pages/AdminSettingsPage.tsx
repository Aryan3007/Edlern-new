import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Camera, Globe, Palette, Save, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function AdminSettingsPage() {
  return (
    <div className="container py-6">
      <div className="admin-layout">

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community Settings</h1>
              <p className="text-muted-foreground">Configure your community settings</p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Information</CardTitle>
                  <CardDescription>Basic information about your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Community Logo</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        This will be displayed throughout the platform
                      </p>
                    </div>
                    <div className="md:w-2/3 flex flex-col items-center md:items-start">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96&text=AG" alt="Community logo" />
                          <AvatarFallback className="text-2xl">AG</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline">Upload New</Button>
                        <Button variant="ghost" className="text-red-500">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Community Details</h3>
                      <p className="text-sm text-muted-foreground mt-1">Basic information about your community</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Community Name</Label>
                        <Input id="name" defaultValue="Adonis Gang" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">Community URL</Label>
                        <div className="flex">
                          <div className="bg-secondary flex items-center px-3 rounded-l-md border border-r-0 border-input">
                            <span className="text-muted-foreground">skool.com/</span>
                          </div>
                          <Input id="url" defaultValue="adonis-gang" className="rounded-l-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave Jeffery behind."
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="self-improvement">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self-improvement">Self Improvement</SelectItem>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <p className="text-sm text-muted-foreground mt-1">How members can reach you</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input id="supportEmail" type="email" defaultValue="support@adonisgang.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue="https://adonisgang.com" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" defaultValue="@adonisgang" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input id="youtube" defaultValue="@AdonisGang" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" defaultValue="@adonisgang" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Color Scheme</h3>
                      <p className="text-sm text-muted-foreground mt-1">Set your community's primary colors</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-primary"></div>
                          <Input id="primaryColor" defaultValue="#4ADE80" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-secondary"></div>
                          <Input id="secondaryColor" defaultValue="#F3F4F6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accentColor">Accent Color</Label>
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-md bg-accent"></div>
                          <Input id="accentColor" defaultValue="#F3F4F6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Theme Mode</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Choose the default theme mode for your community
                      </p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Light Mode</div>
                          <div className="text-sm text-muted-foreground">Use light theme by default</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Dark Mode</div>
                          <div className="text-sm text-muted-foreground">Use dark theme by default</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">System Preference</div>
                          <div className="text-sm text-muted-foreground">Follow user's system preference</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Custom CSS</h3>
                      <p className="text-sm text-muted-foreground mt-1">Add custom CSS to your community</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="customCSS">Custom CSS</Label>
                        <Textarea
                          id="customCSS"
                          className="min-h-[200px] font-mono"
                          placeholder="/* Add your custom CSS here */"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                  <CardDescription>Configure the layout of your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Homepage Layout</h3>
                      <p className="text-sm text-muted-foreground mt-1">Choose the default homepage layout</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-32 bg-secondary rounded-md flex items-center justify-center">
                            <Palette className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="font-medium">Feed Layout</div>
                        </div>
                        <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary">
                          <div className="w-full h-32 bg-secondary rounded-md flex items-center justify-center">
                            <Palette className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="font-medium">Grid Layout</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Configure privacy and access settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Community Access</h3>
                      <p className="text-sm text-muted-foreground mt-1">Control who can access your community</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Private Community</div>
                          <div className="text-sm text-muted-foreground">Only approved members can join</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Require Approval</div>
                          <div className="text-sm text-muted-foreground">Manually approve new members</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Allow Invitations</div>
                          <div className="text-sm text-muted-foreground">Members can invite others</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Content Permissions</h3>
                      <p className="text-sm text-muted-foreground mt-1">Control who can create content</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label>Who can create posts</Label>
                        <Select defaultValue="level2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Members</SelectItem>
                            <SelectItem value="level2">Level 2+ Members</SelectItem>
                            <SelectItem value="level5">Level 5+ Members</SelectItem>
                            <SelectItem value="admins">Admins Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Who can comment</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Members</SelectItem>
                            <SelectItem value="level2">Level 2+ Members</SelectItem>
                            <SelectItem value="level5">Level 5+ Members</SelectItem>
                            <SelectItem value="admins">Admins Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Who can send direct messages</Label>
                        <Select defaultValue="level3">
                          <SelectTrigger>
                            <SelectValue placeholder="Select permission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Members</SelectItem>
                            <SelectItem value="level2">Level 2+ Members</SelectItem>
                            <SelectItem value="level3">Level 3+ Members</SelectItem>
                            <SelectItem value="level5">Level 5+ Members</SelectItem>
                            <SelectItem value="admins">Admins Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security settings for your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Content Moderation</h3>
                      <p className="text-sm text-muted-foreground mt-1">Configure content moderation settings</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Profanity Filter</div>
                          <div className="text-sm text-muted-foreground">Automatically filter profanity</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Link Approval</div>
                          <div className="text-sm text-muted-foreground">Require approval for external links</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Media Approval</div>
                          <div className="text-sm text-muted-foreground">Require approval for uploaded media</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure notification settings for your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">Configure email notification settings</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Welcome Email</div>
                          <div className="text-sm text-muted-foreground">Send welcome email to new members</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Weekly Digest</div>
                          <div className="text-sm text-muted-foreground">Send weekly digest of community activity</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Content Alerts</div>
                          <div className="text-sm text-muted-foreground">Notify members of new content</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailTemplate">Email Template</Label>
                        <Textarea
                          id="emailTemplate"
                          className="min-h-[100px]"
                          defaultValue="Welcome to Adonis Gang! We're excited to have you join our community."
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground mt-1">Configure push notification settings</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Posts</div>
                          <div className="text-sm text-muted-foreground">Notify members of new posts</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Comments</div>
                          <div className="text-sm text-muted-foreground">Notify members of new comments</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Direct Messages</div>
                          <div className="text-sm text-muted-foreground">Notify members of new direct messages</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Configure advanced settings for your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Admin Team</h3>
                      <p className="text-sm text-muted-foreground mt-1">Manage your admin team</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="rounded-md border">
                        <div className="grid grid-cols-4 p-4 bg-secondary/50 font-medium">
                          <div className="col-span-2">Admin</div>
                          <div>Role</div>
                          <div className="text-right">Actions</div>
                        </div>
                        {[
                          { name: "Hamza Ahmed", image: "/placeholder.svg?height=40&width=40&text=HA", role: "Owner" },
                          { name: "Latif Skool", image: "/placeholder.svg?height=40&width=40&text=LS", role: "Admin" },
                          {
                            name: "Samual Benson",
                            image: "/placeholder.svg?height=40&width=40&text=SB",
                            role: "Admin",
                          },
                          {
                            name: "Andrew Heydt",
                            image: "/placeholder.svg?height=40&width=40&text=AH",
                            role: "Moderator",
                          },
                          {
                            name: "Brad Cassidy",
                            image: "/placeholder.svg?height=40&width=40&text=BC",
                            role: "Moderator",
                          },
                        ].map((admin, i) => (
                          <div key={i} className="grid grid-cols-4 p-4 border-t items-center">
                            <div className="col-span-2 flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={admin.image || "/placeholder.svg"} alt={admin.name} />
                                <AvatarFallback>{admin.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{admin.name}</div>
                            </div>
                            <div>
                              <Badge
                                variant="outline"
                                className={
                                  admin.role === "Owner"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                    : admin.role === "Admin"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                }
                              >
                                {admin.role}
                              </Badge>
                            </div>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Admin
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Data Export</h3>
                      <p className="text-sm text-muted-foreground mt-1">Export your community data</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="space-y-2">
                        <Label>Select data to export</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="members" className="rounded border-gray-300" />
                            <Label htmlFor="members">Members</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="posts" className="rounded border-gray-300" />
                            <Label htmlFor="posts">Posts</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="courses" className="rounded border-gray-300" />
                            <Label htmlFor="courses">Courses</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="analytics" className="rounded border-gray-300" />
                            <Label htmlFor="analytics">Analytics</Label>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Globe className="h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mt-1">Irreversible actions</p>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div className="rounded-md border border-red-200 p-4">
                        <div className="font-medium text-red-500">Delete Community</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          This action cannot be undone. All data will be permanently deleted.
                        </p>
                        <Button variant="destructive" className="mt-4">
                          Delete Community
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
