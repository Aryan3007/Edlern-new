// src/components/CommunityWelcomePage.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  Shield,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

interface CommunityWelcomePageProps {
  communityId: string;
}

interface CommunityData {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  founded: string;
  banner: string;
  logo: string;
  categories: string[];
  rules: string[];
  admins: { id: string; name: string; role: string; avatar: string }[];
  stats: {
    posts: number;
    events: number;
    courses: number;
    activeMembers: number;
  };
  upcomingEvents: { id: string; title: string; date: string; attendees: number }[];
  featuredCourses: { id: string; title: string; students: number; level: string }[];
}

const mockCommunities: CommunityData[] = [
  {
    id: "30",
    name: "Adonis Gang",
    description:
      "The #1 masculine self-improvement community focused on helping men become their best selves through fitness, mindset, and personal development.",
    memberCount: 12453,
    founded: "January 2022",
    banner: "/placeholder.svg?height=300&width=800",
    logo: "/placeholder.svg?height=100&width=100",
    categories: ["Self-Improvement", "Fitness", "Mindset", "Productivity"],
    rules: [
      "Be respectful to all members",
      "No spam or self-promotion without approval",
      "Keep discussions relevant to the community topics",
      "No sharing of illegal content",
      "Respect the privacy of other members",
    ],
    admins: [
      { id: "1", name: "John Doe", role: "Founder", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Mike Smith", role: "Admin", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "3", name: "David Wilson", role: "Moderator", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    stats: {
      posts: 8743,
      events: 156,
      courses: 24,
      activeMembers: 3421,
    },
    upcomingEvents: [
      { id: "1", title: "Weekly Fitness Challenge", date: "May 15, 2025", attendees: 87 },
      { id: "2", title: "Mindset Mastery Workshop", date: "May 18, 2025", attendees: 124 },
    ],
    featuredCourses: [
      { id: "1", title: "Confidence Building Masterclass", students: 1243, level: "Intermediate" },
      { id: "2", title: "Fitness Fundamentals", students: 2156, level: "Beginner" },
    ],
  },
];

const getCommunityData = (communityId: string): CommunityData | undefined => {
  return mockCommunities.find((community) => community.id === communityId);
};

export default function CommunityWelcomePage({ communityId }: CommunityWelcomePageProps) {
  const community = getCommunityData(communityId);

  // Handle case where community is not found
  if (!community) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle>Community Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The community you are looking for does not exist or is not available.
            </p>
            <p className="text-muted-foreground mt-2">
              Website: <a href="https://adonisgang.com" className="text-primary underline">https://adonisgang.com</a>
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-2 space-y-8">
      {/* Banner and basic info */}
      <div className="relative rounded-lg overflow-hidden">
        <div className="h-[200px] md:h-[300px] relative">
          <img
            src={community.banner}
            alt={`${community.name} banner`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-background">
            <img
              src={community.logo}
              alt={community.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold">{community.name}</h1>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Users className="h-4 w-4" />
              <span>{community.memberCount.toLocaleString()} members</span>
              <span>•</span>
              <span>Founded {community.founded}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6">
          <Button>Join Community</Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - About and Rules */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{community.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {community.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted">
                  <MessageSquare className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-xl">{community.stats.posts.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-xl">{community.stats.events}</div>
                  <div className="text-sm text-muted-foreground">Events</div>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-xl">{community.stats.courses}</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-xl">{community.stats.activeMembers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Rules</CardTitle>
              <CardDescription>
                Please follow these guidelines to keep our community positive and productive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {community.rules.map((rule, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 mr-2" />
                Violation of these rules may result in temporary or permanent removal from the community
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right column - Leadership, Events, Courses */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Leadership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {community.admins.map((admin) => (
                  <div key={admin.id} className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={admin.avatar}
                        alt={admin.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {admin.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don't miss out on these community events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {community.upcomingEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Users className="h-3.5 w-3.5" />
                      {event.attendees} attending
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      RSVP
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="link" className="w-full" asChild>
                  <Link to="/events">View All Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {community.featuredCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-3">
                    <div className="font-medium">{course.title}</div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {course.students} students
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Course
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="link" className="w-full" asChild>
                  <Link to="/classroom">Browse All Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
          <Link to={`/community/${communityId}`}>
            <MessageSquare className="h-6 w-6" />
            <span>Community Feed</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
          <Link to="/events">
            <Calendar className="h-6 w-6" />
            <span>Events Calendar</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
          <Link to="/classroom">
            <BookOpen className="h-6 w-6" />
            <span>Browse Courses</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" asChild>
          <Link to="/leaderboards">
            <TrendingUp className="h-6 w-6" />
            <span>Leaderboards</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}