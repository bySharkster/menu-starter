import { LayoutDashboard, Home, Users, Calendar, Settings, LogOut, ForkKnife } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { siteConfig } from "@workspace/db/utils/config";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, href = "#" }) => (
  <a
    href={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
    )}
  >
    {icon}
    <span className="hidden md:inline-block">{label}</span>
  </a>
);

const Sidebar: React.FC = () => (
  <aside className="hidden md:flex md:flex-col w-64 bg-card border-r">
    <div className="flex items-center justify-center h-16 border-b">
      <LayoutDashboard className="w-6 h-6 mr-2" />
      <span className="text-lg font-bold">{siteConfig.siteName}</span>
    </div>
    <nav className="flex-1 px-2 py-4 space-y-1">
      <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" active href="/" />
      <SidebarItem icon={<ForkKnife className="w-5 h-5" />} label="Menu" href="/menu" />
      <SidebarItem icon={<Users className="w-5 h-5" />} label="Users" href="/users" />
      <SidebarItem icon={<Calendar className="w-5 h-5" />} label="Calendar" href="/calendar" />
      <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" href="/settings" />
    </nav>
    <div className="p-4 border-t">
      <Button variant="outline" className="w-full flex items-center gap-2">
        <LogOut className="w-4 h-4" /> Sign out
      </Button>
    </div>
  </aside>
);

export default Sidebar;
