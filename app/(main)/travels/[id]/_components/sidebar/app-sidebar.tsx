"use client";

import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { TravelSwitcher } from "./travel-switcher";
import { DatePicker } from "./date-picker";
import { Calendars } from "./calendars";
import { NavUser } from "./nav-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getTravels } from "../../_actions/travel-actions";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

export function AppSidebar({
  current,
  ...props
}: React.ComponentProps<typeof Sidebar> & { current: string }) {
  const {
    data: { data: travels },
  } = useSuspenseQuery({
    queryKey: ["get-travels"],
    queryFn: getTravels,
  });
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <React.Suspense fallback={<div>Loading...</div>}>
          <TravelSwitcher travels={travels} current={current} />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
