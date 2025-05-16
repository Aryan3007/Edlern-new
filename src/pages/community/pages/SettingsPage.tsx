import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Lock, Shield, CreditCard, LogOut } from "lucide-react"
import { useEffect } from "react"

export default function SettingsPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="mx-auto max-w-7xl py-6">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </div>
              <Button>Save Changes</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="danger">Danger Zone</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Profile Picture</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      This will be displayed on your profile and in the community
                    </p>
                  </div>
                  <div className="md:w-2/3 flex flex-col items-center md:items-start">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User profile" />
                        <AvatarFallback className="text-2xl">AT</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
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
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <p className="text-sm text-gray-500 mt-1">Update your personal details</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Aryan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Tyagi" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="aryantyagi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="aryan.tyagi@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, USA" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Bio</h3>
                    <p className="text-sm text-gray-500 mt-1">Tell the community about yourself</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        className="min-h-[120px]"
                        defaultValue="Self-improvement enthusiast focused on fitness, mindset, and productivity. Currently working on building my aesthetic physique and growing my online business."
                      />
                      <p className="text-xs text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests (comma separated)</Label>
                      <Input
                        id="interests"
                        defaultValue="Fitness, Entrepreneurship, Mindfulness, Reading, Martial Arts"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Social Links</h3>
                    <p className="text-sm text-gray-500 mt-1">Connect your social media accounts</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" defaultValue="instagram.com/aryantyagi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" defaultValue="" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="account" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Update your password regularly to keep your account secure
                    </p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="mt-2">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Protect your account with 2FA</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Language & Region</h3>
                    <p className="text-sm text-gray-500 mt-1">Set your preferred language and regional settings</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage the emails you receive</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Comments</h4>
                        <p className="text-sm text-gray-500">When someone comments on your posts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mentions</h4>
                        <p className="text-sm text-gray-500">When someone mentions you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Follows</h4>
                        <p className="text-sm text-gray-500">When someone follows you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Direct Messages</h4>
                        <p className="text-sm text-gray-500">When you receive a new message</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Community Updates</h4>
                        <p className="text-sm text-gray-500">News and announcements</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">Control your mobile and desktop notifications</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Everything</h4>
                        <p className="text-sm text-gray-500">All notifications</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Direct Messages</h4>
                        <p className="text-sm text-gray-500">When you receive new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mentions</h4>
                        <p className="text-sm text-gray-500">When someone mentions you</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Privacy Settings</h3>
                    <p className="text-sm text-gray-500 mt-1">Control who can see your profile and activity</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select defaultValue="public">
                        <SelectTrigger id="profileVisibility">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public (Everyone)</SelectItem>
                          <SelectItem value="community">Community Members Only</SelectItem>
                          <SelectItem value="followers">Followers Only</SelectItem>
                          <SelectItem value="private">Private (Only Me)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Show Online Status</h4>
                        <p className="text-sm text-gray-500">Let others see when you're active</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Show Activity Status</h4>
                        <p className="text-sm text-gray-500">Show your recent activity in the community</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Allow Direct Messages</h4>
                        <p className="text-sm text-gray-500">Control who can send you messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Allow Mentions</h4>
                        <p className="text-sm text-gray-500">Control who can mention you in posts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Data & Privacy</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal data and privacy</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Collection</h4>
                        <p className="text-sm text-gray-500">
                          Allow us to collect usage data to improve your experience
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Personalized Ads</h4>
                        <p className="text-sm text-gray-500">See ads based on your activity and interests</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" className="mt-2">
                      <Shield className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage your payment methods and billing information</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-8 w-8 text-gray-500" />
                          <div>
                            <h4 className="font-medium">Visa ending in 4242</h4>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium">Billing History</h3>
                    <p className="text-sm text-gray-500 mt-1">View your past invoices and billing history</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4 border-b">
                        <div className="font-medium">Invoice #12345</div>
                        <Badge>Paid</Badge>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm">Premium Membership - Annual</p>
                          <p className="text-xs text-gray-500">Apr 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$99.00</p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4 border-b">
                        <div className="font-medium">Invoice #12344</div>
                        <Badge>Paid</Badge>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm">Aesthetic Body 2.0 Course</p>
                          <p className="text-xs text-gray-500">Mar 10, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$49.00</p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="danger" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mt-1">Irreversible and destructive actions</p>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <Card className="border-red-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium">Deactivate Account</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Temporarily disable your account. You can reactivate anytime by logging in.
                        </p>
                        <Button variant="outline" className="mt-4">
                          Deactivate Account
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-red-500">Delete Account</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Permanently delete your account and all your data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" className="mt-4">
                          <LogOut className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
