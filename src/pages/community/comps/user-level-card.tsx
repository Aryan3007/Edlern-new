import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Lock } from "lucide-react";
import { RootState } from "@/store/store";
import { SERVER_URL } from "@/config/config";

// Types for API response
interface GamificationLevel {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  level_number: number;
  required_points: number;
  community: number;
}

interface UserMemberProfile {
  user_id: string;
  full_name: string;
  profile_picture: string;
  current_level: string;
  total_points: number;
  points_to_next_level: number;
}

interface GamificationResponse {
  message: string;
  success: boolean;
  data: {
    levels: GamificationLevel[];
    user_member_profile: UserMemberProfile;
  };
}

interface UserLevelCardProps {
  communityId: string;
}

export function UserLevelCard({ communityId }: UserLevelCardProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [levels, setLevels] = useState<GamificationLevel[]>([]);
  const [userProfile, setUserProfile] = useState<UserMemberProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Headers with Bearer token
  const getAuthHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return headers;
  };

  // Fetch gamification levels and user profile
  const fetchLevels = async () => {
    if (!accessToken) {
      setError("Authentication required. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${SERVER_URL}/api/v1/gamification/community/${communityId}/gamification-levels/`,
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: GamificationResponse = await response.json();
      if (data.success) {
        setLevels(data.data.levels);
        setUserProfile(data.data.user_member_profile);
      } else {
        throw new Error(data.message || "Failed to fetch gamification levels.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred while fetching levels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, [communityId, accessToken]);

  // Extract current level number from user profile
  const getCurrentLevelNumber = (): number => {
    if (!userProfile) return 1;
    const levelName = userProfile.current_level.toLowerCase();
    const level = levels.find(l => l.name.toLowerCase() === levelName);
    return level ? level.level_number : 1;
  };

  // Calculate points needed to level up
  const getPointsToLevelUp = (): number => {
    if (!userProfile) return 0;
    return userProfile.points_to_next_level;
  };

  // Placeholder for member percentage (not in API)
  const getMemberPercentage = (levelNumber: number): string => {
    const percentages: { [key: number]: string } = {
      1: "81% of members",
      2: "8% of members",
      3: "5% of members",
      4: "1% of members",
      5: "1% of members",
      6: "1% of members",
      7: "1% of members",
      8: "1% of members",
      9: "1% of members",
      10: "1% of members",
    };
    return percentages[levelNumber] || "1% of members";
  };

  // Placeholder for unlock features (not in API)
  const getUnlockFeature = (levelNumber: number): string | null => {
    const features: { [key: number]: string } = {
      2: "Post to feed",
      3: "Chat with members",
    };
    return features[levelNumber] || null;
  };

  if (loading) {
    return <div className="p-6 text-center">Loading levels...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!userProfile) {
    return <div className="p-6 text-center">User data not available. Please log in.</div>;
  }

  const currentLevelNumber = getCurrentLevelNumber();

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* User Profile Section */}
          <div className="flex md:col-span-2 flex-col items-center justify-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-sky-700">
                <AvatarImage src={userProfile.profile_picture || "/placeholder.svg?height=128&width=128"} alt="User profile" />
                <AvatarFallback className="text-2xl">
                  {userProfile.full_name
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-sky-700/40 backdrop-blur-2xl text-sky-700 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold border-4 border-white">
                {currentLevelNumber}
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold">{userProfile.full_name}</h2>
            <div className="text-sm text-gray-500">Level {currentLevelNumber}</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <span>{getPointsToLevelUp()} points to level up</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <HelpCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">
                      Earn points by engaging with the community. Post, comment, and like to level up!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Levels Section */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {levels.slice(0, Math.ceil(levels.length / 2)).map(level => (
                <div
                  key={level.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    level.level_number === currentLevelNumber
                      ? "bg-amber-50 border-amber-100"
                      : ""
                  }`}
                >
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      level.level_number === currentLevelNumber
                        ? "bg-amber-100 text-amber-800 font-bold"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {level.level_number <= currentLevelNumber ? (
                      level.level_number
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        level.level_number === currentLevelNumber ? "text-amber-800" : ""
                      }`}
                    >
                      Level {level.level_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      Requires {level.required_points} points
                      {getUnlockFeature(level.level_number) ? (
                        <>
                          <br />
                          Unlock{" "}
                          <span className="text-sky-700 font-medium">
                            {getUnlockFeature(level.level_number)}
                          </span>
                        </>
                      ) : null}
                      <br />
                      {getMemberPercentage(level.level_number)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {levels.slice(Math.ceil(levels.length / 2)).map(level => (
                <div
                  key={level.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    level.level_number === currentLevelNumber
                      ? "bg-amber-50 border-amber-100"
                      : ""
                  }`}
                >
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      level.level_number === currentLevelNumber
                        ? "bg-amber-100 text-amber-800 font-bold"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {level.level_number <= currentLevelNumber ? (
                      level.level_number
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-medium ${
                        level.level_number === currentLevelNumber ? "text-amber-800" : ""
                      }`}
                    >
                      Level {level.level_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      Requires {level.required_points} points
                      {getUnlockFeature(level.level_number) ? (
                        <>
                          <br />
                          Unlock{" "}
                          <span className="text-sky-700 font-medium">
                            {getUnlockFeature(level.level_number)}
                          </span>
                        </>
                      ) : null}
                      <br />
                      {getMemberPercentage(level.level_number)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}