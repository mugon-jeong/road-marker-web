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
import { Travels } from "../../_actions/travel-actions";
import { Itineraries } from "@/app/(main)/travels/[id]/_actions/itinerary-actions";

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
  travels,
  itineraries,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  current: string;
  travels: Promise<Travels>;
  itineraries: Promise<Itineraries>;
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <React.Suspense fallback={<div>Loading...</div>}>
          <TravelSwitcher travels={travels} current={current} />
        </React.Suspense>
      </SidebarHeader>
      <SidebarContent>
        <DatePicker current={current} itineraries={itineraries} />
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
