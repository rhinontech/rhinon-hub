import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/campaigns": "Campaigns",
  "/leads": "Leads",
  "/templates": "Templates",
  "/inbox": "Inbox",
  "/team": "Team",
  "/settings": "Settings",
};

const pageActions: Record<string, { label: string; icon: typeof Plus }> = {
  "/campaigns": { label: "New Campaign", icon: Plus },
  "/leads": { label: "Import Leads", icon: Plus },
  "/templates": { label: "New Template", icon: Plus },
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Rhinon";
  const action = pageActions[location.pathname];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <h1 className="text-sm font-semibold text-foreground">{title}</h1>
            <div className="ml-auto flex items-center gap-2">
              {action && (
                <Button size="sm" className="h-8 gap-1.5 text-xs">
                  <action.icon className="h-3.5 w-3.5" />
                  {action.label}
                </Button>
              )}
              <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
