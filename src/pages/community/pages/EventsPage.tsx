import { useEffect, useState } from "react";
import { EventCalendar } from "../comps/event-management/event-calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams } from "react-router-dom";

export default function EventsPage() {
  const { community_id } = useParams<{ community_id: string }>();

  const [userRole, setUserRole] = useState<"creator" | "member">("member")
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  // In a real app, you would fetch the user's role from your API
  useEffect(() => {
    // Simulate fetching user role
    const fetchUserRole = async () => {
      // This is a placeholder - in a real app, you would make an API call
      // to determine if the user is a creator (admin) or member
      const isCreator = 1 // For demo purposes, randomly assign role
      setUserRole(isCreator ? "creator" : "member")
    }

    fetchUserRole()
  }, [accessToken])
  
  return (
    <main className="min-h-screen p-4 md:p-6 bg-background">
<EventCalendar userRole={userRole} communityId={Number(community_id)} />    </main>
  )
}
