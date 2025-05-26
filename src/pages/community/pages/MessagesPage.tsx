import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MoreHorizontal, ChevronLeft, Smile } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Interfaces for chat data
interface MemberData {
  name: string;
  user_id: string;
  member_id: number;
  is_admin: boolean;
}

interface APIChatRoom {
  id: number;
  members_data: MemberData[];
  created_at: string;
  updated_at: string;
  is_group: boolean;
  title: string;
  community: number;
}

interface Conversation {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  active: boolean;
  otherMemberId: number;
}

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface APIMessage {
  id: number;
  sender_name: string;
  receiver_name: string;
  created_at: string;
  updated_at: string;
  content: string;
  is_read: boolean;
  room: number;
  sender: number;
}

// WebSocket message interface
interface WebSocketMessage {
  type: string;
  message: {
    id: number;
    sender_name: string;
    receiver_name: string;
    created_at: string;
    updated_at: string;
    content: string;
    is_read: boolean;
    room: number;
    sender: number;
  };
}

export default function MessagesPage() {
  const { community_id } = useParams<{ community_id: string }>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const location = useLocation();
  const userId = "1dc6b82a-ab24-4e52-ab55-7ecebf987cc2"; // Extracted from JWT token; ideally, get this from auth state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Extract navigation state
  const { roomId, memberId, memberName } = (location.state as { roomId?: number; memberId?: number; memberName?: string }) || {};

  // Fetch all chat rooms
  const fetchChatRooms = useCallback(async () => {
    if (!community_id || !accessToken) {
      setError("Missing community ID or authentication token");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/chats/community/${community_id}/member-chat/my-chat-rooms/`,
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

      const data: { message: string; success: boolean; data: { results: APIChatRoom[] } } = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const fetchedConversations: Conversation[] = data.data.results.map((room) => {
        // Find the other member (not the current user)
        const otherMember = room.members_data.find(member => member.user_id !== userId);

        return {
          id: room.id,
          name: otherMember?.name || "Unknown User",
          image: `/placeholder.svg?height=40&width=40&text=${otherMember?.name?.charAt(0) || "U"}`,
          lastMessage: "No messages yet", // This should be updated with actual last message
          time: new Date(room.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          unread: false,
          active: room.id === roomId,
          otherMemberId: otherMember?.member_id || 0,
        };
      });

      setConversations(fetchedConversations);
      // If navigated from MembersPage, select the conversation
      if (roomId && memberId && memberName) {
        const targetConversation = fetchedConversations.find((conv) => conv.id === roomId);
        if (targetConversation) {
          setSelectedConversation(targetConversation);
          setShowMobileChat(true);
        } else {
          // Fallback: Create a temporary conversation if not found
          setSelectedConversation({
            id: roomId,
            name: memberName,
            image: `/placeholder.svg?height=40&width=40&text=${memberName.charAt(0)}`,
            lastMessage: "No messages yet",
            time: "N/A",
            unread: false,
            active: true,
            otherMemberId: memberId,
          });
        }
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch chat rooms");
    } finally {
      setLoading(false);
    }
  }, [community_id, accessToken, roomId, memberId, memberName, userId]);

  // Fetch messages for the selected conversation
  const fetchMessages = useCallback(async (roomId: number) => {
    if (!community_id || !accessToken) {
      setError("Missing community ID or authentication token");
      return;
    }

    try {
      const response = await fetch(
        `https://edlern.toolsfactory.tech/api/v1/chats/community/${community_id}/member-chat/room/${roomId}/chat/`,
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

      const data: { message: string; success: boolean; data: { results: APIMessage[] } } = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const fetchedMessages: Message[] = data.data.results.map((msg) => ({
        id: msg.id,
        sender: msg.sender === parseInt(userId, 10) ? "me" : "them",
        text: msg.content,
        time: new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }));

      setMessages((prev) => ({
        ...prev,
        [roomId]: fetchedMessages,
      }));

      // Update the last message in conversations
      if (fetchedMessages.length > 0) {
        const lastMessage = fetchedMessages[0];
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === roomId
              ? {
                ...conv,
                lastMessage: lastMessage.text,
                time: lastMessage.time,
              }
              : conv
          )
        );
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    }
  }, [community_id, accessToken, userId]);

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback((roomId: number) => {
    if (!community_id || !accessToken) return;

    const wsUrl = `wss://edlern.toolsfactory.tech/ws/chats/community/community-member-chat/?token=${accessToken}&community_id=${community_id}&room_id=${roomId}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data.type === 'chat_message' && data.message) {
          const newMessage: Message = {
            id: data.message.id,
            sender: data.message.sender === parseInt(userId, 10) ? "me" : "them",
            text: data.message.content,
            time: new Date(data.message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };

          // Update messages
          setMessages((prev) => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), newMessage],
          }));

          // Update conversation last message
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === roomId
                ? {
                  ...conv,
                  lastMessage: newMessage.text,
                  time: newMessage.time,
                }
                : conv
            )
          );

          // Scroll to bottom
          setTimeout(scrollToBottom, 100);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [community_id, accessToken, userId]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  // Initialize WebSocket when selecting a conversation
  useEffect(() => {
    if (selectedConversation) {
      // Close existing connection if any
      if (ws) {
        ws.close();
      }
      // Initialize new connection
      initializeWebSocket(selectedConversation.id);
    }
  }, [selectedConversation, initializeWebSocket]);

  // Update handleSendMessage to use WebSocket
// Update handleSendMessage to use WebSocket
const handleSendMessage = () => {
  if (!newMessage.trim() || !selectedConversation || !ws) return;

  try {
    // Send message through WebSocket in the specified format
    const messagePayload = {
      message: newMessage.trim(),
    };
    ws.send(JSON.stringify(messagePayload));

    // Clear input after sending
    setNewMessage("");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to send message");
  }
};

  // Select a conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setConversations((prev) =>
      prev.map((conv) => ({
        ...conv,
        active: conv.id === conversation.id,
        unread: conv.id === conversation.id ? false : conv.unread,
      }))
    );
    setShowMobileChat(true);
    fetchMessages(conversation.id);
    setTimeout(scrollToBottom, 100);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    e.target.style.height = "auto";
    const newHeight = Math.min(e.target.scrollHeight, 120);
    e.target.style.height = `${newHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fetch chat rooms on mount
  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  // Fetch messages when selectedConversation changes
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation, fetchMessages]);

  // Scroll to bottom when messages or selected conversation changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation, showMobileChat]);

  return (
    <div className="container select-none w-full lg:w-7xl mx-auto py-0">
      <Card className="h-[calc(100svh-80px)] max-w-7xl mx-auto p-0 flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 h-full overflow-hidden">
          {/* Conversations List */}
          <div className={`border-r overflow-hidden flex flex-col ${showMobileChat ? "hidden md:flex" : "flex"}`}>
            <CardHeader className="px-4 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-6">Loading conversations...</div>
                ) : error ? (
                  <div className="text-center py-6 text-red-600">{error}</div>
                ) : conversations.length === 0 ? (
                  <div className="text-center py-6">No conversations found</div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-start gap-3 p-4 cursor-pointer ${conversation.active ? "bg-sky-600/5 border-l-4 border-sky-600" : ""
                        }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.image} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${conversation.unread ? "text-gray-600" : "text-gray-700"}`}>
                            {conversation.name}
                          </span>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p
                          className={`text-sm truncate ${conversation.unread ? "font-medium text-gray-400" : "text-gray-500"}`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-lime-600" />}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </div>

          {/* Chat Area */}
          <div className={`col-span-2 flex flex-col h-full overflow-hidden ${!showMobileChat ? "hidden md:flex" : "flex"}`}>
            <div className="border-b p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setShowMobileChat(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                {selectedConversation ? (
                  <>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.image} alt={selectedConversation.name} />
                      <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedConversation.name}</div>
                      <div className="text-xs text-green-500">Online</div>
                    </div>
                  </>
                ) : (
                  <div className="font-medium">Select a conversation</div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" id="message-container">
              {selectedConversation && messages[selectedConversation.id] ? (
                messages[selectedConversation.id].map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-end gap-2 max-w-[70%]">
                      {message.sender === "them" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedConversation.image} alt={selectedConversation.name} />
                          <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${message.sender === "me" ? "bg-sky-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {message.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 px-1">{message.time}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">No messages yet</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-3 flex-shrink-0">
              {selectedConversation && (
                <div className="flex items-end gap-2">
                
                  <Textarea
                    placeholder="Type a message..."
                    className="flex-1 min-h-10 max-h-32 py-2 resize-none"
                    value={newMessage}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    style={{ height: "auto" }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full flex-shrink-0"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-full bg-sky-600 hover:bg-sky-700 flex-shrink-0"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}