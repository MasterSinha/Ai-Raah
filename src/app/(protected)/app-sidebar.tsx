"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react";
import { cn } from "@/lib/utils"; // adjust path if needed
import { title } from "node:process";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useProject from "@/hooks/use-project";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

export function AppSidebar() {
  const pathname = usePathname(); 
  const {open}=useSidebar();
  const {projects,projectId,setProjectId}=useProject()

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="w-3">
        <div className="flex items-center gap-2">
          <Image src={'/photo'} alt="Logo" width={40} height={40}/>
          {open &&(
            <h1 className="text-xl font-bold text-primary/80">
            Raah - Github
          </h1>
          )}
          
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Application</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url; // ✅ Active check

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        "flex items-center",
                        isActive && "!bg-primary text-white"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
<SidebarGroup>
  <SidebarGroupLabel>Your Project</SidebarGroupLabel>
  <SidebarContent>
    <SidebarMenu>
      {projects?.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <div onClick={()=>{
              setProjectId(project.id)
            }}>
            <Link href={`/projects/${encodeURIComponent(project.name)}`} className="flex items-center gap-2">
              <div
                className={cn(
                  "rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary",{
                    'bg-primary text-white':project.id===projectId
                  }
                )}
              >
                {project.name[0]}
              </div>
              {project.name}
            </Link>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <div className="h-2"></div>
      <SidebarMenuItem>
  {open && (
    <Link href="/create">
      <Button size="sm" variant="outline" className="w-fit">
        <Plus className="mr-1" />
        Create Project
      </Button>
    </Link>
  )}
</SidebarMenuItem>

    </SidebarMenu>
  </SidebarContent>
</SidebarGroup>
      </SidebarContent>

    </Sidebar>
  );
}
