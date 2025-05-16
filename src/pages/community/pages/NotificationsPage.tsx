import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageSquare, UserPlus, Settings, AtSign } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"

export default function NotificationsPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Notifications</CardTitle>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="mentions">Mentions</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-1">
                {[
                  {
                    id: 1,
                    user: { name: "Samual Benson", image: "/placeholder.svg?height=40&width=40&text=SB" },
                    action: "like",
                    content: "liked your post about morning routines",
                    time: "2 minutes ago",
                    unread: true,
                  },
                  {
                    id: 2,
                    user: { name: "Latif Skool", image: "/placeholder.svg?height=40&width=40&text=LS" },
                    action: "comment",
                    content: 'commented on your post: "This is exactly what I needed to hear today!"',
                    time: "15 minutes ago",
                    unread: true,
                  },
                  {
                    id: 3,
                    user: { name: "Andrew Heydt", image: "/placeholder.svg?height=40&width=40&text=AH" },
                    action: "follow",
                    content: "started following you",
                    time: "1 hour ago",
                    unread: false,
                  },
                  {
                    id: 4,
                    user: { name: "Brad Cassidy", image: "/placeholder.svg?height=40&width=40&text=BC" },
                    action: "mention",
                    content: 'mentioned you in a comment: "@user I think you\'d find this interesting"',
                    time: "3 hours ago",
                    unread: false,
                  },
                  {
                    id: 5,
                    user: { name: "Joel Morrow", image: "/placeholder.svg?height=40&width=40&text=JM" },
                    action: "like",
                    content: "liked your comment on Hamza's post",
                    time: "5 hours ago",
                    unread: false,
                  },
                  {
                    id: 6,
                    user: { name: "The Rain Society", image: "/placeholder.svg?height=40&width=40&text=RS" },
                    action: "comment",
                    content: 'replied to your comment: "Great point! I\'d add that consistency is key."',
                    time: "8 hours ago",
                    unread: false,
                  },
                  {
                    id: 7,
                    user: { name: "Hamza Ahmed", image: "/placeholder.svg?height=40&width=40&text=HA" },
                    action: "mention",
                    content: "mentioned you in a post about fitness goals",
                    time: "1 day ago",
                    unread: false,
                  },
                  {
                    id: 8,
                    user: { name: "Nelson Rodriguez", image: "/placeholder.svg?height=40&width=40&text=NR" },
                    action: "follow",
                    content: "started following you",
                    time: "2 days ago",
                    unread: false,
                  },
                  {
                    id: 9,
                    user: { name: "Moiz Abbasi", image: "/placeholder.svg?height=40&width=40&text=MA" },
                    action: "like",
                    content: "liked your post about meditation techniques",
                    time: "3 days ago",
                    unread: false,
                  },
                  {
                    id: 10,
                    user: { name: "Charlie Herod", image: "/placeholder.svg?height=40&width=40&text=CH" },
                    action: "comment",
                    content: 'commented on your post: "I\'ve been using this approach for months and it works!"',
                    time: "4 days ago",
                    unread: false,
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.unread ? "bg-lime-600/5" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.user.image || "/placeholder.svg"} alt={notification.user.name} />
                        <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 rounded-full p-1 ${
                          notification.action === "like"
                            ? "bg-red-100"
                            : notification.action === "comment"
                              ? "bg-blue-100"
                              : notification.action === "follow"
                                ? "bg-green-100"
                                : "bg-amber-100"
                        }`}
                      >
                        {notification.action === "like" && <Heart className="h-3 w-3 text-red-500" />}
                        {notification.action === "comment" && <MessageSquare className="h-3 w-3 text-blue-500" />}
                        {notification.action === "follow" && <UserPlus className="h-3 w-3 text-green-500" />}
                        {notification.action === "mention" && <AtSign className="h-3 w-3 text-amber-500" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{notification.user.name}</span>{" "}
                        <span className="text-gray-700">{notification.content}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {notification.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-lime-600" />}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily Digest</span>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mentions</span>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Direct Messages</span>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Likes</span>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comments</span>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Followers</span>
                  <Switch checked={false} />
                </div>
              </div>

              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
