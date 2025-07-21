import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet, useNavigate } from "react-router"
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { useAuthStore } from "@/sotre/authStore"
import { useEffect } from "react"

export default function Layout() {
    const {firstname, lastname, email, setEmail, setFirstname, setLastname} = useAuthStore();
    const navigate = useNavigate()

    useEffect(()=> {
        const user = localStorage.getItem("userConnected")
        
        if(!user) navigate('/')
        else{
            const userParse = JSON.parse(user)
            setEmail(userParse.email)
            setFirstname(userParse.firstname)
            setLastname(userParse.lastname)
        }

    },[firstname, lastname, email])

    return (
        <ThemeProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 shrink-0 items-center gap-2">
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <SidebarTrigger className="border" />
                        </div>
                        <div className="ml-auto px-3">
                            <ModeToggle />
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}