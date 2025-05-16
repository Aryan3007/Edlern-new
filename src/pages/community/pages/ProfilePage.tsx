"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, Settings, Instagram, Linkedin, Facebook, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import { PostCard } from "../comps/post-card";
import { SERVER_URL } from "@/config/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Post, ApiResponse } from "@/pages/community/comps/types/community";

interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  bio: string;
  profile_picture: string;
  follower_count: number;
  following_count: number;
  social_links: SocialLinks;
  is_private_account: boolean;
  user: string; // Assuming user is the username
}


export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Headers with Bearer token
  const getAuthHeaders = (isFormData: boolean = false): AxiosHeaders => {
    const headers = new AxiosHeaders();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        setLoading(true);

        // Fetch profile
        const profileResponse = await axios.get<{ data: Profile }>(
          `${SERVER_URL}/api/v1/accounts/me/profile/`,
          {
            headers: getAuthHeaders(),
          }
        );
        setProfile(profileResponse.data.data);

        // Fetch posts
        const postsResponse = await axios.get<ApiResponse>(
          `${SERVER_URL}/api/v1/community/24/feed/posts/?author_id=1a8f0206-7fd0-49fc-9878-a0c57d195380`,
          {
            headers: getAuthHeaders(),
          }
        );
        setPosts(postsResponse.data.data.results);
      } catch (err) {
        setError("Failed to fetch profile or posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [accessToken]);

  const formatRelativeTime = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const value = Math.floor(diffInSeconds / unit.seconds);
      if (value >= 1) {
        return `${value} ${unit.name}${value > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }, []);

  const getAuthorInitial = useCallback((authorName: string | undefined): string => {
    if (!authorName) return "U";
    return authorName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, []);

  const openPostDetail = useCallback((post: Post) => {
    // Implement post detail navigation or modal logic here
    console.log("Opening post detail:", post);
  }, []);

  if (loading) return <div className="h-screen w-screen flex justify-center items-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="grid grid-cols-1 relative md:grid-cols-4 gap-6">
        <div className="md:col-span-1 lg:sticky lg:top-6">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-lime-600">
                  <AvatarImage src={profile.profile_picture} alt="User profile" />
                  <AvatarFallback>{getAuthorInitial(profile.user)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{profile.user || "User"}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <Badge variant="outline" className="bg-lime-600/10 text-lime-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    <span className="text-xs">Level 1</span>
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 text-center mt-2">{profile.bio || "No bio available"}</p>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  <div>
                    <div className="font-semibold">{posts.length}</div>
                    <div className="text-xs text-gray-500">Posts</div>
                  </div>
                  <div>
                    <div className="font-semibold">{profile.follower_count}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div>
                    <div className="font-semibold">{profile.following_count}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                </div>

                <div className="flex gap-2 justify-center items-center mt-6 w-full">
                  {profile.social_links.instagram && (
                    <Link to={profile.social_links.instagram}>
                      <Button variant="outline" size="icon" aria-label="Instagram profile">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.linkedin && (
                    <Link to={profile.social_links.linkedin}>
                      <Button variant="outline" size="icon" aria-label="LinkedIn profile">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.facebook && (
                    <Link to={profile.social_links.facebook}>
                      <Button variant="outline" size="icon" aria-label="Facebook profile">
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.website && (
                    <Link to={profile.social_links.website}>
                      <Button variant="outline" size="icon" aria-label="Website">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{profile.user || "User"}'s Activity</CardTitle>
                <Button variant="outline" size="sm" className="gap-1">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="posts">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6 space-y-6">
                  {posts.map((post) => (
                    <div key={post.id}>
                      <PostCard
                        post={post}
                        formatRelativeTime={formatRelativeTime}
                        getAuthorInitial={getAuthorInitial}
                        openPostDetail={openPostDetail}
                      />
                      <Separator className="mt-4" />
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-center text-gray-500">No posts available</p>}
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">View More Posts</Button>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="mt-6 space-y-6">
                  <p className="text-center text-gray-500">No comments available</p>
                </TabsContent>

                <TabsContent value="courses" className="mt-6">
                  <p className="text-center text-gray-500">No courses available</p>
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <p className="text-center text-gray-500">No achievements available</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}