import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link2, Users, Star, Lock } from "lucide-react"
import { useEffect } from "react"

export default function AboutPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="max-w-7xl mx-auto lg:py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Adonis Gang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Image+1"
                  alt="Community image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=300&width=500&text=Image+2"
                  alt="Community image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-2">
              <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border">
                <img
                  src="/placeholder.svg?height=80&width=80&text=Thumb+1"
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border">
                <img
                  src="/placeholder.svg?height=80&width=80&text=Thumb+2"
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1 bg-gray-100">
                <Lock className="h-4 w-4 mr-1" />
                Private
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-gray-100">
                <Users className="h-4 w-4 mr-1" />
                181.8k members
              </Badge>
              <Badge variant="outline" className="px-3 py-1 bg-gray-100">
                <Star className="h-4 w-4 mr-1" />
                Free
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=HA" alt="Creator" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <span>By Hamza Ahmed</span>
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              </div>
            </div>

            <div className="text-lg">
              Hey bro this is my free community where you can talk about self improvement. Just join right now it takes
              30 seconds to create your account and then you get everything
            </div>

            <div className="text-sm text-gray-500">Privacy and terms</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Adonis Gang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=400&text=Adonis+Gang"
                alt="Community banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-gray-500">
              <Link2 className="h-4 w-4 inline mr-1" />
              skool.com/adonis-gang
            </div>

            <p className="text-sm">
              Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave
              Jeffery behind.
            </p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                Self Improvement Courses
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">181.8k</span>
                <span className="text-xs text-gray-500">Members</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">222</span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">10</span>
                <span className="text-xs text-gray-500">Admins</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <Avatar key={i} className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${i + 1}`} alt={`User ${i + 1}`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>

            <Button className="w-full">INVITE PEOPLE</Button>

            <div className="text-xs text-gray-400 text-center">powered by skool</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
