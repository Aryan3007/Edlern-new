"use client"

import { useEffect, useState } from "react"
import { UserLevelCard } from "../comps/user-level-card"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { LeaderboardTable } from "../comps/leaderboard-table"
import { useParams } from "react-router-dom"
import { SERVER_URL } from "@/config/config"



const getLeaderboard = async (communityId: string, days: string, token: string) => {
  const res = await fetch(`${SERVER_URL}/api/v1/gamification/community/${communityId}/leaderboard/?days=${days}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await res.json()
  return data.success ? data.data.results : []
}

export default function LeaderboardsPage() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const { community_id = "" } = useParams<{ community_id: string }>();

  const [leaderboards, setLeaderboards] = useState({
    "7day": [],
    "30day": [],
    alltime: [],
  })
  const [loading, setLoading] = useState({
    "7day": false,
    "30day": false,
    alltime: false,
  })

  const fetchLeaderboardData = async (days: string, key: string) => {
    if (!accessToken) return

    setLoading((prev) => ({ ...prev, [key]: true }))

    try {
      const results = await getLeaderboard(community_id, days, accessToken)
      setLeaderboards((prev) => ({
        ...prev,
        [key]: results.map((user: any, idx: number) => ({
          rank: idx + 1,
          name: user.member_name,
          points: days === "7" ? user.points_in_last_7_days : user.total_points,
          image:
            user.member_profile_picture ||
            `/placeholder.svg?height=40&width=40&text=${user.member_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}`,
        })),
      }))
    } catch (error) {
      console.error(`Error fetching ${key} leaderboard:`, error)
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }))
    }
  }

  useEffect(() => {
    if (accessToken) {
      fetchLeaderboardData("7", "7day")
      fetchLeaderboardData("30", "30day")
      fetchLeaderboardData("all", "alltime")
    }
    // eslint-disable-next-line
  }, [accessToken])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  return (
    <div className="max-w-7xl mx-auto lg:py-6 space-y-6">
      {community_id && <UserLevelCard communityId={community_id} />}

      <div className="text-sm text-gray-500 px-1">Last updated: {new Date().toLocaleString()}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <LeaderboardTable title="Leaderboard (7-day)" users={leaderboards["7day"]} loading={loading["7day"]} />

        <LeaderboardTable title="Leaderboard (30-day)" users={leaderboards["30day"]} loading={loading["30day"]} />

        <LeaderboardTable title="Leaderboard (all-time)" users={leaderboards["alltime"]} loading={loading["alltime"]} />
      </div>
    </div>
  )
}
