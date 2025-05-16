
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Users,
  FileText,
  BookOpen,
  Settings,
  Bell,
  Flag,
  ShieldAlert,
  MessageSquare,
  Home,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"



export function AdminSidebar() {
  const { '*': pathname } = useParams()
  const { community_id } = useParams<{ community_id: string }>();

  const [collapsed, setCollapsed] = useState(false)

  const adminNavItems = [
    { name: "Dashboard", to: `/${community_id}/community/admin/dashboard`, icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Members",to: `/${community_id}/community/admin/members`, icon: <Users className="h-5 w-5" /> },
    { name: "Content", to: `/${community_id}/community/admin/content`, icon: <FileText className="h-5 w-5" /> },
    { name: "Courses", to: `/${community_id}/community/admin/courses`, icon: <BookOpen className="h-5 w-5" /> },
    { name: "Messages",to: `/${community_id}/community/admin/messages`, icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Reports", to: `/${community_id}/community/admin/reports`, icon: <Flag className="h-5 w-5" /> },
    { name: "Notifications",to: `/${community_id}/community/admin/notifications`, icon: <Bell className="h-5 w-5" /> },
    { name: "Moderation", to: `/${community_id}/community/admin/moderation`, icon: <ShieldAlert className="h-5 w-5" /> },
    { name: "Settings",to: `/${community_id}/community/admin/settings`, icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <aside
      className={`hidden lg:block sticky top-16 h-[calc(100vh-4rem)] ${
        collapsed ? "w-16" : "w-60"
      } transition-all duration-300 border-r`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h2 className="font-semibold text-lg">Community Admin</h2>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 ml-auto">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 py-2 overflow-y-auto">
          <div className="space-y-1 px-2">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
            >
              <Home className="h-5 w-5" />
              {!collapsed && <span>Back to Community</span>}
            </Link>
          </div>

          <Separator className="my-4" />

          <div className="space-y-1 px-2">
            {adminNavItems.map((item) => {
              

              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    `/${pathname}` === item.to
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}
