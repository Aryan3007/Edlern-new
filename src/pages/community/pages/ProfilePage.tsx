"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Calendar, Settings, Instagram, Linkedin, Facebook, Globe, Pencil, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import { PostCard } from "../comps/post-card";
import { SERVER_URL } from "@/config/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { Post } from "../comps/types/community";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  achievements: string[];
  professions: string[];
  user: string;
  first_name: string;
  last_name: string;
}

interface ApiResponse {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { community_id } = useParams<{ community_id: string }>();

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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Fetch profile and posts sequentially
  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      if (!community_id) {
        setError("Community ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Step 1: Fetch profile
        const profileResponse = await axios.get<{ data: Profile }>(
          `${SERVER_URL}/api/v1/accounts/me/profile/`,
          {
            headers: getAuthHeaders(),
          }
        );
        const fetchedProfile = profileResponse.data.data;
        setProfile(fetchedProfile);

        // Step 2: Fetch posts using profile.user as author_id
        const postsResponse = await axios.get<ApiResponse>(
          `${SERVER_URL}/api/v1/community/${community_id}/feed/posts/?author_id=${fetchedProfile.user}`,
          {
            headers: getAuthHeaders(),
          }
        );
        setPosts(postsResponse.data.data.results);
        setNextPage(postsResponse.data.data.next);
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Failed to fetch profile or posts";
        setError(errorMessage);

        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [accessToken, community_id]);

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (!nextPage || !community_id || loadingMore) return;

    try {
      setLoadingMore(true);
      const response = await axios.get<ApiResponse>(nextPage, {
        headers: getAuthHeaders(),
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data.data.results]);
      setNextPage(response.data.data.next);
    } catch (err) {

      console.error("Error loading more posts:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [nextPage, community_id, loadingMore]);

  // Handle like toggle
  const handleLikeToggle = useCallback(
    (postId: number, newLikeState: boolean, newLikeCount: number) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, is_liked_by_me: newLikeState, total_likes: newLikeCount }
            : post
        )
      );
    },
    []
  );

  // Format relative time
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

  // Get author initial
  const getAuthorInitial = useCallback((authorName: string | undefined): string => {
    if (!authorName) return "U";
    return authorName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, []);

  // Open post detail
  const openPostDetail = useCallback((post: Post) => {
    console.log("Opening post detail:", post);
    // Implement navigation or modal logic here
  }, []);

  const handleEditProfile = () => {
    setEditedProfile(profile);
    setIsEditDialogOpen(true);
  };

  const handleProfileUpdate = async () => {
    if (!editedProfile) return;

    try {
      setIsUpdating(true);
      const response = await axios.put(
        `${SERVER_URL}/api/v1/accounts/me/profile/`,
        {
          bio: editedProfile.bio,
          first_name: editedProfile.first_name,
          last_name: editedProfile.last_name,
          social_links: editedProfile.social_links,
          is_private_account: editedProfile.is_private_account,
          professions: editedProfile.professions,
          achievements: editedProfile.achievements,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      setProfile(response.data.data);
      toast.success("Profile updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }
  if (!profile) {
    return <div className="text-center text-gray-500">No profile data</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="grid grid-cols-1 relative md:grid-cols-4 gap-6">
        <div className="md:col-span-1 lg:sticky lg:top-6">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-full flex justify-end mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEditProfile}
                    className="absolute -top-2 -right-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <Avatar className="h-24 w-24 border-4 border-lime-600">
                  <AvatarImage src={profile.profile_picture} alt={`${profile.first_name} ${profile.last_name}`} />
                  <AvatarFallback>{getAuthorInitial(`${profile.first_name} ${profile.last_name}`)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h2>
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

                {/* Professions */}
                {profile.professions && profile.professions.length > 0 && (
                  <div className="mt-4 w-full">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Professions</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.professions.map((profession, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent">
                          {profession}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {profile.achievements && profile.achievements.length > 0 && (
                  <div className="mt-4 w-full">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

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
                    <Link to={profile.social_links.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" aria-label="Instagram profile">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.linkedin && (
                    <Link to={profile.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" aria-label="LinkedIn profile">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.facebook && (
                    <Link to={profile.social_links.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" aria-label="Facebook profile">
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {profile.social_links.website && (
                    <Link to={profile.social_links.website} target="_blank" rel="noopener noreferrer">
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-6 space-y-6">
                  {posts.map((post) => (
                    <div key={post.id}>
                      <PostCard
                        post={post}
                        communityId={community_id!}
                        formatRelativeTime={formatRelativeTime}
                        getAuthorInitial={getAuthorInitial}
                        openPostDetail={openPostDetail}
                        onLikeToggle={handleLikeToggle}
                      />
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-center text-gray-500">No posts available</p>}
                  {nextPage && (
                    <div className="flex justify-center mt-6">
                      <Button
                        variant="outline"
                        onClick={loadMorePosts}
                        disabled={loadingMore}
                      >
                        {loadingMore ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        View More Posts
                      </Button>
                    </div>
                  )}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          {editedProfile && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={editedProfile.first_name}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={editedProfile.last_name}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, last_name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Social Links</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={editedProfile.social_links.linkedin || ""}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          social_links: {
                            ...editedProfile.social_links,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={editedProfile.social_links.instagram || ""}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          social_links: {
                            ...editedProfile.social_links,
                            instagram: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Professions</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedProfile.professions.map((profession, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent flex items-center gap-1">
                      {profession}
                      <button
                        onClick={() => {
                          setEditedProfile({
                            ...editedProfile,
                            professions: editedProfile.professions.filter((_, i) => i !== index)
                          });
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newProfession"
                    placeholder="Add a profession"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        e.preventDefault();
                        setEditedProfile({
                          ...editedProfile,
                          professions: [...editedProfile.professions, e.currentTarget.value.trim()]
                        });
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input.value.trim()) {
                        setEditedProfile({
                          ...editedProfile,
                          professions: [...editedProfile.professions, input.value.trim()]
                        });
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                <div className="flex flex-wrap gap-2">
                  {editedProfile.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProfileUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}