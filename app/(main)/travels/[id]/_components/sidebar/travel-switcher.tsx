"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { redirect, useRouter } from "next/navigation";
import {Travels} from "@/app/(main)/travels/[id]/_actions/travel-actions";
import {use} from "react";

export function TravelSwitcher({
  travels,
  current,
}: {
  travels: Promise<Travels>
  current: string;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const values = use(travels)
  if (values === null || values.length === 0) {
    redirect("/travels/new");
  }
  const currentTravel = values.find((travel) => travel.id === current);
  if (!currentTravel) {
    redirect("/travels/new");
  }
  const [activeTeam, setActiveTeam] = React.useState(currentTravel);

  const handleTravelChange = ({ id }: { id: string }) => {
    const selected = values.find((travel) => travel.id === id);
    if (!selected) {
      redirect("/travels/new");
    }
    setActiveTeam(selected);
    router.push(`/travels/${selected.id}`);
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.title}
                </span>
                <span className="truncate text-xs">{activeTeam.title}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Travels
            </DropdownMenuLabel>
            {values.map((travel, index) => (
              <DropdownMenuItem
                key={travel.id}
                onClick={() => handleTravelChange({ id: travel.id })}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {travel.title.slice(0, 1).toUpperCase()}
                </div>
                {travel.title}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/travels/new")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add travel
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
