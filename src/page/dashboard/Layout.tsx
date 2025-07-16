import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}