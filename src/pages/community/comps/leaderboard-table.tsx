import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface User {
  rank: number
  name: string
  points: number
  image: string
}

interface LeaderboardTableProps {
  users: User[]
}

export function LeaderboardTable({ users }: LeaderboardTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card key={user.rank} className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              user.rank === 1
                ? "bg-amber-100 text-amber-800"
                : user.rank === 2
                  ? "bg-gray-200 text-gray-800"
                  : user.rank === 3
                    ? "bg-amber-50 text-amber-700"
                    : "bg-gray-100 text-gray-600"
            }`}
          >
            {user.rank}
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate font-medium">{user.name}</div>
          <Badge variant="outline" className="bg-sky-700/20 text-sky-700">
            {user.rank <= 3 ? "+" : ""}
            {user.points.toLocaleString()}
          </Badge>
        </Card>
      ))}
    </div>
  )
}
