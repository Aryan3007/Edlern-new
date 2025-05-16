import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Link2 } from "lucide-react"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { RootState } from "@/store/store"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

export function CommunitySidebar({communityId}: { communityId: string }) {
  interface CommunityData {
    name?: string;
    banner_image?: string;
    description?: string;
    slug?: string;
    members_count?: number | string;
    online_count?: number | string;
    admin_count?: number | string;
  }

  const [communityData, setCommunity] = useState<CommunityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Get access token from Redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)


  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!communityId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await axios.get(
          `https://edlern.toolsfactory.tech/api/v1/community/${communityId}/`, 
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        )
        setCommunity(response.data.data)
      } catch (err) {
        console.error("Error fetching community data:", err)
        setError(
          (err: unknown) =>
            (axios.isAxiosError(err) && err.response?.data?.detail) || "Failed to load community data"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityData()
  }, [communityId, accessToken])


  
   return (
    <div className="space-y-6">
      <Card className="p-4  gap-2">
        {loading ? (
          <>
            <CardHeader className="p-0">
              <Skeleton className="h-7 w-48 mb-4" />
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              <Skeleton className="aspect-video w-full rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              
              <div className="grid grid-cols-3 gap-2 text-center py-2">
                <div className="flex flex-col">
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
                <div className="flex flex-col">
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
                <div className="flex flex-col">
                  <Skeleton className="h-6 w-16 mx-auto" />
                  <Skeleton className="h-3 w-12 mx-auto mt-1" />
                </div>
              </div>
              
              <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
          </>
        ) : error ? (
          <div className="text-center py-6">
            <p className="text-red-500">Failed to load community data</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <CardHeader className="p-0">
              <CardTitle className="text-xl capitalize">{communityData?.name || "Adonis Gang"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img
                  src={communityData?.banner_image || `/placeholder.svg?height=200&width=400&text=${communityData?.name || "Community"}`}
                  alt="Community banner"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm">
                {communityData?.description || "Join the #1 masculine self-improvement community. Level up in all areas of your life and finally leave Jeffery behind."}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link2 className="h-4 w-4" />
                <span>{`https://edlern.com/${communityData?.slug}`}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{communityData?.members_count || "181.8k"}</span>
                  <span className="text-xs text-gray-500">Members</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{communityData?.online_count || "222"}</span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{communityData?.admin_count || "10"}</span>
                  <span className="text-xs text-gray-500">Admins</span>
                </div>
              </div>

              <Button className="w-full">INVITE PEOPLE</Button>
            </CardContent>
          </>
        )}
      </Card>

      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Leaderboard (30-day)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3">
            {[
              { rank: 1, name: "Latif Skool", points: 816, image: "/placeholder.svg?height=32&width=32&text=LS" },
              { rank: 2, name: "Samual Benson", points: 634, image: "/placeholder.svg?height=32&width=32&text=SB" },
              { rank: 3, name: "Andrew Heydt", points: 602, image: "/placeholder.svg?height=32&width=32&text=AH" },
              { rank: 4, name: "Brad Cassidy", points: 377, image: "/placeholder.svg?height=32&width=32&text=BC" },
              { rank: 5, name: "Joel Morrow", points: 360, image: "/placeholder.svg?height=32&width=32&text=JM" },
            ].map((user) => (
              <div key={user.rank} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 text-sm font-medium text-gray-500">
                  {user.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">{user.name}</div>
                <Badge variant="outline" className="bg-sky-700/10 text-sky-700">
                  +{user.points}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full mt-2 text-sky-700">
            See all rankings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
