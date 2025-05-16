import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserLevelCard } from "../comps/user-level-card"
import { LeaderboardTable } from "../comps/leaderboard-table"
import { useEffect } from "react";


export default function LeaderboardsPage() {
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <div className="max-w-7xl mx-auto lg:py-6 space-y-6">
      <UserLevelCard />

      <div className="text-sm text-gray-500">Last updated: Apr 24th 2025 1:21am</div>

      <Tabs defaultValue="7day" className="w-full">
        <TabsList className="grid w-full h-fit grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <TabsTrigger value="7day">Leaderboard (7-day)</TabsTrigger>
          <TabsTrigger value="30day">Leaderboard (30-day)</TabsTrigger>
          <TabsTrigger value="alltime">Leaderboard (all-time)</TabsTrigger>
        </TabsList>

        <TabsContent value="7day">
          <LeaderboardTable
            users={[
              { rank: 1, name: "Samual Benson", points: 165, image: "/placeholder.svg?height=40&width=40&text=SB" },
              { rank: 2, name: "Nelson Rodriguez", points: 159, image: "/placeholder.svg?height=40&width=40&text=NR" },
              { rank: 3, name: "The Rain Society", points: 112, image: "/placeholder.svg?height=40&width=40&text=RS" },
              { rank: 4, name: "Charlie Herod", points: 107, image: "/placeholder.svg?height=40&width=40&text=CH" },
              { rank: 5, name: "Alex Cretu", points: 104, image: "/placeholder.svg?height=40&width=40&text=AC" },
              { rank: 6, name: "Andrew Heydt", points: 103, image: "/placeholder.svg?height=40&width=40&text=AH" },
              { rank: 7, name: "Latif Skool", points: 102, image: "/placeholder.svg?height=40&width=40&text=LS" },
              { rank: 8, name: "Brad Cassidy", points: 93, image: "/placeholder.svg?height=40&width=40&text=BC" },
              { rank: 9, name: "Moiz Abbasi", points: 82, image: "/placeholder.svg?height=40&width=40&text=MA" },
              { rank: 10, name: "Lorenzo Bertotti", points: 80, image: "/placeholder.svg?height=40&width=40&text=LB" },
            ]}
          />
        </TabsContent>

        <TabsContent value="30day">
          <LeaderboardTable
            users={[
              { rank: 1, name: "Latif Skool", points: 816, image: "/placeholder.svg?height=40&width=40&text=LS" },
              { rank: 2, name: "Samual Benson", points: 634, image: "/placeholder.svg?height=40&width=40&text=SB" },
              { rank: 3, name: "Andrew Heydt", points: 602, image: "/placeholder.svg?height=40&width=40&text=AH" },
              { rank: 4, name: "Brad Cassidy", points: 377, image: "/placeholder.svg?height=40&width=40&text=BC" },
              { rank: 5, name: "Charlie Herod", points: 363, image: "/placeholder.svg?height=40&width=40&text=CH" },
              { rank: 6, name: "Joel Morrow", points: 360, image: "/placeholder.svg?height=40&width=40&text=JM" },
              { rank: 7, name: "The Rain Society", points: 353, image: "/placeholder.svg?height=40&width=40&text=RS" },
              { rank: 8, name: "Nelson Rodriguez", points: 350, image: "/placeholder.svg?height=40&width=40&text=NR" },
              { rank: 9, name: "Moiz Abbasi", points: 341, image: "/placeholder.svg?height=40&width=40&text=MA" },
              { rank: 10, name: "Douglas W", points: 326, image: "/placeholder.svg?height=40&width=40&text=DW" },
            ]}
          />
        </TabsContent>

        <TabsContent value="alltime">
          <LeaderboardTable
            users={[
              { rank: 1, name: "Douglas W", points: 5911, image: "/placeholder.svg?height=40&width=40&text=DW" },
              { rank: 2, name: "Samual Benson", points: 4926, image: "/placeholder.svg?height=40&width=40&text=SB" },
              { rank: 3, name: "Latif Skool", points: 4797, image: "/placeholder.svg?height=40&width=40&text=LS" },
              {
                rank: 4,
                name: "Sebastian Sylvain B",
                points: 4006,
                image: "/placeholder.svg?height=40&width=40&text=SS",
              },
              { rank: 5, name: "Raul Visan", points: 3904, image: "/placeholder.svg?height=40&width=40&text=RV" },
              { rank: 6, name: "Trikke Be", points: 3680, image: "/placeholder.svg?height=40&width=40&text=TB" },
              { rank: 7, name: "Maxwell Skool", points: 3435, image: "/placeholder.svg?height=40&width=40&text=MS" },
              { rank: 8, name: "Andrew Heydt", points: 2756, image: "/placeholder.svg?height=40&width=40&text=AH" },
              { rank: 9, name: "The Rain Society", points: 2649, image: "/placeholder.svg?height=40&width=40&text=RS" },
              { rank: 10, name: "Ferreira Twins", points: 2548, image: "/placeholder.svg?height=40&width=40&text=FT" },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
