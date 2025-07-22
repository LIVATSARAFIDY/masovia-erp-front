"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/sotre/authStore"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { firstname, lastname, email } = useAuthStore()
  const data = {
      user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
        {
          title: "Facturation",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "Génére facture",
              url: "#",
            },
            {
              title: "Facture enregistrer",
              url: "#",
            },
            {
              title: "Template",
              url: "#",
            },
          ],
        },
        {
          title: "Clients",
          url: "#",
          icon: Bot,
          
        },
        // {
        //   title: "Documentation",
        //   url: "#",
        //   icon: BookOpen,
        //   items: [
        //     {
        //       title: "Introduction",
        //       url: "#",
        //     },
        //     {
        //       title: "Get Started",
        //       url: "#",
        //     },
        //     {
        //       title: "Tutorials",
        //       url: "#",
        //     },
        //     {
        //       title: "Changelog",
        //       url: "#",
        //     },
        //   ],
        // },
        // {
        //   title: "Settings",
        //   url: "#",
        //   icon: Settings2,
        //   items: [
        //     {
        //       title: "General",
        //       url: "#",
        //     },
        //     {
        //       title: "Team",
        //       url: "#",
        //     },
        //     {
        //       title: "Billing",
        //       url: "#",
        //     },
        //     {
        //       title: "Limits",
        //       url: "#",
        //     },
        //   ],
        // },
      ],
      navSecondary: [
        {
          title: "Support",
          url: "#",
          icon: LifeBuoy,
        },
        {
          title: "Feedback",
          url: "#",
          icon: Send,
        },
      ],
      projects: [
        {
          name: "Profil",
          url: "#",
          icon: Frame,
        },
        {
          name: "utilisateurs",
          url: "#",
          icon: PieChart,
        },
        // {
        //   name: "Travel",
        //   url: "#",
        //   icon: Map,
        // },
      ],
  }
  const dataUser = React.useRef({name: firstname+' '+lastname,email: email,avatar: "https://github.com/shadcn.png"})
  
  // React.useEffect(() => {
  //   console.log('dans app-sider', firstname, lastname)
  //   dataUser.current = {
  //     name: firstname + " " + lastname,
  //     email: email,
  //     avatar: "https://github.com/shadcn.png",
  //   }
  // },[firstname, lastname, email])
  return (
    <Sidebar variant="floating"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Masovia</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataUser.current} />
      </SidebarFooter>
    </Sidebar>
  )
}
