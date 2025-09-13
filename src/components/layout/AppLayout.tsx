import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Bell, User } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <div className="flex flex-col flex-1">
          {/* Top Navigation */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">Personal Finance Assistant</h1>
                <p className="text-sm text-muted-foreground">Manage your wealth with AI</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <EnhancedButton variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </EnhancedButton>
              <EnhancedButton variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </EnhancedButton>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}