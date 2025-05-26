"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, MessageSquare, PentagonIcon, RefreshCw, Check, X, Eye } from "lucide-react";
import { CommunitySidebar } from "../comps/community-sidebar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Interface for individual member from API
interface APIMember {
  id: number;
  created_at: string;
  updated_at: string;
  role: "creator" | "member" | "moderator";
  status: "approved" | "pending" | "rejected";
  reason: string | null;
  community: number;
  user: string;
  approved_by: string | null;
  fullname: string;
  profile_picture: string | null;
  bio: string;
  is_online: boolean;
}

// Interface for user question response in join request
interface UserQuestionResponse {
  id: number;
  question_text: string;
  answer_text: string;
  is_deleted: boolean;
  user: string;
  question: number;
}

// Interface for join request from API
interface APIJoinRequest {
  id: number;
  community: number;
  first_name: string;
  last_name: string;
  user: string;
  status: "pending" | "approved" | "rejected";
  user_question_response: UserQuestionResponse[];
}

// Interface for API response for members
interface APIResponse {
  message: string;
  success: boolean;
  data: {
    next: string | null;
    previous: string | null;
    count: number;
    limit: number;
    current_page: number;
    total_pages: number;
    results: APIMember[];
  };
}

// Interface for member data used in UI
interface Member {
  id: number;
  name: string;
  is_online: boolean;
  image: string;
  bio: string;
  role: string;
  joinedDate: string;
}

// Interface for join request data used in UI
interface JoinRequest {
  id: number;
  name: string;
  status: "pending" | "approved" | "rejected";
  userQuestionResponses: UserQuestionResponse[];
}

// Interface for answers dialog state
interface AnswersDialog {
  open: boolean;
  requestId: number | null;
  name: string;
  responses: UserQuestionResponse[];
}

