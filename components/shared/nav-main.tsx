"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items?.map((item) => {
          const isActive = item.isActive || pathname === item.url;

          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`${
                        isActive
                          ? "bg-[#a66dd4] text-white hover:text-white py-6 transition-all duration-200 hover:bg-[#ab5cec]"
                          : ""
                      }`}
                    >
                      {item.icon && <item.icon className="mr-2 h-20 w-20" />}
                      <span className="text-2xl">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon className="mr-2 h-8 w-8" />
                              )}
                              {subItem.icon && (
                                <subItem.icon className="mr-2 h-8 w-8" />
                              )}
                              <span
                                className={`${
                                  pathname === subItem.url ? "text-primary" : ""
                                } text-sm`}
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          // If no sub-items, render as a simple link
          return (
            <SidebarMenuItem key={item.title}>
              <div className="flex items-center">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`${
                    isActive
                      ? "bg-[#a66dd4] text-white hover:text-white py-6 transition-all duration-200 hover:bg-[#ab5cec]"
                      : ""
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
