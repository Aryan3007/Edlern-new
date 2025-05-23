import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  rank: number
  name: string
  points: number
  image: string
}

interface LeaderboardColumnProps {
  title: string
  users: User[]
  loading: boolean
}

export function LeaderboardTable({ title, users, loading }: LeaderboardColumnProps) {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-slate-100 text-slate-800 border-slate-200"
      case 3:
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border-2 ${getRankStyle(rank)}`}
        >
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
        </div>
      )
    }
    return (
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border ${getRankStyle(rank)}`}
      >
        {rank}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold  px-1">{title}</h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-4 flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card
              key={`${user.rank}-${user.name}`}
              className="p-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-sky-500"
            >
              <div className="flex items-center gap-3">
                {getRankIcon(user.rank)}

                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-sky-500 to-purple-600 text-white font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{user.name}</div>
                </div>

                <Badge variant="secondary" className="bg-sky-50 text-sky-700 border-sky-200 font-medium px-3 py-1">
                  {user.rank <= 3 ? "+" : ""}
                  {user.points.toLocaleString()}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
