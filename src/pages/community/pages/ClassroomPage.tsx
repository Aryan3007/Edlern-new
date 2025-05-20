"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { CourseManagement } from "../comps/course-management"
import { useParams } from "react-router-dom"


export default function ClassroomPage() {
  const [userRole, setUserRole] = useState<"creator" | "member">("member")
  const { community_id } = useParams<{ community_id: string }>();
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
    <div className="max-w-7xl mx-auto py-6">
      <CourseManagement userRole={userRole} communityId={Number(community_id)} />
    </div>
  )
}