export default function MembersPage() {
  const { community_id } = useParams<{ community_id: string }>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRequests, setLoadingRequests] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorRequests, setErrorRequests] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "role-asc" | "role-desc">("newest");
  const [activeTab, setActiveTab] = useState<"all" | "creator" | "moderator" | "member" | "requests">("all");
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    requestId: number | null;
    action: "approved" | "rejected" | null;
  }>({ open: false, requestId: null, action: null });
  const [answersDialog, setAnswersDialog] = useState<AnswersDialog>({
    open: false,
    requestId: null,
    name: "",
    responses: [],
  });
  const limit = 10;

  // Debounce function for search handler
  const debounce = <T extends (query: string) => void>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(query), delay);
    };
  };

  // Fetch members
  const fetchMembers = useCallback(async () => {
    if (!community_id || !accessToken) {
      setError("Missing community ID or authentication token");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(searchQuery && { search: searchQuery }),
        ...(sortBy && {
          sort: sortBy === "newest" ? "-created_at" : sortBy === "oldest" ? "created_at" : sortBy === "role-asc" ? "role" : "-role",
        }),
        ...(activeTab !== "all" && activeTab !== "requests" && { role: activeTab }),
      });

      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/community/${community_id}/members/?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: APIResponse = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const fetchedMembers: Member[] = data.data.results.map((member) => ({
        id: member.id,
        name: member.fullname,
        is_online: member.is_online,
        image: member.profile_picture || `/placeholder.svg?height=40&width=40&text=${member.fullname.charAt(0)}`,
        bio: member.bio || "No bio provided",
        role: member.role,
        joinedDate: new Date(member.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));

      setMembers(fetchedMembers);
      setTotalPages(data.data.total_pages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }, [community_id, accessToken, page, searchQuery, sortBy, activeTab]);

  // Fetch join requests
  const fetchJoinRequests = useCallback(async () => {
    if (!community_id || !accessToken) {
      setErrorRequests("Missing community ID or authentication token");
      setLoadingRequests(false);
      return;
    }

    try {
      setLoadingRequests(true);
      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/community/${community_id}/community-joining-requests/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: { message: string; success: boolean; data: { results: APIJoinRequest[] } } = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const fetchedRequests: JoinRequest[] = data.data.results.map((request) => ({
        id: request.id,
        name: `${request.first_name} ${request.last_name}`,
        status: request.status,
        userQuestionResponses: request.user_question_response.filter((response) => !response.is_deleted),
      }));

      setJoinRequests(fetchedRequests);
      setErrorRequests(null);
    } catch (err) {
      setErrorRequests(err instanceof Error ? err.message : "Failed to fetch join requests");
    } finally {
      setLoadingRequests(false);
    }
  }, [community_id, accessToken]);

  // Handle status update for join requests
  const handleStatusUpdate = async (requestId: number, status: "approved" | "rejected") => {
    if (!community_id || !accessToken) {
      setErrorRequests("Missing community ID or authentication token");
      return;
    }

    try {
      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/community/${community_id}/community-joining-request-status-update/${requestId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      setJoinRequests((prev) =>
        prev.map((req) => (req.id === requestId ? { ...req, status } : req))
      );
      setConfirmationDialog({ open: false, requestId: null, action: null });
      if (status === "approved") {
        fetchMembers();
      }
    } catch (err) {
      setErrorRequests(err instanceof Error ? err.message : "Failed to update request status");
    }
  };

  // Handle chat button click
  const handleChatClick = async (memberId: number, memberName: string) => {
    if (!community_id || !accessToken) {
      setError("Missing community ID or authentication token");
      return;
    }

    try {
      // Step 1: Check if a chat room already exists
      const checkResponse = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/chats/community/${community_id}/member-chat/check-one-to-one-chat/?other_member_id=${memberId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const checkData = await checkResponse.json();
      if (!checkResponse.ok) {
        throw new Error(checkData.message || "Failed to check chat room");
      }

      let roomId: number;
      if (checkData.success && checkData.message === "Conversation already exists") {
        // Chat room exists
        roomId = checkData.data.chat_room_id;
      } else {
        // Step 2: Create a new chat room if none exists
        const createResponse = await fetch(
          `https://edlern.toolsfactory.tech/api/v1/chats/community/${community_id}/member-chat/create-one-to-one-chat/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ other_member_id: String(memberId) }),
          }
        );

        const createData = await createResponse.json();
        if (!createResponse.ok || !createData.success) {
          throw new Error(createData.message || "Failed to create chat room");
        }
        roomId = createData.data.room_id;
      }

      // Step 3: Navigate to MessagesPage with roomId and member details
      navigate(`/27/community/messages`, {
        state: {
          roomId,
          memberId,
          memberName,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate chat");
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "requests") {
      fetchJoinRequests();
    } else {
      fetchMembers();
    }
  }, [fetchMembers, fetchJoinRequests, activeTab]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Handle search input
  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  // Handle sort change
  const handleSortChange = (value: "newest" | "oldest" | "role-asc" | "role-desc") => {
    setSortBy(value);
    setPage(1);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    if (["all", "creator", "moderator", "member", "requests"].includes(value)) {
      setActiveTab(value as "all" | "creator" | "moderator" | "member" | "requests");
      setPage(1);
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle retry on error
  const handleRetry = () => {
    setError(null);
    setErrorRequests(null);
    if (activeTab === "requests") {
      fetchJoinRequests();
    } else {
      fetchMembers();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-[97px]">
            <CommunitySidebar communityId={community_id || "exit"} />
          </div>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by name or bio..."
                    className="pl-10"
                    onChange={(e) => handleSearch(e.target.value)}
                    aria-label="Search members"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="role-asc">Role (A-Z)</SelectItem>
                      <SelectItem value="role-desc">Role (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2" disabled>
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full mb-6">
                <TabsList className="grid grid-cols-5 w-full max-w-[500px]">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="creator">Creators</TabsTrigger>
                  <TabsTrigger value="moderator">Moderators</TabsTrigger>
                  <TabsTrigger value="member">Members</TabsTrigger>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                  {activeTab === "requests" ? (
                    loadingRequests ? (
                      <div className="text-center py-6">
                        <div className="animate-spin inline-block h-6 w-6 mr-2">
                          <RefreshCw className="h-6 w-6 text-sky-600" />
                        </div>
                        Loading join requests...
                      </div>
                    ) : errorRequests ? (
                      <div className="text-center py-6 text-red-600">
                        <p>{errorRequests}</p>
                        <Button variant="outline" onClick={handleRetry} className="mt-4">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    ) : joinRequests.length === 0 ? (
                      <div className="text-center py-6">No join requests found</div>
                    ) : (
                      <div className="space-y-4">
                        {joinRequests.map((request) => (
                          <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${request.name.charAt(0)}`} alt={request.name} />
                                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    <h3 className="font-medium text-lg">{request.name}</h3>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() =>
                                          setAnswersDialog({
                                            open: true,
                                            requestId: request.id,
                                            name: request.name,
                                            responses: request.userQuestionResponses,
                                          })
                                        }
                                        aria-label={`View answers for ${request.name}`}
                                      >
                                        <Eye className="h-4 w-4" />
                                        View Answers
                                      </Button>
                                      {request.status === "pending" ? (
                                        <>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 text-green-600 border-green-600 hover:bg-green-50"
                                            onClick={() =>
                                              setConfirmationDialog({
                                                open: true,
                                                requestId: request.id,
                                                action: "approved",
                                              })
                                            }
                                            aria-label={`Approve ${request.name}'s request`}
                                          >
                                            <Check className="h-4 w-4" />
                                            Approve
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
                                            onClick={() =>
                                              setConfirmationDialog({
                                                open: true,
                                                requestId: request.id,
                                                action: "rejected",
                                              })
                                            }
                                            aria-label={`Reject ${request.name}'s request`}
                                          >
                                            <X className="h-4 w-4" />
                                            Reject
                                          </Button>
                                        </>
                                      ) : (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className={`text-sm capitalize ${request.status === "approved" ? "text-green-600" : "text-red-600"}`}
                                        >
                                          {request.status}
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2">Join Request Status: {request.status}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  ) : (
                    loading ? (
                      <div className="text-center py-6">
                        <div className="animate-spin inline-block h-6 w-6 mr-2">
                          <RefreshCw className="h-6 w-6 text-sky-600" />
                        </div>
                        Loading members...
                      </div>
                    ) : error ? (
                      <div className="text-center py-6 text-red-600">
                        <p>{error}</p>
                        <Button variant="outline" onClick={handleRetry} className="mt-4">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                      </div>
                    ) : members.length === 0 ? (
                      <div className="text-center py-6">No members found</div>
                    ) : (
                      <div className="space-y-4">
                        {members.map((member) => (
                          <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={member.image} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                                    <h3 className="font-medium text-lg">
                                      {member.name}
                                      {member.is_online ? (
                                        <span className="text-green-600 text-xs border-green-500 border rounded-full ml-2 px-2">Online</span>
                                      ) : (
                                        <span className="text-red-500 text-xs border-red-500 border ml-2 px-2 rounded-full">Offline</span>
                                      )}
                                    </h3>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-2"
                                      onClick={() => handleChatClick(member.id, member.name)}
                                      aria-label={`Chat with ${member.name}`}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                      Chat
                                    </Button>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{member.bio}</p>
                                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                      <PentagonIcon className="h-4 w-4" />
                                      <span className="capitalize">{member.role}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      <span>Joined {member.joinedDate}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>
              </Tabs>

              {activeTab !== "requests" && totalPages > 1 && !loading && !error && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        aria-disabled={page === 1}
                        aria-label="Previous page"
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          onClick={() => handlePageChange(p)}
                          isActive={p === page}
                          className="cursor-pointer"
                          aria-label={`Page ${p}`}
                          aria-current={p === page ? "page" : undefined}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                        className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        aria-disabled={page === totalPages}
                        aria-label="Next page"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={confirmationDialog.open}
        onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, open })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmationDialog.action === "approved" ? "Approve Join Request" : "Reject Join Request"}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmationDialog.action} this join request?
              {confirmationDialog.action === "approved"
                ? " The user will be added to the community as a member."
                : " The user will be notified of the rejection."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmationDialog({ open: false, requestId: null, action: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                confirmationDialog.requestId &&
                confirmationDialog.action &&
                handleStatusUpdate(confirmationDialog.requestId, confirmationDialog.action)
              }
              className={confirmationDialog.action === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {confirmationDialog.action === "approved" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={answersDialog.open}
        onOpenChange={(open) => setAnswersDialog({ ...answersDialog, open })}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Join Request Answers for {answersDialog.name}</DialogTitle>
            <DialogDescription>
              Below are the answers provided by {answersDialog.name} for the community join questions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {answersDialog.responses.length === 0 ? (
              <p className="text-gray-500">No answers provided.</p>
            ) : (
              answersDialog.responses.map((response) => (
                <div key={response.id} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium text-gray-800">{response.question_text}</h4>
                  <p className="text-gray-600 mt-1">{response.answer_text}</p>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAnswersDialog({ open: false, requestId: null, name: "", responses: [] })}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}