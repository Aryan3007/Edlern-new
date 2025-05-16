"use client"

import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { BarChart3, Bell, BookOpen, FileText, Flag, Home, Menu, MessageSquare, Search, Settings, ShieldAlert, Users, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/pages/community/comps/theme-toggle"

export function AdminHeader() {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2 mr-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
                <div className="flex h-16 items-center px-4 border-b">
                  <Link to="/admin" className="font-semibold text-lg">
                    Admin Dashboard
                  </Link>
                </div>
                <div className="py-4">
                  <AdminMobileNav />
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/admin" className="font-semibold text-lg hidden sm:inline-block">
            Aryan's Community
          </Link>
        </div>

        {isMobile ? (
          <>
            {isSearchOpen ? (
              <div className="flex-1 flex items-center">
                <Input placeholder="Search..." className="h-9 w-full" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="ml-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1"></div>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="mr-2">
                  <Search className="h-5 w-5" />
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-full pl-8 h-9 bg-secondary border-none" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>

          <Link to="/" className="hidden md:block">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=HA" alt="Hamza Ahmed" />
                  <AvatarFallback className="bg-primary/20">HA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/admin/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/" className="flex items-center w-full">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Site</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function AdminMobileNav() {
  const adminNavItems = [
    { name: "Dashboard", to: "/community/admin/dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Members", to: "/community/admin/members", icon: <Users className="h-5 w-5" /> },
    { name: "Content", to: "/community/admin/content", icon: <FileText className="h-5 w-5" /> },
    { name: "Courses", to: "/community/admin/courses", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Messages", to: "/community/admin/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { name: "Reports", to: "/community/admin/reports", icon: <Flag className="h-5 w-5" /> },
    { name: "Notifications", to: "/community/admin/notifications", icon: <Bell className="h-5 w-5" /> },
    { name: "Moderation", to: "/community/admin/moderation", icon: <ShieldAlert className="h-5 w-5" /> },
    { name: "Settings", to: "/community/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <nav className="space-y-1 px-2">
      {adminNavItems.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
        >
           {item.icon}
          {item.name}
        </Link>
      ))}
      <div className="pt-4 mt-4 border-t">
        <Link
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary transition-colors"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </nav>
  )
}
