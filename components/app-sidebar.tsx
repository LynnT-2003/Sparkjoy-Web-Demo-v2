import {
  Home,
  Search,
  Settings,
  Heart,
  LogOut,
  ChevronDown,
  Save,
  Bookmark,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Saved",
    url: "#",
    icon: Heart,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Sign Out",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="">
          <div className="flex items-center mb-3 mt-1">
            <img
              src="/logo_clear.png"
              alt="Anim8"
              className="w-14 h-14 rounded-full object-cover opacity-88"
            />
            <SidebarGroupLabel className="text-2xl text-white font-bold font-sans mt-0 ml-0">
              PrismaForge
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent className="mt-0 ml-2">
            <SidebarMenu>
              <SidebarMenuItem className="py-3 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                <SidebarMenuButton
                  asChild
                  className="text-lg text-[#d9d9d9] space-x-2"
                >
                  <a href={""}>
                    <Home className="w-64 h-64" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen>
                <CollapsibleTrigger className="w-full flex items-center text-lg text-[#d9d9d9] py-3 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                  <Bookmark className="ml-2 w-5 h-5" />
                  <span className="ml-4">My Collections</span>
                  <ChevronDown className="ml-auto w-5.5 h-5.5 mr-6" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  <SidebarMenu>
                    <SidebarMenuItem className="py-1 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                      <SidebarMenuButton
                        asChild
                        className="text-lg text-[#d9d9d9] space-x-2"
                      >
                        <a href={""}>
                          <span className="text-base text-[#d9d9d9] ml-7">
                            Templates
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="py-1 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                      <SidebarMenuButton
                        asChild
                        className="text-lg text-[#d9d9d9] space-x-2"
                      >
                        <a href={""}>
                          <span className="text-base text-[#d9d9d9] ml-7">
                            Favorites
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="py-1 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                      <SidebarMenuButton
                        asChild
                        className="text-lg text-[#d9d9d9] space-x-2"
                      >
                        <a href={""}>
                          <span className="text-base text-[#d9d9d9] ml-7">
                            Image History
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
              <SidebarMenuItem className="py-3 hover:bg-[#1e1e1e] transition-all duration-150 ease-linear">
                <SidebarMenuButton
                  asChild
                  className="text-lg text-[#d9d9d9] space-x-2"
                >
                  <a href={""}>
                    <Settings className="w-64 h-64" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center">
          <img
            src="/logo_clear.png"
            alt="Anim8"
            className="w-14 h-14 rounded-full object-cover opacity-88"
          />{" "}
          <h1 className="text-lg text-[#d9d9d9]">Lynn Thit</h1>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
