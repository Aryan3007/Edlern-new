import type React from "react"
import { AdminHeader } from "../comps/admin-header"
import { AdminSidebar } from "../comps/admin-sidebar"


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 pt-20 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
